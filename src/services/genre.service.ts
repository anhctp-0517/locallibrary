import { AppDataSource } from "../config/data-source";
import { Genre } from "../entity/genre.entity";

const genreRepository = AppDataSource.getRepository(Genre);
export const getGenreCount = async () => await genreRepository.count();
