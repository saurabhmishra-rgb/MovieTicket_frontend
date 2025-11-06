import {createSlice} from "@reduxjs/toolkit";

const movieSlice= createSlice({
    name : "movie",
    initialState:{
        nowPlayingMovies:[],
        popularMovies:[],
        topRatedMovies:[],
        upcomingMovies:[],
        toggle:false,
        trailerVideos:[],
        open:false,
        id:"",
       
    },
    reducers:{
        //actions
        getNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies=action.payload;
        },
        getPopularMovies:(state,action)=>{
            state.popularMovies=action.payload;
        },
        getTopRatedMovies:(state,action)=>{
            state.topRatedMovies=action.payload;
        },
        getUpcomingMovies:(state,action)=>{
            state.upcomingMovies=action.payload
        },
            setToggle:(state)=>{
                state.toggle=!state.toggle;
            },
            getTrailerVideos:(state,action)=>{
                state.trailerVideos=action.payload;
            },
            setOpen:(state,action)=>{
                state.open=action.payload;
            },
            getId:(state,action)=>{
                state.id=action.payload;
            }
    }
});

export const { getNowPlayingMovies,getId, setOpen,getPopularMovies,getTopRatedMovies,getUpcomingMovies,setToggle,getTrailerVideos}= movieSlice.actions;
export default  movieSlice.reducer;