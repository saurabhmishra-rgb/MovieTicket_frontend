import React from 'react'
import { useSelector } from 'react-redux';
import MedusaCard from './MedusaCard';

const SearchMovie = () => {
  const { movieName, searchedMovie } = useSelector(
    (store) => store.searchMovie
  );

  return (
    <div className="px-6 py-10 mt-11">
      {/* Searched Movie */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">
          Search Results for: <span className="text-red-500">{movieName}</span>
        </h2>

     
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {searchedMovie.map((movie) => (
            <div key={movie.id}>
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
  );
};

export default SearchMovie;
