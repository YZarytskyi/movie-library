import { FC } from "react";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchMoviesOnPageChange } from "store/movies/moviesThunks";
import { selectPage, selectTotal } from "store/movies/moviesSlice";
import { PaginationEvent } from "types";
import { PER_PAGE } from "utils/constants";

export const Pagination: FC = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const total = useAppSelector(selectTotal);
  const router = useRouter();

  const pageCount = Math.ceil(Number(total) / PER_PAGE);

  const onPageChange = (e: PaginationEvent) => {
    const currentPage = e.selected + 1;
    dispatch(fetchMoviesOnPageChange(currentPage));
    router.push({ query: { ...router.query, page: currentPage } }, undefined, {
      shallow: true,
    });
  };

  if (pageCount <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      breakLabel="..."
      forcePage={page - 1}
      onPageChange={onPageChange}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      nextLabel=">"
      previousLabel="<"
      containerClassName="h-[60px] mt-5 mb-1 flex items-center justify-center"
      previousClassName="pagination__item"
      nextClassName="pagination__item"
      pageClassName="pagination__item font-[500]"
      disabledClassName="text-[#808e9b]"
      activeLinkClassName="pagination__item active"
      breakClassName="pagination__item pagination__break-me"
      pageLinkClassName="w-full h-full flex items-center justify-center"
    />
  );
};
