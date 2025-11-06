import React, { useEffect } from 'react'
import axios from 'axios'
import { Top_Rated_movies, options } from '../../utils/constant'
import { useDispatch } from 'react-redux'
import { getTopRatedMovies } from '../redux/movieSlice' 
const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
       const MedusaMovies = async () =>{
        try{
            const res = await axios.get(Top_Rated_movies, options);
            dispatch(getTopRatedMovies(res.data.results));
            console.log(res.data.results);
        }catch(error){
            console.log(error);
        }
       }
       MedusaMovies();
    }, [dispatch])

    return null
}

export default useTopRatedMovies
