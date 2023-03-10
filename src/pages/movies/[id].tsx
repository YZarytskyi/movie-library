import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Head from "next/head";
import { Container } from "components";
import ErrorPage from "components/ErrorPage/ErrorPage";
import { getMovieById } from "lib/moviesApi";
import { ReturnTypeISelectedMovie, ReturnTypeWithError } from "types";

const Movie = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  if (props.error || !props.data) {
    return <ErrorPage error={props.error} />;
  }

  const {
    Title,
    Plot,
    Poster,
    Year,
    imdbRating,
    BoxOffice,
    Awards,
    Actors,
    Genre,
  } = props.data;

  return (
    <>
      <Head>
        <title>{Title}</title>
        <meta name="description" content={Plot} />
      </Head>

      <section className="py-4">
        <Container>
          <div className="flex flex-col items-center gap-10 xl:flex-row">
            <div className="w-full max-w-[350px] flex-shrink-0 md:h-[525px] md:w-[350px]">
              <Image
                src={Poster}
                alt={Title}
                height={525}
                width={350}
                className="block h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="mb-8 text-center text-xl font-[700] sm:text-2xl xl:text-left">
                {Title} 🔥 <span>{Year}</span>
              </p>

              {imdbRating && (
                <p className="text-md mb-5 sm:text-xl">
                  Rating:{" "}
                  <span className="ml-2 rounded-xl bg-accent px-4 py-1 text-[14px] font-[700] sm:text-[16px]">
                    {imdbRating}
                  </span>
                </p>
              )}

              {BoxOffice && (
                <p className="text-md mb-5 sm:text-xl">
                  Budget:{" "}
                  <span className="ml-2 rounded-xl bg-accent px-4 py-1 text-[14px] font-[700] sm:text-[16px]">
                    {BoxOffice}
                  </span>
                </p>
              )}

              {Awards && (
                <p className="text-md mb-5 sm:text-xl">
                  Awards:{" "}
                  <span className="ml-2 rounded-xl bg-accent px-4 py-1 text-[14px] font-[700] sm:text-[16px]">
                    {Awards}
                  </span>
                </p>
              )}

              {Actors && (
                <p className="text-md mb-5 sm:text-xl">
                  Actors: <span className="ml-3">{Actors}</span>
                </p>
              )}

              {Genre && (
                <p className="text-md mb-10 sm:text-xl">
                  Genres: <span className="ml-3">{Genre}</span>
                </p>
              )}

              {Plot && (
                <>
                  <p className="mb-2 text-xl font-[700] sm:text-2xl">
                    Overview
                  </p>
                  <p className="text-md sm:text-xl">{Plot}</p>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  ReturnTypeISelectedMovie | ReturnTypeWithError
> = async (context) => {
  try {
    const { id } = context.query;
    const data = await getMovieById(id as string);
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

export default Movie;
