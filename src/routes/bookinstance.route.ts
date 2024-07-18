import { Router } from "express";
import * as bookinstanceController from "../controllers/bookinstance.controller";
const bookinstanceRouter: Router = Router();
// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
bookinstanceRouter.get("/create", bookinstanceController.createBookInstanceGet);

// POST request for creating BookInstance.
bookinstanceRouter.post(
  "/create",
  bookinstanceController.createBookInstancePost
);

// GET request to delete BookInstance.
bookinstanceRouter.get(
  "/:id/delete",
  bookinstanceController.deleteBookInstanceGet
);

// GET request to update BookInstance.
bookinstanceRouter.get(
  "/:id/update",
  bookinstanceController.updateBookInstance
);

// GET request for one BookInstance.
bookinstanceRouter.get("/:id", bookinstanceController.getBookInstanceDetail);

// GET request for list of all BookInstance items.
bookinstanceRouter.get("/", bookinstanceController.getBookInstance);
export default bookinstanceRouter;
