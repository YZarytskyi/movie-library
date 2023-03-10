import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getMovies } from "lib/moviesApi";
import { setIsFavorite } from "utils/setIsFavorite";
import { setPage } from "./moviesSlice";
import { DEFAULT_QUERY } from "pages";

export const fetchMoviesOnPageChange = createAsyncThunk(
  "movies/fetchOnPageChange",
  async (page: number = 1, { getState, dispatch, rejectWithValue }) => {
    dispatch(setPage(page));
    const store = getState() as RootState;
    const query = store.movies.query as string;
    const favorites = store.movies.favoriteMovies;
    const queryParam = query.trim() || DEFAULT_QUERY;
    try {
      const data = await getMovies(queryParam, page);
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      data.Search = setIsFavorite(data.Search, favorites);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchMoviesByQuery = createAsyncThunk(
  "movies/fetchByQuery",
  async (query: string, { dispatch, getState, rejectWithValue }) => {
    dispatch(setPage(1));
    const store = getState() as RootState;
    const favorites = store.movies.favoriteMovies;
    try {
      const data = await getMovies(query.trim(), 1);
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      data.Search = setIsFavorite(data.Search, favorites);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return rejectWithValue(error.message);
      }
    }
  }
);
