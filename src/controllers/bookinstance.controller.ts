import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as bookinstanceServices from "../services/bookinstance.service";
import * as bookServices from "../services/book.service";
import { BOOK_INSTANCE_STATUS } from "../constants/bookinstance.constant";
import { body, validationResult } from "express-validator";

const validateBookinstanceFields = [
  body("book")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage((value, { req }) => req.t("bookInstance.field_specified")),
  body("imprint")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage((value, { req }) => req.t("bookInstance.field_specified")),
  body("status")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage((value, { req }) => req.t("bookInstance.field_specified")),
  body("due_back")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate()
    .withMessage((value, { req }) => req.t("bookInstance.invalid_due_back")),
];

const getBookInstanceByIdValidate = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    // log 404 Invalid book instance ID parameter
    req.flash("err_message", req.t("error.invalid_bookinstance_id"));
    return res.redirect("/error");
  }

  const bookInstance = await bookinstanceServices.getBookinstanceById(id);
  if (bookInstance === null) {
    // log 404 Book instance not found
    req.flash("err_message", req.t("error.bookinstance_not_found"));
    return res.redirect("/error");
  }
  return bookInstance;
};

export const getBookInstance = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookInstances = await bookinstanceServices.getBookinstanceList();
    res.render("bookinstances/index", {
      bookInstances,
      title: req.t("bookInstance.bookInstanceList"),
      BOOK_INSTANCE_STATUS,
    });
  }
);

export const getBookInstanceDetail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookInstance = await getBookInstanceByIdValidate(req, res);
    res.render("bookinstances/detail", {
      title: req.t("detail.bookinstance_detail"),
      bookInstance: bookInstance,
      BOOK_INSTANCE_STATUS,
    });
  }
);

export const createBookInstanceGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allBooks = await bookServices.getBookList();

    res.render("bookinstances/form", {
      title: req.t("sidebar.create_bookinstance"),
      book_list: allBooks,
      BOOK_INSTANCE_STATUS,
    });
  }
);

export const createBookInstancePost = [
  // Validate and sanitize fields.
  ...validateBookinstanceFields,

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const { book: bookId, imprint, status, due_back } = req.body;

    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with sanitized values and error messages.
      const allBooks = await bookServices.getBookList();

      res.render("bookinstances/form", {
        title: req.t("sidebar.create_bookinstance"),
        book_list: allBooks,
        selected_book: bookId,
        errors: errors.array(),
        bookinstance: req.body,
        BOOK_INSTANCE_STATUS,
      });
      return;
    } else {
      // Data from form is valid
      const book = await bookServices.getBookById(parseInt(bookId));
      const bookInstance = await bookinstanceServices.createBookinstance(
        book!,
        imprint,
        status,
        due_back
      );
      res.redirect(`/bookinstances/${bookInstance.id}`);
    }
  }),
];

export const deleteBookInstanceGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookInstance = await getBookInstanceByIdValidate(req, res);
    if (!bookInstance) return;

    res.render("bookinstances/delete", {
      title: req.t("form.delete"),
      bookInstance: bookInstance,
      BOOK_INSTANCE_STATUS,
    });
  }
);

export const deleteBookInstancePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookInstance = await getBookInstanceByIdValidate(req, res);
    if (!bookInstance) return;

    await bookinstanceServices.deleteBookinstance(bookInstance.id);
    res.redirect("/bookinstances");
  }
);

export const updateBookInstanceGet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allBooks = await bookServices.getBookList();
    const bookInstance = await getBookInstanceByIdValidate(req, res);
    if (!bookInstance) return;

    res.render("bookinstances/form", {
      title: req.t("sidebar.update_bookinstance"),
      book_list: allBooks,
      selected_book: bookInstance.id,
      bookinstance: bookInstance,
      BOOK_INSTANCE_STATUS,
    });
  }
);

export const updateBookInstancePost = [
  // Validate and sanitize fields.
  ...validateBookinstanceFields,

  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const { book: bookId, imprint, status, due_back } = req.body;

    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with sanitized values and error messages.
      const allBooks = await bookServices.getBookList();

      res.render("bookinstances/form", {
        title: req.t("sidebar.update_bookinstance"),
        book_list: allBooks,
        selected_book: bookId,
        errors: errors.array(),
        bookinstance: req.body,
        BOOK_INSTANCE_STATUS,
      });
      return;
    } else {
      // Data from form is valid
      const book = await bookServices.getBookById(parseInt(bookId));
      const bookInstance = await getBookInstanceByIdValidate(req, res);
      if (!bookInstance) return;

      await bookinstanceServices.updateBookinstance(
        bookInstance,
        book!,
        imprint,
        status,
        due_back
      );
      res.redirect(`/bookinstances/${bookInstance.id}`);
    }
  }),
];
