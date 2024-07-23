import { AppDataSource } from "../config/data-source";
import { BookInstance } from "../entity/bookinstance.entity";
import { BOOK_INSTANCE_STATUS } from "../constants/bookinstance.constant";
import { Book } from "../entity/book.entity";

const bookInstanceRepository = AppDataSource.getRepository(BookInstance);

export const getBookInstancesCount = async () =>
  await bookInstanceRepository.count();

export const getAvailableBookInstancesCount = async () =>
  await bookInstanceRepository.findAndCount({
    where: { status: BOOK_INSTANCE_STATUS.AVAILABLE },
  });

export const getBookinstanceList = async () =>
  await bookInstanceRepository.find({
    relations: ["book"],
  });

export const getBookinstanceById = async (id: number) =>
  await bookInstanceRepository.findOne({
    where: { id },
    relations: ["book"],
  });

export const createBookinstance = async (
  book: Book,
  imprint: string,
  status: BOOK_INSTANCE_STATUS,
  due_back?: Date
) => {
  const bookInstance = new BookInstance();
  bookInstance.book = book;
  bookInstance.imprint = imprint;
  bookInstance.status = status;
  if (due_back) bookInstance.dueBack = due_back;
  return bookInstanceRepository.save(bookInstance);
};

export const deleteBookinstance = async (id: number) => {
  return bookInstanceRepository.delete(id);
};

export const updateBookinstance = async (
  bookInstance: BookInstance,
  book: Book,
  imprint: string,
  status: BOOK_INSTANCE_STATUS,
  due_back?: Date
) => {
  bookInstance.book = book;
  bookInstance.imprint = imprint;
  bookInstance.status = status;
  if (due_back) bookInstance.dueBack = due_back;
  return bookInstanceRepository.save(bookInstance);
};
