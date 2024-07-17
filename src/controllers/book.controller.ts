import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

export const getBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Book list");
  }
);
export const getBookDetail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
  }
);
export const createBookGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Book create GET");
  }
);
export const createBookPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Book create POST");
  }
);
export const deleteBookGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Book delete GET ${req.params.id}`);
  }
);
export const updateBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Book update GET ${req.params.id}`);
  }
);
