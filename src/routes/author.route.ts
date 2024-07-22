import { Router } from "express";
import * as authorController from "../controllers/author.controller";
const authorRouter: Router = Router();
// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
authorRouter.get("/create", authorController.authorCreateGet);

// POST request for creating Author.
authorRouter.post("/create", authorController.authorCreatePost);

// GET request to delete Author.
authorRouter.get("/:id/delete", authorController.authorDeleteGet);

// POST request to delete Author.
authorRouter.post("/:id/delete", authorController.authorDeletePost);

// GET request to update Author.
authorRouter.get("/:id/update", authorController.authorUpdateGet);

// POST request to update Author.
authorRouter.post("/:id/update", authorController.authorUpdatePost);

// GET request for one Author.
authorRouter.get("/:id", authorController.authorDetail);

// GET request for list of all Authors.
authorRouter.get("/", authorController.authorList);
export default authorRouter;
