import React, { useEffect } from 'react'
import { Upcoming_movies, options } from '../../utils/constant';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUpcomingMovies } from '../redux/movieSlice' ;
const useUpcommingMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const MedusaMovies = async () => {
            try {
                const res = await axios.get(Upcoming_movies, options);
                dispatch(getUpcomingMovies(res.data.results));
                console.log("Upcoming movies data:", res.data);
            } catch (error) {
                console.error("Error fetching upcoming movies:", error);
            }
        }
        MedusaMovies();
    }, [dispatch]);
}

export default useUpcommingMovies
