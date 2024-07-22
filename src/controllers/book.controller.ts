import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

import * as services from "../services";

export const index = asyncHandler(async (req: Request, res: Response) => {
  const [books, bookInstances, availableBookInstances, authors, genres] =
    await Promise.all([
      services.getBookCount(),
      services.getBookInstancesCount(),
      services.getAvailableBookInstancesCount(),
      services.getAuthorCount(),
      services.getGenreCount(),
    ]);

    res.render("index", {
      title: "Local Library",
      book_count: books,
      book_instance_count: bookInstances,
      book_instance_available_count: availableBookInstances[1],
      author_count: authors,
      genre_count: genres,
    });
  }
);
export const getBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const books = await services.getBookList();
    res.render("books/index", { books, title: req.t("book.bookList") });
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
