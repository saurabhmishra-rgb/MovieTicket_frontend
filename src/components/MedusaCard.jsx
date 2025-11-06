import React from "react";
import { useNavigate } from "react-router-dom";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MedusaCard = ({ posterPath, title, rating, movieId, movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // 👇 navigate to /medusa/:id and optionally pass full movie object as state
    navigate(`/medusa/${movieId}`, { state: { movie } });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out cursor-pointer"
    >
      <img
        src={`${IMG_BASE_URL}${posterPath}`}
        alt={title}
        className="w-full h-72 object-cover"
      />
      <div className="p-3 text-white">
        <h3 className="text-sm font-semibold truncate">{title}</h3>
        <p className="text-yellow-400 text-xs mt-1">⭐ {rating?.toFixed(1)}</p>
      </div>
    </div>
  );
};

export default MedusaCard;
