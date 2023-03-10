import axios from "axios";
import { ISelectedMovie, ResponseMoviesError } from 'types/index';
import { ResponseMovies } from "types";

const BASE_URL = "https://www.omdbapi.com";
const API_KEY = "c4ded8eb";

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