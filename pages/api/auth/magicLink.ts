// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import config from "../../../lib/config";

type Response = {
  link: string;
};

const generateAccessToken = function (userId: number) {
  return jwt.sign({}, process.env.MAGIC_LINK_JWT_SECRET, {
    expiresIn: "10s",
    issuer: "localhost",
    subject: userId.toString(),
  });
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  if (req.body.apiKey !== process.env.API_KEY) {
    res.status(401).end();
    return;
  }

  const token = generateAccessToken(req.body.userId);

  res.status(200).json({ link: `http://localhost:3000/login?token=${token}` });
}
