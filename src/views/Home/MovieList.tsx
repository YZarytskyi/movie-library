import { SkeletonMovies } from "components";
import MovieCard from "components/MovieCard/MovieCard";
import { useAppSelector } from "store/hooks";

const MovieList = () => {
  const isLoading = useAppSelector((state) => state.movies.isLoading);
  const movies = useAppSelector((state) => state.movies.movies);

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
