import { FC } from "react";
import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fetchMoviesOnPageChange } from "store/movies/moviesThunks";

const PER_PAGE: 10 = 10;

const Pagination: FC = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.movies.page);
  const total = useAppSelector((state) => state.movies.total);

  const pageCount = Math.ceil(Number(total) / PER_PAGE);

  if (pageCount <= page) {
    return null;
  }

  return (
    <ReactPaginate
      breakLabel="..."
      onPageChange={(e) => {
        dispatch(fetchMoviesOnPageChange(e.selected + 1));
      }}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      nextLabel=">"
      previousLabel="<"
      containerClassName={"pagination"}
      previousClassName={"pagination__item pagination__previous"}
      pageClassName={"pagination__item pagination__page"}
      disabledClassName={"pagination__disabled-page"}
      activeClassName={"pagination__item pagination__active"}
      breakClassName={"pagination__item pagination__break-me"}
      pageLinkClassName={"pagination__link"}
    />
  );
};

export default Pagination;
