import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
      
      {/* Loading Text */}
      <p className="mt-4 text-lg font-medium text-gray-300">
        Loading your bookings...
      </p>
    </div>
  );
};

export default Loading;
