import { ChangeEventHandler, FormEventHandler } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setQuery } from "store/movies/moviesSlice";
import { fetchMoviesByQuery } from "store/movies/moviesThunks";
import Search from "../../../public/search.svg";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.movies.query);
  const router = useRouter();

  const onChangeSearchMovies: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setQuery(e.target.value));
    router.push({ query: { ...router.query, query: e.target.value }});
  };

  const onSubmitSearchMovies: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(fetchMoviesByQuery(query));
  };
  return (
    <form onSubmit={onSubmitSearchMovies} className="relative mx-auto w-96">
      <input
        type="text"
        className="mx-auto mb-10 block w-full rounded-3xl bg-[#2c2c2c] py-2 px-6 text-lg text-white outline-none hover:bg-[#3a3a3a] focus:bg-[#333333]"
        placeholder="Search movies..."
        value={query}
        onChange={onChangeSearchMovies}
      />
      <button className="absolute top-[50%] right-[15px] translate-y-[-50%] py-2 px-3">
        <Search className="fill-light" />
      </button>
    </form>
  );
};

export default SearchBar;
