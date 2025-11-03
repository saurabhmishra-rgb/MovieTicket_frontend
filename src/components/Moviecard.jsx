import { StarsIcon, PlayIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()

  const trailerLink =
    movie.trailer ||
    `https://www.youtube.com/results?search_query=${encodeURIComponent(
      movie.title + ' trailer'
    )}`

  return (
    <div
      className="flex flex-col justify-between p-3 bg-gray-800 rounded-2xl
      hover:-translate-y-1 transition duration-300 w-66"
    >
      {/* --- Movie Poster --- */}
      <img
        onClick={() => navigate(`/movie/${movie.id}`)}
        src={movie.backdrop_path}
        alt={movie.title}
        className="rounded-lg h-52 w-full object-cover object-center cursor-pointer"
      />

      {/* --- Movie Info --- */}
      <div className="mt-3">
        <p className="font-semibold truncate">{movie.title}</p>
        <p className="text-sm text-gray-400">{movie.release_date}</p>
      </div>

      {/* --- Buttons & Rating --- */}
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2">
          {/* Buy Ticket Button */}
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="bg-yellow-400 text-gray-900 font-semibold py-1 px-2 text-sm rounded-md hover:bg-yellow-300 transition"
          >
            Buy Ticket
          </button>

          {/* Watch Trailer Button */}
          <a
            href={trailerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-red-600 text-white font-medium py-1 px-2 text-sm rounded-md hover:bg-red-500 transition"
          >
            <PlayIcon className="h-3.5 w-3.5" />
            Trailer
          </a>
        </div>

        {/* Rating */}
        <p className="flex items-center gap-1 text-sm text-gray-300 mt-1 pr-1">
          <StarsIcon className="h-4 w-4 text-yellow-400" />
          {movie.vote_average?.toFixed(1) ?? 'N/A'}
        </p>
      </div>
    </div>
  )
}

export default MovieCard
