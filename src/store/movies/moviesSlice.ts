import { fetchMoviesOnPageChange, fetchMoviesByQuery } from "./moviesThunks";
import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../../types";
import { setIsFavorite } from "../../utils/setIsFavorite";

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
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    toggleIsFavoriteMovie(state, action: PayloadAction<IMovie>) {
      state.movies = state.movies.map((movie) => {
        return movie.imdbID === action.payload.imdbID
          ? { ...movie, isFavorite: !movie.isFavorite }
          : movie;
      });

      const isExist = state.favoriteMovies.find(
        (movie) => movie.imdbID === action.payload.imdbID
      );
      const addMovie = (movie: IMovie) => {
        return [{...movie, isFavorite: true}, ...state.favoriteMovies];
      };
      const removeMovie = (id: string) => {
        return state.favoriteMovies.filter((movie) => movie.imdbID !== id);
      };
      state.favoriteMovies = isExist
        ? removeMovie(action.payload.imdbID)
        : addMovie(action.payload);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchMoviesOnPageChange.fulfilled, (state, action) => {
        state.isLoading = false;
        const movies = setIsFavorite(
          action.payload!.Search,
          state.favoriteMovies
        );
        state.movies = movies;
        state.total = Number(action.payload!.totalResults);
      })
      .addCase(fetchMoviesByQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        const movies = setIsFavorite(
          action.payload!.Search,
          state.favoriteMovies
        );
        state.movies = movies;
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
          state.error = action.payload as string;
        }
      ),
});

export const {
  toggleIsFavoriteMovie,
  setQuery,
  setPage,
  setTotal,
} = moviesSlice.actions;
export default moviesSlice.reducer;
