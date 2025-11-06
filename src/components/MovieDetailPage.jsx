import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { options } from "../utils/constant";
import VideoContainer from '../pages/VideoContainer'
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        );
        setMovie(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);


  if (loading) {
    return <p className="text-white text-center mt-10">Loading...</p>;
  }



  return (
    <div className="max-w-6xl mt-10 mx-auto px-6 py-15 text-white">
      <div className="flex  flex-col md:flex-row gap-5">
        <img
          src={`${IMG_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-2xl shadow-lg"
        />
        {/* Information box */}
        <div className="mt-2 bg-gradient-to-r 
        from-gray-900/80 via-gray-800/60 to-transparent p-8
        rounded-2xl shadow-2xl backdrop-blur-md border border-gray-700/50 transition-transform">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 drop-shadow-lg">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-4 text-sm md:text-base">
            <p className="text-gray-300 bg-gray-800/60 px-3 py-1 rounded-full border border-gray-700">
              📅 <span className="ml-1 text-gray-100">{movie.release_date}</span>
            </p>

            <p className="text-gray-300 bg-gray-800/60 px-3 py-1 rounded-full border border-gray-700">
              ⭐ <span className="ml-1 text-yellow-400 font-semibold">
                {movie.vote_average?.toFixed(1)}
              </span>
            </p>

            {movie.runtime && (
              <p className="text-gray-300 bg-gray-800/60 px-3 py-1 rounded-full border border-gray-700">
                ⏱️ <span className="ml-1 text-gray-100">{movie.runtime} mins</span>
              </p>
            )}
          </div>

          <p className="text-gray-200 leading-relaxed text-lg md:text-xl font-light tracking-wide max-w-3xl">
            {movie.overview}
          </p>

          {movie.tagline && (
            <p className="mt-6 italic text-gray-400 text-center border-t border-gray-700 pt-4">
              “{movie.tagline}”
            </p>
          )}
        </div>

      </div>
      <VideoContainer/>
    </div>
  );
};

export default MovieDetailPage;
