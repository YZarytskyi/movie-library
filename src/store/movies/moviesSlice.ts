import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { setIsFavorite } from "utils/setIsFavorite";
import { IMovie, ResponseMovies } from "types";
import { fetchMoviesOnPageChange, fetchMoviesByQuery } from "./moviesThunks";
import { addMovie, removeMovie } from "utils/toggleFavoriteMovie";
import { RootState } from "..";

interface MoviesState {
  movies: IMovie[];
  favoriteMovies: IMovie[];
  query: string;
  page: number;
  total: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  favoriteMovies: [],
  query: "",
  page: 1,
  total: null,
  isLoading: false,
  error: null,
};

const extraActions = [fetchMoviesByQuery, fetchMoviesOnPageChange];

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, { payload }: PayloadAction<ResponseMovies>) {
      const movies = setIsFavorite(payload.Search, state.favoriteMovies);
      state.movies = movies;
      state.total = Number(payload.totalResults);
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload || "";
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload || 1;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    toggleIsFavorite(state, action: PayloadAction<IMovie>) {
      state.movies = state.movies.map((movie) => {
        return movie.imdbID === action.payload.imdbID
          ? { ...movie, isFavorite: !movie.isFavorite }
          : movie;
      });
      const isExist = state.favoriteMovies.find(
        (movie) => movie.imdbID === action.payload.imdbID
      );
      state.favoriteMovies = isExist
        ? removeMovie(action.payload.imdbID, state.favoriteMovies)
        : addMovie(action.payload, state.favoriteMovies);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchMoviesOnPageChange.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.movies = action.payload!.Search;
        state.total = Number(action.payload!.totalResults);
      })
      .addCase(fetchMoviesByQuery.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.movies = action.payload!.Search;
        state.total = Number(action.payload!.totalResults);
      })
      .addMatcher(
        isAnyOf(...extraActions.map((action) => action.pending)),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(...extraActions.map((action) => action.rejected)),
        (state, action) => {
          state.isLoading = false;
          state.total = null;
          state.error = action.payload as string;
        }
      ),
});

export const selectMovies = (state: RootState) => state.movies.movies;
export const selectFavorites = (state: RootState) => state.movies.movies;
export const selectQuery = (state: RootState) => state.movies.query;
export const selectPage = (state: RootState) => state.movies.page;
export const selectTotal = (state: RootState) => state.movies.total;
export const selectIsLoading = (state: RootState) => state.movies.isLoading;
export const selectError = (state: RootState) => state.movies.error;

export const { toggleIsFavorite, setMovies, setQuery, setPage, setTotal, setError } =
  moviesSlice.actions;
export default moviesSlice.reducer;
