import { ResponseMoviesError } from './../types/index';
import axios from "axios";
import { ResponseMovies } from "../types";

const BASE_URL = "http://www.omdbapi.com";
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
