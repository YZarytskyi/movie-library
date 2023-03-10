import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { IMovie } from "../../types";
import { useAppDispatch } from "../../store/hooks";
import Star from "../../../public/star.svg";
import { toggleFavoriteMovie } from "../../store/movies/moviesSlice";

interface MovieCard {
  movie: IMovie;
}

const MovieCard: FC<MovieCard> = ({ movie }) => {
  const dispatch = useAppDispatch();
  return (
    <li
      key={movie.imdbID}
      className="relative h-[400px] w-[240px] overflow-hidden rounded hover:shadow-sm hover:shadow-slate-600"
    >
      <Link href={`/movies/${movie.imdbID}`}>
        <Image
          src={movie.Poster}
          alt={movie.Title}
          width={240}
          height={340}
          className="block h-[82%] object-cover"
        />
        <div className="h-[18%] px-2 py-3">
          <p className="mb-[2px] text-[16px] md:text-[13px] xl:text-[15px]">
            {movie.Year}
          </p>
          <p className="text-[20px] font-[700] md:text-[13px] xl:text-[18px]">
            {movie.Title.length > 20
              ? `${movie.Title.slice(0, 20)}...`
              : movie.Title}
          </p>
        </div>
      </Link>
      <button onClick={() => dispatch(toggleFavoriteMovie(movie))}>
        <Star className={`absolute bottom-[8.4%] right-[3px] h-[32px] w-[32px] stroke-light ${movie.isFavorite ? 'fill-[gold]' : ''}`} />
      </button>
    </li>
  );
};

export default React.memo(MovieCard)