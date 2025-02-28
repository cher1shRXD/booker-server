import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { forbiddenError, unauthorizedError } from "../error/errors.js";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export interface AuthRequest extends Request {
  user?: any;
}

export const jwtProvider = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    unauthorizedError(res);
    return;
  }
  
  const token = authHeader.split(" ")[1];
  
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err || !decoded) {
      forbiddenError(res);
      return;
    }
    req.user = (decoded as { username: string })?.username;
    next();
  });
};
