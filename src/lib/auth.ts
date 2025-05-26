import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "your_fallback_secret"; // Use env in real life

export function signToken(payload: string | object | Buffer) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
