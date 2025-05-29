"use client";
import React from "react";

interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ message = "Something went wrong." }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-red-600">
      <svg
        className="w-12 h-12 mb-2"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.62-1.14 1.054-2L13.054 4c-.526-.9-1.582-.9-2.108 0L3.028 17c-.566.86 0 2 1.054 2z"
        />
      </svg>
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
};

export default Error;
