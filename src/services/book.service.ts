import { AppDataSource } from "../config/data-source";
import { Book } from "../entity/book.entity";

const bookRepository = AppDataSource.getRepository(Book);

export const getBookCount = async () => await bookRepository.count();

export const getBookList = async () =>
  await bookRepository.find({
    order: { title: "ASC" },
    relations: ["author"],
  });

export const getBookById = async (id: number) =>
  await bookRepository.findOne({
    relations: ["author", "genres", "bookInstances"],
    where: { id },
  });
