import React from "react";
import MovieList from "../components/MovieList";
import { useSelector } from "react-redux";

const MovieContainer = () => {
  // Access the array directly
  const movies = useSelector((store) => store.movie.nowPlayingMovies);
  const popularMovies = useSelector((store) => store.movie.popularMovies);
  const topRatedMovies = useSelector((store) => store.movie.topRatedMovies);
  const upcomingMovies = useSelector((store) => store.movie.upcomingMovies);  
  console.log("movies in container:", movies);
  console.log("popular movies in container:", popularMovies);
  console.log("top rated movies in container:", topRatedMovies);
  console.log("upcoming movies in container:", upcomingMovies);

  return (
    <div>
      <MovieList title="Now Playing Movies" movies={movies} />
      <MovieList title="Popular Movies" movies={popularMovies} />
      <MovieList title="Top Rated Movies" movies={topRatedMovies} />
      <MovieList title="Upcoming Movies" movies={upcomingMovies} />
    </div>
  );
};

export default MovieContainer;
