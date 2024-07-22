import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as bookinstanceServices from "../services/bookinstance.service";
import { BOOK_INSTANCE_STATUS } from "../constants/bookinstance.constant";

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
    res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
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
