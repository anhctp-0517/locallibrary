import { Router } from "express";
import * as bookController from "../controllers/book.controller";
const bookRouter: Router = Router();
// GET request for creating a Book. NOTE This must come before route that displays Book (uses id).
bookRouter.get("/create", bookController.createBookGet);

// POST request for creating Book.
bookRouter.post("/create", bookController.createBookPost);

// GET request to delete Book.
bookRouter.get("/:id/delete", bookController.deleteBookGet);

// GET request to update Book.
bookRouter.get("/:id/update", bookController.updateBook);

// GET request for one Book.
bookRouter.get("/:id", bookController.getBookDetail);

// GET request for list of all Book items.
bookRouter.get("/", bookController.getBook);
export default bookRouter;
