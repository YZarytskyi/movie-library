import { FC } from "react";
import Image from "next/image";
import { Container } from "components";
import { ISelectedMovie } from "types";

interface MovieProps {
  movie: ISelectedMovie;
}

const Movie: FC<MovieProps> = ({ movie }) => {
  if (!movie) {
    return null;
  }

  return (
    <section className="py-4">
      <Container>
        <div className="flex gap-10">
          {/* <Link to={goBackPath} className={s.goBackBtn} >{'< Go Back'}</Link> */}
          <div className="h-[525px] w-[350px] flex-shrink-0">
            <Image
              src={movie.Poster}
              alt={movie.Title}
              height={525}
              width={350}
              className="block h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="mb-8 text-2xl font-[700]">
              {movie.Title} 🔥 <span>{movie.Year}</span>
            </p>

            {movie.imdbRating && (
              <p className="mb-5 text-xl">
                Rating:{" "}
                <span className="ml-2 rounded-xl bg-accent px-4 py-1 text-[16px] font-[700]">
                  {movie.imdbRating}
                </span>
              </p>
            )}

            {movie.BoxOffice && (
              <p className="mb-5 text-xl">
                Budget:{" "}
                <span className="ml-2 rounded-xl bg-accent px-4 py-1 text-[16px] font-[700]">
                  {movie.BoxOffice}
                </span>
              </p>
            )}

            {movie.Awards && (
              <p className="mb-5 text-xl">
                Awards:{" "}
                <span className="ml-2 rounded-xl bg-accent px-4 py-1 text-[16px] font-[700]">
                  {movie.Awards}
                </span>
              </p>
            )}

            {movie.Actors && (
              <p className="mb-5 text-xl">
                Actors: <span className="ml-3">{movie.Actors}</span>
              </p>
            )}

            {movie.Genre && (
              <p className="mb-10 text-xl">
                Genres: <span className="ml-3">{movie.Genre}</span>
              </p>
            )}

            {movie.Plot && (
              <>
                <p className="mb-2 text-2xl font-[700]">Overview</p>
                <p className="text-xl">{movie.Plot}</p>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const res = await fetch(`http://www.omdbapi.com/?apikey=c4ded8eb&i=${id}`);
  const movie = await res.json();

  return {
    props: { movie },
  };
}

export default Movie;
