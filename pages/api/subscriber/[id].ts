//import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { postReqBody } from ".";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";

// const prisma = new PrismaClient();

export const updateSubBody = z.object({
  msisdn: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .optional(),
  service_type: z.enum(["MOBILE_PREPAID", "MOBILE_POSTPAID"]).optional(),
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;
  const prismaSubWhere = {
    where: {
      id: Number(id),
    },
  };
  // console.log(id);
  if (req.method === "GET") {
    try {
      const subscriber = await prisma.subscriber.findUnique(prismaSubWhere);
      if (subscriber === null) {
        return res.status(404).json({ message: "Subscriber doesn't Exist" });
      }
      return res.status(200).json(subscriber);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
  if (req.method === "DELETE") {
    try {
      const deletedSubscriber = await prisma.subscriber.delete(prismaSubWhere);
      return res.status(200).json(deletedSubscriber);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
  if (req.method === "PATCH") {
    try {
      const body = updateSubBody.parse(req.body);
      const updatedSubscriber = await prisma.subscriber.update({
        ...prismaSubWhere,
        data: body,
      });
      return res.status(200).json(updatedSubscriber);
    } catch (error) {
      return res.status(400).json({ error });
      //console.log(e);
    }
  }
  return res.status(400).json({ message: "METHOD NOT ALLOWED" });
  //METHOD NOT ALLOWED
}
