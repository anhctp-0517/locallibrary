import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const getBookInstance = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: BookInstance list");
  }
);
export const getBookInstanceDetail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
  }
);
export const createBookInstanceGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: BookInstance create GET");
  }
);
export const createBookInstancePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: BookInstance create POST");
  }
);
export const deleteBookInstanceGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: BookInstance delete GET ${req.params.id}`);
  }
);
export const updateBookInstance = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: BookInstance update GET ${req.params.id}`);
  }
);
