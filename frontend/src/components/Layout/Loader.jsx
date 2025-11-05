import React from "react";
import { RiLoader3Fill } from "react-icons/ri";
import "../../css/loader.css";

const Loader = () => {
  return (
    <div className="loading-section">
      <RiLoader3Fill className="loading-spinner" />
    </div>
  );
};

export default Loader;
