import { FC } from "react";
import { useAppSelector } from "store/hooks";
import { selectIsLoading } from "store/movies/moviesSlice";
import { SkeletonMovies } from "components";
import MovieCard from "components/MovieCard/MovieCard";
import { IMovie } from "types";

interface MovieListProps {
  movies: IMovie[]
}

const MovieList: FC<MovieListProps> = ({movies}) => {
  const isLoading = useAppSelector(selectIsLoading);

  return (
    <ul className="flex flex-wrap items-center justify-center gap-10 xl:justify-start">
      {isLoading ? (
        <SkeletonMovies />
      ) : (
        movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
      )}
    </ul>
  );
};

export default MovieList;
