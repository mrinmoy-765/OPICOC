import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner text-warning loading-lg"></span>
        <span className="text-lg font-semibold">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
