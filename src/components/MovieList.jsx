import React from "react";
import MedusaCard from "./MedusaCard";

const MovieList = ({ title, movies = [], popularMovies = [], topRatedMovies = [], upcomingMovies = [],}) => {
   
 
  return (
    <div className="bg-[#0f0f0f] text-white">
      {/* NOW PLAYING MOVIES */}
      <div className="px-8 py-6">
        <section>
          <h2 className="text-3xl font-bold mb-6 tracking-wide">{title}</h2>
          <div className="flex overflow-x-auto space-x-6 no-scrollbar scroll-smooth">
            {movies.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-48">
                <MedusaCard
                  movieId={movie.id}             
                  movie={movie}                  
                  posterPath={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* POPULAR MOVIES */}
      <div>
        <section>
          <div className="flex overflow-x-auto space-x-6 no-scrollbar scroll-smooth">
            {popularMovies.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-48">
                <MedusaCard
                  movieId={movie.id}             
                  movie={movie}                  
                  posterPath={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* TOP RATED MOVIES */}
      <div>
        <section>
          <div className="flex overflow-x-auto space-x-6 no-scrollbar scroll-smooth">
            {topRatedMovies.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-48">
                <MedusaCard
                  movieId={movie.id}             
                  movie={movie}                 
                  posterPath={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* UPCOMING MOVIES */}
      <div>
        <section>
          <div className="flex overflow-x-auto space-x-6 no-scrollbar scroll-smooth">
            {upcomingMovies.map((movie) => (
              <div key={movie.id} className="flex-shrink-0 w-48">
                <MedusaCard
                  movieId={movie.id}
                  movie={movie}                 
                  posterPath={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
  
    </div>
  );
};

export default MovieList;
