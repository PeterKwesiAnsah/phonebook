// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Subscriber } from "@prisma/client";
import { z } from "zod";
import { PagingResults } from "../../../types";
import { URL, URLSearchParams } from "url";
import { genPrevNext } from "../../../utils";
import { prisma } from "../../../lib/prisma";

// type Data = {
//   name: string;
// };

// const prisma = new PrismaClient();
const querySchema = z.object({
  page: z.string().optional(),
  page_size: z.string().optional(),
  service_type: z.enum(["MOBILE_PREPAID", "MOBILE_POSTPAID"]).optional(),
});
export const postReqBody = z.object({
  msisdn: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  service_type: z.enum(["MOBILE_PREPAID", "MOBILE_POSTPAID"]).optional(),
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | Subscriber
    | PagingResults<Subscriber>
    | { message: string }
    | { error: unknown }
  >
) {
  const method = req.method;
  if (method === "GET") {
    const query = req.query;
    try {
      //TODO: search by customer name..sort by customer name
      let { page, page_size, service_type } = querySchema.parse(query);
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
          where: service_type_filter,
        }),
        prisma.subscriber.findMany({
          take,
          skip,
          where: service_type_filter,
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
      const body = postReqBody.parse(req.body);
      const newSubscriber = await prisma.subscriber.create({
        data: body,
      });
      return res.status(201).json(newSubscriber);
    } catch (error) {
      return res.status(400).json({ error });
      //console.log(e);
    }
  }
  return res.status(400).json({ message: "METHOD NOT ALLOWED" });
  //res.status(200).json({ name: "John Doe" });
}
