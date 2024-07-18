import { Router } from "express";
import * as genreController from "../controllers/genre.controller";
const genreRouter: Router = Router();
// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
genreRouter.get("/create", genreController.createGenreGet);

// POST request for creating Genre.
genreRouter.post("/create", genreController.createGenrePost);

// GET request to delete Genre.
genreRouter.get("/:id/delete", genreController.deleteGenreGet);

// GET request to update Genre.
genreRouter.get("/:id/update", genreController.updateGenre);

// GET request for one Genre.
genreRouter.get("/:id", genreController.getGenreDetail);

// GET request for list of all Genre items.
genreRouter.get("/", genreController.getGenre);
export default genreRouter;
