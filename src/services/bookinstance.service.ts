import { AppDataSource } from "../config/data-source";
import { BookInstance } from "../entity/bookinstance.entity";
import { BOOK_INSTANCE_STATUS } from "../constants/bookinstance.constant";

const bookInstanceRepository = AppDataSource.getRepository(BookInstance);

export const getBookInstancesCount = async () =>
  await bookInstanceRepository.count();

export const getAvailableBookInstancesCount = async () =>
  await bookInstanceRepository.findAndCount({
    where: { status: BOOK_INSTANCE_STATUS.AVAILABLE },
  });
