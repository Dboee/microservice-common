import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/unauthorized-error';

// we assume that the currentUser property is already defined on the Request interface
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    // 401: Unauthorized
    throw new UnauthorizedError();
  }

  next();
};
