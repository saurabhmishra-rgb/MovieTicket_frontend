import { useEffect } from "react";
import axios from "axios";
import { Popular_movies, options } from "../../utils/constant"; 
import { useDispatch } from "react-redux";
import { getPopularMovies } from "../redux/movieSlice";
const usePopularMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      const medusaMovies = async () => {
        try {
           const res = await axios.get(Popular_movies, options);
           dispatch(getPopularMovies(res.data.results));
           console.log(res.data.results);
        } catch (error) {
          console.error("Error fetching popular movies:", error);
        }
        };
      medusaMovies();
    }, [dispatch]);
 }
 export default usePopularMovies;