import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import * as authorServices from "../services/author.service";

const getAuthorByIdValidate = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    req.flash("err_message", req.t("error.invalid_author_id"));
    return res.redirect("/error");
  }

  const author = await authorServices.getAuthorById(id);
  if (author === null) {
    // log 404 Author not found
    req.flash("err_message", req.t("error.author_not_found"));
    return res.redirect("/error");
  }
  return author;
};

export const authorList = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authors = await authorServices.getAuthorList();
    res.render("authors/index", { authors, title: req.t("author.authorList") });
  }
);

export const authorDetail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const author = await getAuthorByIdValidate(req, res);
    res.render("authors/detail", { author, authorBooks: author?.books });
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
