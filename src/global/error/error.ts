import { Response } from "express";

export const unauthorizedError = (res: Response) => {
  return res.status(401).json({ message: "Unauthorized" });
};

export const forbiddenError = (res: Response) => {
  return res.status(403).json({ message: "Forbidden" });
};

export const notFoundError = (res: Response) => {
  return res.status(404).json({ message: "Not Found" });
};

export const conflictError = (res: Response) => {
  return res.status(409).json({ message: "Conflict" });
};

export const internalServerError = (res: Response) => {
  return res.status(500).json({ message: "Internal Server Error" });
};