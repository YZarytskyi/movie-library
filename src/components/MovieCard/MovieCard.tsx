import React, { FC, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useAppDispatch } from "store/hooks";
import { toggleIsFavorite } from "store/movies/moviesSlice";
import { IMovie } from "types";
import defaultPoster from '../../../public/default-poster.jpg'
import Star from "../../../public/star.svg";
import { DEFAULT_BLUR_IMG } from "../../utils/constants";

interface MovieCard {
  movie: IMovie;
}

const MovieCard: FC<MovieCard> = ({ movie }) => {
  const dispatch = useAppDispatch();

  const [src, setSrc] = useState<string | StaticImageData>(movie.Poster);

  const onClickToggleIsFavorite = () => {
    dispatch(toggleIsFavorite(movie));
  };

  return (
    <li
      key={movie.imdbID}
      className="relative h-[420px] w-[250px] overflow-hidden rounded bg-[#0f0f0f] shadow-sm shadow-[#3e3e3e] transition-shadow hover:shadow-[#6f6f6f]"
    >
      <Link href={`/movies/${movie.imdbID}`} className="group">
        <Image
          src={src === "N/A" ? defaultPoster : src}
          alt={movie.Title}
          width={250}
          height={340}
          placeholder='blur'
          blurDataURL={DEFAULT_BLUR_IMG}
          onError={() => setSrc(defaultPoster)}
          className="block h-[82%] object-cover transition-transform group-hover:scale-[1.01]"
        />
        <div className="h-[18%] px-3 py-3">
          <p className="mb-[2px] text-[15px]">{movie.Year}</p>
          <p className="text-[16px] font-[700] md:text-[17px] xl:text-[18px]">
            {movie.Title.length > 20
              ? `${movie.Title.slice(0, 20)}...`
              : movie.Title}
          </p>
        </div>
      </Link>
      <button onClick={onClickToggleIsFavorite}>
        <Star
          className={`absolute bottom-[8.4%] right-[3px] h-[30px] w-[30px] stroke-light ${
            movie.isFavorite ? "fill-[gold]" : ""
          }`}
        />
      </button>
    </li>
  );
};

export default React.memo(MovieCard);
