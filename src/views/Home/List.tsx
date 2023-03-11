import { FC } from "react";
import { useAppSelector } from "store/hooks";
import { selectError, selectMovies } from "store/movies/moviesSlice";
import MovieList from "components/MovieList/MovieList";
import { ErrorPage } from "components";

interface ListProps {
  commonError: boolean | null | string;
}

export const List: FC<ListProps> = ({ commonError }) => {
  const movies = useAppSelector(selectMovies);
  const error = useAppSelector(selectError);

  if (commonError === true) {
    return <ErrorPage error={"Something went wrong!"} />;
  }

  if (error) {
    return (
      <p className="mx-auto w-max border-2 border-red-600 py-3 px-6 text-xl">
        {error}
      </p>
    );
  }

  if (!movies.length) {
    return null;
  }

  return <MovieList movies={movies} />;
};
