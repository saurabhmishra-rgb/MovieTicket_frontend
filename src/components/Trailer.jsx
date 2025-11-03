import React, { useState } from "react";
import ReactPlayer from "react-player";

const Trailer = ({ videoUrl, thumbnail, title = "Trailer" }) => {
  const [play, setPlay] = useState(false);

  if (!videoUrl) return null;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-white">{title} - Trailer</h2>

      {!play ? (
        <div
          className="relative w-full pb-[56.25%] rounded-xl overflow-hidden shadow-lg cursor-pointer group"
          onClick={() => setPlay(true)}
        >
          <img
            src={
              thumbnail ||
              "https://img.youtube.com/vi/WpW36ldAqnM/maxresdefault.jpg"
            }
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/70 transition-colors duration-300">
            <button className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-red-700 transition">
              ▶ Watch Trailer
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full rounded-xl overflow-hidden shadow-lg">
          <ReactPlayer
            url={videoUrl}
            playing
            controls
            width="100%"
            height="480px"
            style={{ borderRadius: "12px", overflow: "hidden" }}
            config={{
              youtube: {
                playerVars: { modestbranding: 1, rel: 0 },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Trailer;
