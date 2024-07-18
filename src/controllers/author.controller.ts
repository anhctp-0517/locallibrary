import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

export const authorList = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Author list");
  }
);
export const authorDetail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
  }
);
export const authorCreateGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Author create GET");
  }
);
export const authorCreatePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Author create POST");
  }
);
export const authorDeleteGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Author delete GET ${req.params.id}`);
  }
);
export const authorUpdate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Author update GET ${req.params.id}`);
  }
);
