import { FormEventHandler } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchMoviesByQuery } from "store/movies/moviesThunks";
import { selectQuery, setQuery } from "store/movies/moviesSlice";
import Search from "../../../public/search.svg";

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectQuery);
  const router = useRouter();

  const onSubmitSearchMovies: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!query) {
      return;
    }
    dispatch(fetchMoviesByQuery(query));
    router.push(
      {
        query: {
          ...router.query,
          query: query.trim(),
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
