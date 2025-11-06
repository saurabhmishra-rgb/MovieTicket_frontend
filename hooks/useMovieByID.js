import { useEffect } from "react";
import axios from "axios";
import { options } from "../src/Utils/constant";

const useMovieByID = (movieId) => {
  useEffect(() => {
    if (!movieId) return; 

    const MedusaMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          options
        );
        console.log(" Movie Videos:", res.data.results);
      } catch (error) {
        console.error(" Error fetching movie videos:", error.message);
      }
    };

    MedusaMovie();
  }, []); 
};

export default useMovieByID;
