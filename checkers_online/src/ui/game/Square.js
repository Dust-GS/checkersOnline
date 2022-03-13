import React from "react";
import { enemyMovedAction, someoneWonAction } from "../../ducks/rooms/actions";
import Piece from "./Piece";
import { connect } from "react-redux";
import "./Square.scss";

function Square({
  yourId,
  roomId,
  socket,
  squareData,
  squareColor,
  rowNumber,
  columnNumber,
  moveOptions,
  setMoveOptions,
  yourColor,
  board,
  whoIsNow,
  clickedSquare,
  setClickedSquare,
  enemyMovedAction,
  someoneWonAction,
}) {
  //simple type (string/int), it will be passed by value.
  const checkIfSquareIsAnOption = (rowNumber, columnNumber) => {
    //domyslenie parametry shodwują to co poza funkcją wiec zeby dostac sie do zmiennej
    //ktora nazywa sie jak parametr to trzeba cos zrobic a domyslnie pod uwage brane są parametry
    //zabaway z this są przy obiektach clasach itd.
    let isOption = false;

    moveOptions.forEach((el) => {
      if (el[0] === rowNumber && el[1] === columnNumber) isOption = true;
    });

    return isOption;
  };

  const handleSquareClick = () => {
    //gdy rusza sie czerwony
    //console.log(`rowNumber: ${rowNumber}, columnNumber: ${columnNumber}`);
    if (yourColor === "red" && squareData === "r" && whoIsNow === "red") {
      const result = [];
      setClickedSquare([rowNumber, columnNumber, "r"]);

      //ruch w prawą strone
      if (rowNumber + 1 <= 7 && columnNumber + 1 <= 7) {
        //czy nie wychodzi poza plansze
        if (
          board[rowNumber + 1][columnNumber + 1] === "b" &&
          rowNumber + 2 <= 7 &&
          columnNumber + 2 <= 7
        ) {
          if (board[rowNumber + 2][columnNumber + 2] === " ")
            result.push([rowNumber + 2, columnNumber + 2]);
        } else if (board[rowNumber + 1][columnNumber + 1] === " ") {
          result.push([rowNumber + 1, columnNumber + 1]);
        }
      }

      //ruch w lewą strone
      if (rowNumber + 1 <= 7 && columnNumber - 1 >= 0) {
        //czy nie wychodzi poza plansze
        if (
          board[rowNumber + 1][columnNumber - 1] === "b" &&
          rowNumber + 2 <= 7 &&
          columnNumber - 2 >= 0
        ) {
          if (board[rowNumber + 2][columnNumber - 2] === " ")
            result.push([rowNumber + 2, columnNumber - 2]);
        } else if (board[rowNumber + 1][columnNumber - 1] === " ") {
          result.push([rowNumber + 1, columnNumber - 1]);
        }
      }

      setMoveOptions(result);
      //gdy rusza sie czarny
    } else if (
      yourColor === "black" &&
      squareData === "b" &&
      whoIsNow === "black"
    ) {
      const result = [];
      setClickedSquare([rowNumber, columnNumber, "b"]);

      //ruch w prawą strone
      if (rowNumber - 1 >= 0 && columnNumber + 1 <= 7) {
        //czy nie wychodzi poza plansze
        if (
          board[rowNumber - 1][columnNumber + 1] === "r" &&
          rowNumber - 2 >= 0 &&
          columnNumber + 2 <= 7
        ) {
          if (board[rowNumber - 2][columnNumber + 2] === " ")
            result.push([rowNumber - 2, columnNumber + 2]);
        } else if (board[rowNumber - 1][columnNumber + 1] === " ") {
          result.push([rowNumber - 1, columnNumber + 1]);
        }
      }

      //ruch w lewą strone
      if (rowNumber - 1 >= 0 && columnNumber - 1 >= 0) {
        //czy nie wychodzi poza plansze
        if (
          board[rowNumber - 1][columnNumber - 1] === "r" &&
          rowNumber - 2 >= 0 &&
          columnNumber - 2 >= 0
        ) {
          if (board[rowNumber - 2][columnNumber - 2] === " ")
            result.push([rowNumber - 2, columnNumber - 2]);
        } else if (board[rowNumber - 1][columnNumber - 1] === " ") {
          result.push([rowNumber - 1, columnNumber - 1]);
        }
      }

      setMoveOptions(result);
    } else if (checkIfSquareIsAnOption(rowNumber, columnNumber)) {
      const result = [];
      let pieceWasCaptured = false;
      const updatedBoard = board;

      updatedBoard[clickedSquare[0]][clickedSquare[1]] = " "; //pole z ktorego sie ruszam
      updatedBoard[rowNumber][columnNumber] = clickedSquare[2]; //pole na ktore sie ruszam

      //czerwone
      if (yourColor === "red") {
        if (
          clickedSquare[0] + 2 === rowNumber &&
          clickedSquare[1] + 2 === columnNumber
        ) {
          //czy zbilem na prawo
          updatedBoard[clickedSquare[0] + 1][clickedSquare[1] + 1] = " ";
          pieceWasCaptured = true;
        } else if (
          clickedSquare[0] + 2 === rowNumber &&
          clickedSquare[1] - 2 === columnNumber
        ) {
          //czy zbilem na lewo
          updatedBoard[clickedSquare[0] + 1][clickedSquare[1] - 1] = " ";
          pieceWasCaptured = true;
        }
      } else {
        //czarne
        if (
          //czy zbilem na prawo
          clickedSquare[0] - 2 === rowNumber &&
          clickedSquare[1] + 2 === columnNumber
        ) {
          updatedBoard[clickedSquare[0] - 1][clickedSquare[1] + 1] = " ";
          pieceWasCaptured = true;
        } else if (
          clickedSquare[0] - 2 === rowNumber &&
          clickedSquare[1] - 2 === columnNumber
        ) {
          //czy zbilem na lewo
          updatedBoard[clickedSquare[0] - 1][clickedSquare[1] - 1] = " ";
          pieceWasCaptured = true;
        }
      }

      //zliczanie ilosci pionkow
      let newNumberOfBlackPieces = 0;
      let newNumberOfRedPieces = 0;
      updatedBoard.forEach((row) => {
        row.forEach((piece) => {
          if (piece === "b") newNumberOfBlackPieces++;
          else if (piece === "r") newNumberOfRedPieces++;
        });
      });

      if (newNumberOfBlackPieces === 0 || newNumberOfRedPieces === 0) {
        console.log(yourId, roomId);
        socket.emit("new-winner", roomId, yourId);
        someoneWonAction(yourId);
        setMoveOptions([]);
        setClickedSquare([]);
      }
      //co jak zbil
      //czerwone
      if (whoIsNow === "red" && pieceWasCaptured === true) {
        //prawa strona
        if (
          rowNumber + 1 <= 7 &&
          columnNumber + 1 <= 7
          //czy pole jest na planszy
        ) {
          if (
            updatedBoard[rowNumber + 1][columnNumber + 1] === "b" &&
            rowNumber + 2 <= 7 &&
            columnNumber + 2 <= 7
          ) {
            if (updatedBoard[rowNumber + 2][columnNumber + 2] === " ") {
              result.push([rowNumber + 2, columnNumber + 2]);
            }
          }
        }
        //lewa strona
        if (
          rowNumber + 1 <= 7 &&
          columnNumber - 1 >= 0
          //czy pole jest na planszy
        ) {
          if (
            updatedBoard[rowNumber + 1][columnNumber - 1] === "b" &&
            rowNumber + 2 <= 7 &&
            columnNumber - 2 >= 0
          ) {
            if (updatedBoard[rowNumber + 2][columnNumber - 2] === " ") {
              result.push([rowNumber + 2, columnNumber - 2]);
            }
          }
        }
      } else if (whoIsNow === "black" && pieceWasCaptured === true) {
        //czarne
        //prawa strona
        if (rowNumber - 1 >= 0 && columnNumber + 1 <= 7) {
          if (
            updatedBoard[rowNumber - 1][columnNumber + 1] === "r" &&
            rowNumber - 2 >= 0 &&
            columnNumber + 2 <= 7
          ) {
            if (updatedBoard[rowNumber - 2][columnNumber + 2] === " ") {
              result.push([rowNumber - 2, columnNumber + 2]);
            }
          }
        }

        //lewa strona
        if (rowNumber - 1 >= 0 && columnNumber - 1 >= 0) {
          if (
            updatedBoard[rowNumber - 1][columnNumber - 1] === "r" &&
            rowNumber - 2 >= 0 &&
            columnNumber - 2 >= 0
          ) {
            if (updatedBoard[rowNumber - 2][columnNumber - 2] === " ") {
              result.push([rowNumber - 2, columnNumber - 2]);
            }
          }
        }
      }

      if (result.length === 0) {
        setMoveOptions([]);
        setClickedSquare([]);

        socket.emit("piece-move", roomId, updatedBoard);
        //console.log(whoIsNow);

        if (whoIsNow === "black") {
          //setWhoIsNow('red')
          enemyMovedAction(updatedBoard, "red");
        } else {
          enemyMovedAction(updatedBoard, "black");
        }
      } else {
        setMoveOptions(result);
        if (yourColor === "red") {
          setClickedSquare([rowNumber, columnNumber, "r"]);
        } else {
          setClickedSquare([rowNumber, columnNumber, "b"]);
        }
      }
    }
  };

  return (
    <div
      className={`square-box ${
        checkIfSquareIsAnOption(rowNumber, columnNumber)
          ? "moveOption"
          : squareColor
      }`}
      onClick={handleSquareClick}
    >
      <Piece squareData={squareData} />
    </div>
  );
}

const mapDispatchToProps = {
  enemyMovedAction,
  someoneWonAction,
};

export default connect(null, mapDispatchToProps)(Square);
