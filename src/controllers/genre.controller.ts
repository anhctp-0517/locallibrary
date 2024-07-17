import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const getGenre = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Genre list");
  }
);
export const getGenreDetail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
  }
);
export const createGenreGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Genre create GET");
  }
);
export const createGenrePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Genre create POST");
  }
);
export const deleteGenreGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Genre delete GET ${req.params.id}`);
  }
);
export const updateGenre = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Genre update GET ${req.params.id}`);
  }
);
