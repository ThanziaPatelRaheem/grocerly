import React from "react";
import { RiArrowLeftWideFill } from "react-icons/ri";
import { RiArrowRightWideFill } from "react-icons/ri";

const ScrollArrows = ({ onScroll }) => {
  return (
    <div className="arrow-controls">
      <button className="carousel-arrow left" onClick={() => onScroll("left")}>
        <RiArrowLeftWideFill className="left-aicon" />
      </button>
      <button
        className="carousel-arrow right-arrow"
        onClick={() => onScroll("right")}
      >
        <RiArrowRightWideFill className="right-aicon" />
      </button>
    </div>
  );
};

export default React.memo(ScrollArrows);
