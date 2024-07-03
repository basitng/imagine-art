import React from "react";

const LoadingUI = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-stone-50 to-indigo-100">
      <div className="relative w-24 h-24">
        {/* Pulsating circle */}
        <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-25 animate-ping"></div>

        {/* Static circle */}
        <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-75"></div>

        {/* Rotating ring */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#4f46e5"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="70 180"
          />
        </svg>

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Loading text */}
      <p className="mt-4 text-lg font-semibold text-indigo-700 animate-pulse">
        Loading...
      </p>

      {/* Additional info */}
      <p className="mt-2 text-sm text-indigo-600 opacity-75">
        Please wait while we prepare your content
      </p>
    </div>
  );
};

export default LoadingUI;
