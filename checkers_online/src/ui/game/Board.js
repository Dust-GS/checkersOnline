import React, { useState } from "react";
import "./Board.scss";
import Row from "./Row";

const Board = ({ yourId, roomId, socket, board, yourColor, whoIsNow }) => {
  const [moveOptions, setMoveOptions] = useState([]);
  const [clickedSquare, setClickedSquare] = useState(null);

  return (
    <div className="board-box">
      {board.map((rowData, index) => {
        const rowNumber = index;

        return (
          <Row
            key={rowNumber}
            yourId={yourId}
            roomId={roomId}
            socket={socket}
            rowNumber={rowNumber}
            rowData={rowData}
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

export default Board;
