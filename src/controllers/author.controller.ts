import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import * as authorServices from "../services/author.service";
import { body, validationResult } from "express-validator";

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

const validateAuthorFields = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage((value, { req }) => req.t("author.empty_first_name"))
    .isAlphanumeric()
    .withMessage((value, { req }) => req.t("author.invalid_first_name")),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage((value, { req }) => req.t("author.empty_family_name"))
    .isAlphanumeric()
    .withMessage((value, { req }) => req.t("author.invalid_family_name")),
  body("date_of_birth")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate()
    .withMessage((value, { req }) => req.t("author.invalid_date_of_birth")),
  body("date_of_death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate()
    .withMessage((value, { req }) => req.t("author.invalid_date_of_birth")),
];

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
    res.render("authors/form", { title: req.t("sidebar.create_author") });
  }
);

export const authorCreatePost = [
  ...validateAuthorFields,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const { first_name, family_name, date_of_birth, date_of_death } = req.body;

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("authors/form", {
        title: req.t("sidebar.create_author"),
        author: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      const author = await authorServices.createAuthor(
        first_name,
        family_name,
        date_of_birth,
        date_of_death
      );
      // Redirect to new author record.
      res.redirect(`/authors/${author.id}`);
    }
  }),
];

export const authorDeleteGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const author = await getAuthorByIdValidate(req, res);
    if (!author) return;

    res.render("authors/delete", {
      title: req.t("sidebar.delete_author"),
      author: author,
      author_books: author.books,
    });
  }
);

export const authorDeletePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("alo");
    const author = await getAuthorByIdValidate(req, res);
    if (!author) return;

    if (author.books.length > 0) {
      // Author has books. Render in same way as for GET route.
      res.render("authors/delete", {
        title: req.t("sidebar.delete_author"),
        author: author,
        author_books: author.books,
      });
      return;
    } else {
      // Author has no books. Delete object and redirect to the list of authors.
      await authorServices.deleteAuthor(author.id);
      res.redirect("/authors");
    }
  }
);

export const authorUpdateGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const author = await getAuthorByIdValidate(req, res);
    if (!author) return;

    res.render("authors/form", {
      title: req.t("sidebar.update_author"),
      author: author,
    });
  }
);

export const authorUpdatePost = [
  // Validate and sanitize fields.
  ...validateAuthorFields,

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const { first_name, family_name, date_of_birth, date_of_death } = req.body;

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("authors/form", {
        title: req.t("sidebar.update_author"),
        author: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      const author = await getAuthorByIdValidate(req, res);
      if (!author) return;

      await authorServices.updateAuthor(
        author,
        first_name,
        family_name,
        date_of_birth,
        date_of_death
      );
      // Redirect to new author record.
      res.redirect(`/authors/${author.id}`);
    }
  }),
];
