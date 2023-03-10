import { FC } from "react";
import Head from "next/head";
import { useAppSelector } from "store/hooks";
import { Container } from "components";
import MovieList from "../../components/MovieList/MovieList";

const Favorites: FC = () => {
  const favoriteMovies = useAppSelector((state) => state.movies.favoriteMovies);
  return (
    <>
      <Head>
        <title>Favorites</title>
        <meta name="description" content="favorite movies library" />
      </Head>
      <section className="py-6">
        <Container>
          <h1 className="mb-11 text-center text-3xl font-[700]">
            Favorite Movies
          </h1>
          <MovieList movies={favoriteMovies} />
          {!favoriteMovies.length && (
            <p>Favorite Movies not found</p>
          )}
        </Container>
      </section>
    </>
  );
};

export default Favorites;
