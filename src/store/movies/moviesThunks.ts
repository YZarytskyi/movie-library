import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { getMovies } from "../../lib/moviesApi";
import { setPage } from "./moviesSlice";

export const fetchMoviesOnPageChange = createAsyncThunk(
  "movies/fetchOnPageChange",
  async (page: number = 1, { getState, dispatch, rejectWithValue }) => {
    const store = getState() as RootState;
    const query = store.movies.query as string;
    dispatch(setPage(page));
    try {
      const data = await getMovies(query, page);
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
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
  async (query: string, { dispatch, rejectWithValue }) => {
    dispatch(setPage(1));
    try {
      const data = await getMovies(query, 1);
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return rejectWithValue(error.message);
      }
    }
  }
);
