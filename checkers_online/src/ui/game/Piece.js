import React from "react";
import "./Piece.scss";

const Piece = ({ squareData }) => {
  return <div className={`piece ${squareData}`}></div>;
};

export default Piece;
