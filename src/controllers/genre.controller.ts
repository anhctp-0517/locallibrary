import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as genreServices from "../services/genre.service";
import { body, validationResult } from "express-validator";

const validateGenreFields = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage((value, { req }) => {
      return req.t("genre.name_max");
    }),
];

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
    res.render("genres/form", { title: req.t("sidebar.create_genre") });
  }
);

export const createGenrePost = [
  // Validate and sanitize the name field.
  ...validateGenreFields,

  // Process request after validation and sanitization.
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("genres/form", {
        title: req.t("form.create"),
        genre: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      const genreExists = await genreServices.getGenreByName(req.body.name);
      if (genreExists) {
        // Genre exists, redirect to its detail page.
        res.redirect(`/genres/${genreExists.id}`);
      } else {
        const genre = await genreServices.createGenre(req.body.name);
        // New genre saved. Redirect to genre detail page.
        res.redirect(`/genres/${genre.id}`);
      }
    }
  }),
];

export const deleteGenreGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const genre = await getGenreByIdValidate(req, res);
    if (!genre) return;

    res.render("genres/delete", {
      title: req.t("form.delete"),
      genre: genre,
      genre_books: genre?.books,
    });
  }
);

export const deleteGenrePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const genre = await getGenreByIdValidate(req, res);
    if (!genre) return;

    await genreServices.deleteGenre(genre.id);
    res.redirect("/genres");
  }
);

export const updateGenreGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const genre = await getGenreByIdValidate(req, res);
    if (!genre) return;
    res.render("genres/form", {
      title: req.t("sidebar.update_genre"),
      genre: genre,
    });
  }
);

export const updateGenrePost = [
  // Validate and sanitize the name field.
  ...validateGenreFields,

  // Process request after validation and sanitization.
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("genres/form", {
        title: req.t("form.update"),
        genre: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      const genreExists = await genreServices.getGenreByName(req.body.name);
      if (genreExists) {
        // Genre exists, redirect to its detail page.
        res.redirect(`/genres/${genreExists.id}`);
      } else {
        const genre = await getGenreByIdValidate(req, res);
        if (!genre) return;

        await genreServices.updateGenre(genre, req.body.name);
        // New genre saved. Redirect to genre detail page.
        res.redirect(`/genres/${genre.id}`);
      }
    }
  }),
];
