import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import * as services from "../services";
import { BOOK_INSTANCE_STATUS } from "../constants/bookinstance.constant";
import { body, validationResult } from "express-validator";
import { Genre } from "../entity/genre.entity";

type GenreChecked = Genre & { checked?: string };

const validateBookFields = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage((value, { req }) =>
      req.t("book.field_empty", {
        field: req.t("detail.title"),
      })
    ),
  body("author")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage((value, { req }) =>
      req.t("book.field_empty", {
        field: req.t("detail.author"),
      })
    ),
  body("summary")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage((value, { req }) =>
      req.t("book.field_empty", {
        field: req.t("detail.summary"),
      })
    ),
  body("isbn")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage((value, { req }) =>
      req.t("book.field_empty", {
        field: req.t("detail.isbn"),
      })
    ),
  body("genre.*").escape(),
];
const getBookByIdValidate = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    // log 404 Invalid book ID parameter
    req.flash("err_message", req.t("error.invalid_book_id"));
    return res.redirect("/error");
  }

  const book = await services.getBookById(id);
  if (book === null) {
    // log 404 Book not found
    req.flash("err_message", req.t("error.book_not_found"));
    return res.redirect("/error");
  }
  return book;
};

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
});

export const getBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const books = await services.getBookList();
    res.render("books/index", { books, title: req.t("book.bookList") });
  }
);

export const getBookDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const book = await getBookByIdValidate(req, res);

    res.render("books/detail", {
      title: req.t("detail.book_detail"),
      book,
      bookInstances: book?.bookInstances,
      bookGenres: book?.genres,
      BOOK_INSTANCE_STATUS,
    });
  }
);

export const createBookGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const [allAuthors, allGenres] = await Promise.all([
      services.getAuthorList(),
      services.getGenreList(),
    ]);

    res.render("books/form", {
      title: req.t("sidebar.create_book"),
      authors: allAuthors,
      genres: allGenres,
    });
  }
);

export const createBookPost = [
  (req: Request, res: Response, next: NextFunction) => {
    if (!Array.isArray(req.body.genres)) {
      req.body.genres =
        typeof req.body.genres === "undefined" ? [] : [req.body.genres];
    }
    next();
  },

  ...validateBookFields,

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const { title, author: authorId, summary, isbn, genres } = req.body;

    if (!errors.isEmpty()) {
      const [allAuthors, allGenres] = await Promise.all([
        services.getAuthorList(),
        services.getGenreList() as Promise<GenreChecked[]>,
      ]);

      for (const genre of allGenres) {
        if (genres.includes(genre.id.toString())) {
          genre.checked = "true";
        }
      }
      res.render("books/form", {
        title: req.t("sidebar.create_book"),
        authors: allAuthors,
        genres: allGenres,
        book: req.body,
        errors: errors.array(),
      });
    } else {
      const genresOfBook = await Promise.all(
        genres.map((genreId: string) => {
          return services.getGenreById(parseInt(genreId));
        })
      );

      const authorOfBook = await services.getAuthorById(parseInt(authorId));
      const book = await services.createBook(
        title,
        authorOfBook!,
        summary,
        isbn,
        genresOfBook
      );
      res.redirect(`/books/${book.id}`);
    }
  }),
];

export const deleteBookGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const book = await getBookByIdValidate(req, res);
    if (!book) return;

    res.render("books/delete", {
      title: req.t("sidebar.delete_book"),
      book,
      bookInstances: book?.bookInstances,
      bookGenres: book?.genres,
      BOOK_INSTANCE_STATUS,
    });
  }
);

export const deleteBookPost = asyncHandler(
  async (req: Request, res: Response) => {
    const book = await getBookByIdValidate(req, res);
    if (!book) return;

    if (book.bookInstances.length > 0) {
      res.render("books/delete", {
        title: req.t("sidebar.delete_book"),
        book,
        bookInstances: book?.bookInstances,
        bookGenres: book?.genres,
        BOOK_INSTANCE_STATUS,
      });
      return;
    } else {
      await services.deleteBook(book.id);
      res.redirect("/books");
    }
  }
);

export const updateBookGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const [book, allAuthors, allGenres] = await Promise.all([
      getBookByIdValidate(req, res),
      services.getAuthorList(),
      services.getGenreList() as Promise<GenreChecked[]>,
    ]);

    if (!book) return;

    const bookGenreIds = book.genres.map((genre) => genre.id);

    // Mark our selected genres as checked.
    for (const genre of allGenres) {
      if (bookGenreIds.includes(genre.id)) {
        genre.checked = "true";
      }
    }

    const bookForm = {
      title: book.title,
      author: book.author.id,
      summary: book.summary,
      isbn: book.isbn,
    };

    res.render("books/form", {
      title: req.t("form.update"),
      authors: allAuthors,
      genres: allGenres,
      book: bookForm,
    });
  }
);

export const updateBookPost = [
  (req: Request, res: Response, next: NextFunction) => {
    if (!Array.isArray(req.body.genres)) {
      req.body.genres =
        typeof req.body.genres === "undefined" ? [] : [req.body.genres];
    }
    next();
  },

  ...validateBookFields,

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const { title, author: authorId, summary, isbn, genres } = req.body;

    if (!errors.isEmpty()) {
      const [allAuthors, allGenres] = await Promise.all([
        services.getAuthorList(),
        services.getGenreList() as Promise<GenreChecked[]>,
      ]);

      for (const genre of allGenres) {
        if (genres.includes(genre.id.toString())) {
          genre.checked = "true";
        }
      }
      res.render("books/form", {
        title: req.t("sidebar.update_book"),
        authors: allAuthors,
        genres: allGenres,
        book: req.body,
        errors: errors.array(),
      });
    } else {
      const genresOfBook = await Promise.all(
        genres.map((genreId: string) => {
          return services.getGenreById(parseInt(genreId));
        })
      );

      const authorOfBook = await services.getAuthorById(parseInt(authorId));
      const book = await getBookByIdValidate(req, res);
      if (!book) return;

      await services.updateBook(
        book,
        title,
        authorOfBook!,
        summary,
        isbn,
        genresOfBook
      );
      res.redirect(`/books/${book.id}`);
    }
  }),
];
