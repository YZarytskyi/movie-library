import { IMovie } from "../types";

export const setIsFavorite = (movies: IMovie[], favorites: IMovie[]) => {
  const favoritesSet = new Set<string>();

  favorites.forEach((movie) => {
    favoritesSet.add(movie.imdbID);
  });

  return movies.map((item) => {
    const isFavorite = favoritesSet.has(item.imdbID);
    return { ...item, isFavorite };
  });
};
