import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as genreServices from "../services/genre.service";

export const getGenre = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const genres = await genreServices.getGenreList();
    res.render("genres/index", { genres, title: req.t("genre.genreList") });
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
