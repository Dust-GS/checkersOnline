import React from "react";
import "./Row.scss";
import Square from "./Square";

const Row = ({
  yourId,
  roomId,
  socket,
  rowData,
  rowNumber,
  moveOptions,
  setMoveOptions,
  yourColor,
  board,
  whoIsNow,
  clickedSquare,
  setClickedSquare,
}) => {
  return (
    <div className="row-box">
      {rowData.map((squareData, index) => {
        const columnNumber = index;
        const squareColor =
          rowNumber % 2 === 0
            ? index % 2 === 0
              ? "white"
              : "gray"
            : index % 2 === 0
            ? "gray"
            : "white";

        return (
          <Square
            key={columnNumber + rowNumber}
            yourId={yourId}
            roomId={roomId}
            socket={socket}
            squareData={squareData}
            squareColor={squareColor}
            rowNumber={rowNumber}
            columnNumber={columnNumber}
            moveOptions={moveOptions}
            setMoveOptions={setMoveOptions}
            yourColor={yourColor}
            board={board}
            whoIsNow={whoIsNow}
            clickedSquare={clickedSquare}
            setClickedSquare={setClickedSquare}
          />
        );
      })}
    </div>
  );
};

export default Row;
