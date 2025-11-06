import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieDetailPage from "./components/MovieDetailPage";

// Pages
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import SeatLayout from "./pages/SeatLayout";
import MyBooking from "./pages/MyBooking";
import Movie from "./pages/Movie";
import Login from "./pages/Login";
import SearchedMovie from "./pages/SearchedMovie";

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  return (
    <>
      <Toaster position="top-center" />
      {!isAdminRoute && <Navbar />}

      <main className="min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/movies/:id/:date" element={<SeatLayout />} />
          <Route path="/my-booking" element={<MyBooking />} />
          <Route path="/movies" element={<Movie />} />
           <Route path="search" element ={<SearchedMovie />} />
          {/*  Corrected route */}
          <Route path="/medusa/:id" element={<MovieDetailPage />} />
         

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center h-[70vh]">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-gray-600">Page not found</p>
              </div>
            }
          />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
