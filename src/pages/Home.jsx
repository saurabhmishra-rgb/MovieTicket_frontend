import React from 'react'
import { Link } from 'react-router-dom'
import MovieCard from '../components/Moviecard'
import { dummyShowsData } from '../assets/assets'
import Trailer from '../components/trailer'

const Home = () => {
  const movies = dummyShowsData || []
  const hero = movies.length > 0 ? movies[0] : null

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero poster */}
      {hero && (
        <section className="mb-8">
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img
              src={hero.backdrop_path || hero.poster_path}
              alt={hero.title}
              className="w-full h-[55vh] md:h-[70vh] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

            <div className="absolute left-6 bottom-6 text-white max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">{hero.title}</h1>
              <p className="mt-3 text-sm md:text-base text-gray-200 line-clamp-3">{hero.overview}</p>

              <div className="mt-4 flex items-center gap-3">
                <Link to={`/movie/${hero.id || hero._id}`} className="bg-blue-600 px-4 py-2 rounded-md font-medium">
                  View Details
                </Link>
                <a href={hero.backdrop_path || hero.poster_path} target="_blank" rel="noreferrer" className="bg-white/20 px-4 py-2 rounded-md">
                  View Poster
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <header className="mb-6">
        <h2 className="text-2xl font-bold">Now Showing</h2>
        <p className="text-gray-600">Explore movies playing near you</p>
      </header>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((m) => (
            <MovieCard key={m.id || m._id} movie={m} />
          ))}
        </div>
      </section>
    

    </div>
  )
}

export default Home
