import { Request, Response, NextFunction } from "express";
import { ResourceNotFoundError } from "../../application/errors/resource-not-found-error";
import { z, ZodError } from "zod";

export function errorHandler(
  err: unknown,
  request: Request,
  reply: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    return reply.status(400).json({ message: z.treeifyError(err) });
  }

  if (err instanceof ResourceNotFoundError) {
    return reply.status(404).json({ message: err.message });
  }

  return reply.status(500).json({ message: err });
}
