// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Owner, Subscriber } from "@prisma/client";
import { z } from "zod";
import { PagingResults } from "../../../types";
import { URL, URLSearchParams } from "url";
import { genPrevNext } from "../../../utils";
import { prisma } from "../../../lib/prisma";

const querySchema = z.object({
  page: z.string().optional(),
  page_size: z.string().optional(),
  service_type: z.enum(["MOBILE_PREPAID", "MOBILE_POSTPAID"]).optional(),
  search: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
});
export const postReqBody = z.object({
  name: z.string(),
  msisdn: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  service_type: z.enum(["MOBILE_PREPAID", "MOBILE_POSTPAID"]).optional(),
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    Owner | PagingResults<Subscriber> | { message: string } | { error: unknown }
  >
) {
  const method = req.method;
  if (method === "GET") {
    const query = req.query;
    try {
      //TODO: extract this to a paginate function
      let { page, page_size, service_type, search, sort } =
        querySchema.parse(query);
      const queryPage = Number(page || "1") - 1;
      const take = Number(page_size || "20");
      const skip = queryPage * take;
      //const take = 0;
      let service_type_filter = {};
      if (service_type) {
        service_type_filter = {
          service_type: {
            equals: service_type,
          },
        };
      }

      const [count, subscribers] = await Promise.all([
        prisma.subscriber.count({
          where: {
            ...service_type_filter,
            owner: {
              name: {
                contains: search || "",
              },
            },
          },
        }),
        prisma.subscriber.findMany({
          take,
          skip,
          where: {
            ...service_type_filter,
            owner: {
              name: {
                contains: search || "",
              },
            },
          },
          include: {
            owner: true,
          },
          orderBy: {
            owner: {
              name: sort || "asc",
            },
          },
        }),
      ]);
      const url = new URL("http://" + req.headers!.host + req.url!);
      const isNext = Number(page || "1") * take < count;
      const isPrev = queryPage * take > 0;
      return res.status(200).json({
        count,
        results: subscribers,
        next: genPrevNext(queryPage, url, isNext, "next"),
        prev: genPrevNext(queryPage, url, isPrev, "prev"),
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
  if (method === "POST") {
    try {
      const { name, ...rest } = postReqBody.parse(req.body);
      const newSubscriber = await prisma.owner.create({
        data: {
          name,
          subscriber: {
            create: rest,
          },
        },
      });
      return res.status(201).json(newSubscriber);
    } catch (error) {
      return res.status(400).json({ error });
      //console.log(e);
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${method} Not Allowed`);
}
