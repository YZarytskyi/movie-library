export interface IMovie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
  isFavorite: boolean;
}

export interface ISelectedMovie {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Released: string;
  Runtime: string;
  Title: string;
  Type: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

export interface ResponseMovies {
  Search: IMovie[],
  totalResults: string;
  Response: "True";
  Error: string;
}

export interface ResponseMoviesError {
  Response: "False";
  Error: string;
}