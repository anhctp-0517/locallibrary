import { AppDataSource } from "../config/data-source";
import { Author } from "../entity/author.entity";

const authorRepository = AppDataSource.getRepository(Author);

export const getAuthorCount = async () => await authorRepository.count();

export const getAuthorList = async () =>
  await authorRepository.find({
    order: { family_name: "ASC" },
  });

export const getAuthorById = async (id: number) =>
  await authorRepository.findOne({
    where: { id },
    relations: ["books"],
  });
