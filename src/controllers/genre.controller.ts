import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as genreServices from "../services/genre.service";

const getGenreByIdValidate = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    // log 404 Invalid genre ID parameter
    req.flash("err_message", req.t("error.invalid_genre_id"));
    return res.redirect("/error");
  }

  const genre = await genreServices.getGenreById(id);
  if (genre === null) {
    // log 404 Genre not found
    req.flash("err_message", req.t("error.genre_not_found"));
    return res.redirect("/error");
  }
  return genre;
};

export const getGenre = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const genres = await genreServices.getGenreList();
    res.render("genres/index", { genres, title: req.t("genre.genreList") });
  }
);

export const getGenreDetail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const genre = await getGenreByIdValidate(req, res);
    res.render("genres/detail", {
      title: req.t("detail.genre_detail"),
      genre: genre,
      genre_books: genre?.books,
    });
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
