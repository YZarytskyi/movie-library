import axios from "axios";
import { API_KEY, BASE_URL } from "utils/constants";
import { ISelectedMovie, ResponseMoviesError } from 'types/index';
import { ResponseMovies } from "types";

export const moviesApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

export const getMovies = async (query: string, page: number) => {
  const { data } = await moviesApi.get<ResponseMovies | ResponseMoviesError>(`?s=${query}&page=${page}`);
  return data;
};

export const getMovieById = async (id: string) => {
  const { data } = await moviesApi.get<ISelectedMovie | ResponseMoviesError>(`?i=${id}`);
  return data;
};