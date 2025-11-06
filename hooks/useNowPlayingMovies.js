import { useEffect } from "react";
import axios from "axios";
import { Now_Playing_Movies, options } from "../../utils/constant";

import { useDispatch } from "react-redux";
import { getNowPlayingMovies } from "../redux/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(Now_Playing_Movies, options);
        dispatch(getNowPlayingMovies(res.data.results));
        console.log(res.data.results);
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };

    fetchMovies();
  }, [dispatch]);
};

export default useNowPlayingMovies;
