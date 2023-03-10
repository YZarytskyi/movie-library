import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Container } from "components";
import SearchBar from "views/Home/SearchBar";
import Pagination from "views/Home/Pagination";
import List from "views/Home/List";
import { getMovies } from "lib/moviesApi";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectError, setMovies, setPage, setQuery } from "store/movies/moviesSlice";
import ErrorPage from "components/ErrorPage/ErrorPage";
import { ReturnTypeMovies, ReturnTypeWithError } from "types";

export const DEFAULT_QUERY = "movie";

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError)
  const router = useRouter();

  useEffect(() => {
    if (props.data) {
      dispatch(setMovies(props.data));
      dispatch(setQuery(router.query.query as string));
      dispatch(setPage(Number(router.query.page)));
    }
  }, []);

  if (props.error || error) {
    return <ErrorPage error={'Something went wrong!'} />;
  }
  return (
    <>
      <Head>
        <title>Movies Library</title>
        <meta name="description" content="Searching movies" />
      </Head>
      <section className="py-5">
        <Container>
          <SearchBar />
          <List />
          <Pagination />
        </Container>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  ReturnTypeMovies | ReturnTypeWithError
> = async ({ query }) => {
  try {
    const searchQuery = (query.query as string) || DEFAULT_QUERY;
    const page = Number(query.page) || 1;
    const data = await getMovies(searchQuery, page);
    if ("Error" in data) {
      throw new Error();
    }
    return {
      props: { data, error: null },
    };
  } catch (error) {
    return {
      props: { data: null, error: "Something went wrong!" },
    };
  }
};

export default Home;
