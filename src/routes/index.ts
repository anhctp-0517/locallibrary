import express from "express";
import authorRouter from "./author.route";
import bookRouter from "./book.route";
import bookinstanceRouter from "./bookinstance.route";
import genreRouter from "./genre.route";
import { index } from "../controllers/book.controller";

const router = express.Router();

/* GET home page. */
router.get("/", index);

router.use("/authors", authorRouter);
router.use("/books", bookRouter);
router.use("/bookinstances", bookinstanceRouter);
router.use("/genres", genreRouter);

export default router;
