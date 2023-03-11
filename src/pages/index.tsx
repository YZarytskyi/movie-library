import { useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container, ErrorPage } from "components";
import { getMovies } from "lib/moviesApi";
import { useAppDispatch } from "store/hooks";
import {
  selectError,
  setError,
  setMovies,
  setPage,
  setQuery,
} from "store/movies/moviesSlice";
import { List, Pagination, SearchBar } from "../views";
import { ReturnTypeMovies, ReturnTypeWithError } from "types";
import { DEFAULT_QUERY } from "../utils/constants";

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (props.data) {
      dispatch(setError(null))
      dispatch(setMovies(props.data));
      dispatch(setQuery(router.query.query as string));
      dispatch(setPage(Number(router.query.page)));
    }
    if (typeof props.error === 'string') {
      dispatch(setError(props.error))
    }
  }, []);

  return (
    <>
      <Head>
        <title>Movie Library</title>
        <meta name="description" content="Searching movies" />
      </Head>
      <section className="py-5">
        <Container>
          <SearchBar />
          <List commonError={props.error}/>
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
      return {
        props: {data: null, error: data.Error}
      }
    }
    return {
      props: { data, error: null },
    };
  } catch (error) {
    return {
      props: { data: null, error: true },
    };
  }
};

export default Home;
