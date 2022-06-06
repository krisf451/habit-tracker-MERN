import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="h-84 flex justify-center items-center">
      <ThreeDots color="blue" />
    </div>
  );
};

export default Loader;
