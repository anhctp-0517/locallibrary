import { AppDataSource } from "../config/data-source";
import { Genre } from "../entity/genre.entity";

const genreRepository = AppDataSource.getRepository(Genre);

export const getGenreCount = async () => await genreRepository.count();

export const getGenreList = async () =>
  await genreRepository.find({
    order: { name: "ASC" },
  });

export const getGenreById = async (id: number) =>
  await genreRepository.findOne({
    where: { id },
  });

export const getGenreByName = async (name: string) => {
  return genreRepository.findOne({ where: { name } });
};

export const createGenre = async (name: string) => {
  const genre = new Genre();
  genre.name = name;

  return genreRepository.save(genre);
};

export const deleteGenre = async (id: number) => {
  return genreRepository.delete(id);
};

export const updateGenre = async (genre: Genre, name: string) => {
  genre.name = name;
  return genreRepository.save(genre);
};
