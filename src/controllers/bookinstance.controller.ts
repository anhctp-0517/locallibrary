import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as bookinstanceServices from "../services/bookinstance.service";
import { BOOK_INSTANCE_STATUS } from "../constants/bookinstance.constant";

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
