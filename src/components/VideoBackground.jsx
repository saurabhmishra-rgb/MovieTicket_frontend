import React, { useEffect } from 'react';
import useMovieByID from '../../hooks/useMovieByID';
import { useParams } from 'react-router-dom';
import { options } from "../utils/constant";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getTrailerVideos } from '../../redux/movieSlice';
const VideoBackground = () => {
  const trailers = useSelector((store) => store.movie.trailerVideos);
  // Extract trailer key safely
  let trailerKey = null;

  if (Array.isArray(trailers) && trailers.length > 0) {
    trailerKey = trailers[0]?.key; // case: trailers is array
  } else if (trailers && trailers.key) {
    trailerKey = trailers.key; // case: trailers is a single object
  } else if (trailers && trailers.results && trailers.results.length > 0) {
    trailerKey = trailers.results[0]?.key; // case: trailers is { results: [...] }
  }
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        );
        dispatch(getTrailerVideos(videoRes.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchVideos();
  })

  useMovieByID()
  return (
    <div className="flex justify-center items-center w-full h-full py-4">
      <div className="w-[700px] h-[400px] rounded-2xl overflow-hidden shadow-lg">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
          title="YouTube trailer"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoBackground;
