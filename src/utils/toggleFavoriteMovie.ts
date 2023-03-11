import { IMovie } from "../types";

export const addMovie = (movie: IMovie, favorites: IMovie[]) => {
  return [{ ...movie, isFavorite: true }, ...favorites];
};
export const removeMovie = (id: string, favorites: IMovie[]) => {
  return favorites.filter((movie) => movie.imdbID !== id);
};