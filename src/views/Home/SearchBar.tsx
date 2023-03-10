import { ChangeEventHandler, FormEventHandler, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchMoviesByQuery } from "store/movies/moviesThunks";
import Search from "../../../public/search.svg";
import { selectQuery, setQuery } from "../../store/movies/moviesSlice";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectQuery)
  const router = useRouter();
  useEffect(() => {
    console.log('+++') 
  })
  const onSubmitSearchMovies: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(fetchMoviesByQuery(query));
    router.push(
      {
        query: {
          ...router.query,
          query: query.trim().toLowerCase(),
          page: 1,
        },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <form
      onSubmit={onSubmitSearchMovies}
      className="relative mx-auto w-full max-w-[400px] md:w-[400px]"
    >
      <input
        type="text"
        className="mx-auto mb-10 block w-full rounded-3xl bg-[#2c2c2c] py-2 px-6 text-lg text-white outline-none hover:bg-[#3a3a3a] focus:bg-[#333333]"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
      />
      <button className="absolute top-[50%] right-[15px] translate-y-[-50%] py-2 px-3">
        <Search className="fill-light" />
      </button>
    </form>
  );
};

export default SearchBar;
