import { useAppSelector } from "store/hooks";
import { selectMovies } from "store/movies/moviesSlice";
import MovieList from "../../components/MovieList/MovieList";

const List = () => {
  const movies = useAppSelector(selectMovies);

  return(
    <MovieList movies={movies}/>
  );
};

export default List 