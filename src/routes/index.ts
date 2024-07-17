import express, { Request, Response, NextFunction } from "express";
import authorRouter from "./author.route";
import bookRouter from "./book.route";
import bookinstanceRouter from "./bookinstance.route";
import genreRouter from "./genre.route";

const router = express.Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.render("index", { title: "Express" });
});

router.use("/authors", authorRouter);
router.use("/books", bookRouter);
router.use("/bookinstances", bookinstanceRouter);
router.use("/genres", genreRouter);

export default router;
