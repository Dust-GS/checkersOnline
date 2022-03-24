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

  const queenGetMoveOptions = (result, you, enemy) => {
    //mozliweosc prawy gorny skos
    //zaczynamy od bloczka gora prawo od pionka
    //czy gora prawo nie jest poza planszą
    if (rowNumber - 1 >= 0 && columnNumber + 1 <= 7) {
      //czy prawo gora jest puste
      if (board[rowNumber - 1][columnNumber + 1].toLowerCase() === " ") {
        let x = rowNumber - 1;
        let y = columnNumber + 1;

        while (x >= 0 && y <= 7) {
          //co jak trafilismy na pionek przeciwnika
          if (board[x][y].toLowerCase() === enemy) {
            //czy pole za nim nie wychodzi z board
            if (x - 1 <= 7 && y + 1 >= 0) {
              //czy to pole jest puste
              if (board[x - 1][y + 1] === " ") {
                result.push([x - 1, y + 1]);
              }
            }
            break;
            //co jak trafimy na swojego
          } else if (board[x][y].toLowerCase() === you) {
            break;
          } else {
            result.push([x, y]);
          }

          x -= 1;
          y += 1;
        }
      }
    }

    //mozliwosci ruchu gora lewo
    //czy gora lewo jest na planszy
    if (rowNumber - 1 >= 0 && columnNumber - 1 >= 0) {
      //czy lewo gora jest puste
      if (board[rowNumber - 1][columnNumber - 1].toLowerCase() === " ") {
        let x = rowNumber - 1;
        let y = columnNumber - 1;

        while (x >= 0 && y >= 0) {
          //co jak trafilismy na pionek przeciwnika
          if (board[x][y].toLowerCase() === enemy) {
            //czy pole za nim nie wychodzi z board i jest puste
            if (x - 1 >= 0 && y - 1 >= 0) {
              if (board[x - 1][y - 1] === " ") {
                result.push([x - 1, y - 1]);
              }
            }
            break;
            //co jak trafimy na swojego
          } else if (board[x][y].toLowerCase() === you) {
            break;
          } else {
            result.push([x, y]);
          }

          x -= 1;
          y -= 1;
        }
      }
    }

    //dół prawo ruch

    //czy dol prawo jest na planszy
    if (rowNumber + 1 <= 7 && columnNumber + 1 <= 7) {
      //czy lewo gora jest puste
      if (board[rowNumber + 1][columnNumber + 1].toLowerCase() === " ") {
        let x = rowNumber + 1;
        let y = columnNumber + 1;

        while (x <= 7 && y <= 7) {
          //co jak trafilismy na pionek przeciwnika
          if (board[x][y].toLowerCase() === enemy) {
            //czy pole za nim nie wychodzi z board i jest puste
            if (x + 1 <= 7 && y + 1 <= 7) {
              if (board[x + 1][y + 1] === " ") {
                result.push([x + 1, y + 1]);
              }
            }
            break;
            //co jak trafimy na swojego
          } else if (board[x][y].toLowerCase() === you) {
            break;
          } else {
            result.push([x, y]);
          }

          x += 1;
          y += 1;
        }
      }
    }

    //czy dol lewo jest na planszy
    if (rowNumber + 1 <= 7 && columnNumber - 1 >= 0) {
      //czy lewo gora jest puste
      if (board[rowNumber + 1][columnNumber - 1].toLowerCase() === " ") {
        let x = rowNumber + 1;
        let y = columnNumber - 1;

        while (x <= 7 && y >= 0) {
          //co jak trafilismy na pionek przeciwnika
          if (board[x][y].toLowerCase() === enemy) {
            //czy pole za nim nie wychodzi z board i jest puste
            if (x + 1 <= 7 && y - 1 >= 0) {
              if (board[x + 1][y - 1] === " ") {
                result.push([x + 1, y - 1]);
              }
            }
            break;
            //co jak trafimy na swojego
          } else if (board[x][y].toLowerCase() === you) {
            break;
          } else {
            result.push([x, y]);
          }

          x += 1;
          y -= 1;
        }
      }
    }
  };

  const redPieceGetMoveOptions = (result, isAfterCapture) => {
    //ruch w prawą strone
    if (rowNumber + 1 <= 7 && columnNumber + 1 <= 7) {
      //ruch normalnym pionkiem
      //czy nie wychodzi poza plansze
      if (
        board[rowNumber + 1][columnNumber + 1] === "b" &&
        rowNumber + 2 <= 7 &&
        columnNumber + 2 <= 7
      ) {
        if (board[rowNumber + 2][columnNumber + 2] === " ")
          result.push([rowNumber + 2, columnNumber + 2]);
      } else if (
        board[rowNumber + 1][columnNumber + 1] === " " &&
        isAfterCapture === false
      ) {
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
      } else if (
        board[rowNumber + 1][columnNumber - 1] === " " &&
        isAfterCapture === false
      ) {
        result.push([rowNumber + 1, columnNumber - 1]);
      }
    }
  };

  const blackPieceGetMoveOptions = (result, isAfterCapture) => {
    //ruch pionkiem
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
      } else if (
        board[rowNumber - 1][columnNumber + 1] === " " &&
        isAfterCapture === false
      ) {
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
      } else if (
        board[rowNumber - 1][columnNumber - 1] === " " &&
        isAfterCapture === false
      ) {
        result.push([rowNumber - 1, columnNumber - 1]);
      }
    }
  };

  const moveYourPiece = () => {
    board[clickedSquare[0]][clickedSquare[1]] = " "; //pole z ktorego sie ruszam

    //czy pole na ktore sie ruszam jest na granicy bo wtedy powstaje damka pisana capslockiem
    if (yourColor === "red") {
      if (rowNumber + 1 > 7) {
        //pole na ktore sie ruszam
        board[rowNumber][columnNumber] = clickedSquare[2].toUpperCase();
      } else {
        board[rowNumber][columnNumber] = clickedSquare[2]; //pole na ktore sie ruszam
      }
    } else {
      if (rowNumber - 1 < 0) {
        //pole na ktore sie ruszam
        board[rowNumber][columnNumber] = clickedSquare[2].toUpperCase();
      } else {
        board[rowNumber][columnNumber] = clickedSquare[2]; //pole na ktore sie ruszam
      }
    }
  };

  const checkIfPawnWasCaptured = () => {
    //czerwone
    if (yourColor === "red") {
      if (
        clickedSquare[0] + 2 === rowNumber &&
        clickedSquare[1] + 2 === columnNumber
      ) {
        //czy zbilem na prawo
        board[clickedSquare[0] + 1][clickedSquare[1] + 1] = " ";
        return true;
      } else if (
        clickedSquare[0] + 2 === rowNumber &&
        clickedSquare[1] - 2 === columnNumber
      ) {
        //czy zbilem na lewo
        board[clickedSquare[0] + 1][clickedSquare[1] - 1] = " ";
        return true;
      }
    } else {
      //czarne
      if (
        //czy zbilem na prawo
        clickedSquare[0] - 2 === rowNumber &&
        clickedSquare[1] + 2 === columnNumber
      ) {
        board[clickedSquare[0] - 1][clickedSquare[1] + 1] = " ";
        return true;
      } else if (
        clickedSquare[0] - 2 === rowNumber &&
        clickedSquare[1] - 2 === columnNumber
      ) {
        //czy zbilem na lewo
        board[clickedSquare[0] - 1][clickedSquare[1] - 1] = " ";
        return true;
      }
    }

    //false gdy nie zbilem
    return false;
  };

  const handleSquareClick = () => {
    //gdy rusza sie czerwony
    //console.log(`rowNumber: ${rowNumber}, columnNumber: ${columnNumber}`);
    if (
      //czy kliknąłem swoj pionek w swojej rundzie
      yourColor === "red" &&
      squareData.toLowerCase() === "r" &&
      whoIsNow === "red"
    ) {
      const result = [];
      setClickedSquare([rowNumber, columnNumber, squareData]);

      //pobierz mozliwe ruchy
      if (squareData === "R") {
        //ruch damką
        queenGetMoveOptions(result, "r", "b");
      } else {
        //pobieramy mozliwosci ruchu pionkiem
        redPieceGetMoveOptions(result, false);
      }

      //przesylamy te opcje na pole gry
      setMoveOptions(result);
      //gdy rusza sie czarny
    } else if (
      yourColor === "black" &&
      squareData === "b" &&
      whoIsNow === "black"
    ) {
      const result = [];
      setClickedSquare([rowNumber, columnNumber, "b"]);

      if (squareData === "B") {
        //ruch damką
        queenGetMoveOptions(result, "b", "r");
      } else {
        blackPieceGetMoveOptions(result, false);
      }

      //wyslamy opcje ruchu
      setMoveOptions(result);
    } else if (checkIfSquareIsAnOption(rowNumber, columnNumber)) {
      //co jezelie kliknelismy w pole ktore jest opcją ruchu
      const result = [];

      //przesun pionka na miecja w ktore sie ruszasz
      moveYourPiece();

      //sprawdzamy czy zbielem
      const pieceWasCaptured = checkIfPawnWasCaptured();

      if (pieceWasCaptured === true){
        //checkIfCapturedPawnWasTheLastOne()
      }

      //sprawdzanie czy ktos wygral
      //zliczanie ilosci pionkow
      let newNumberOfBlackPieces = 0;
      let newNumberOfRedPieces = 0;

      board.forEach((row) => {
        row.forEach((piece) => {
          if (piece.toLowerCase() === "b") newNumberOfBlackPieces++;
          else if (piece.toLowerCase() === "r") newNumberOfRedPieces++;
        });
      });

      if (newNumberOfBlackPieces === 0 || newNumberOfRedPieces === 0) {
        socket.emit("new-winner", roomId, yourId);
        someoneWonAction(yourId);
        setMoveOptions([]);
        setClickedSquare([]);
      }

      //co jak zbil
      //czerwone
      if (whoIsNow === "red" && pieceWasCaptured === true) {
        //czerwone pobieramy opcje ruchu po biciu
        redPieceGetMoveOptions(result, true)
      } else if (whoIsNow === "black" && pieceWasCaptured === true) {
        //czarne pobieramy opcje ruchu po biciu
        blackPieceGetMoveOptions(result, true)
      }

      //co jak mamy opcje ruchu
      if (result.length === 0) {
        setMoveOptions([]);
        setClickedSquare([]);

        socket.emit("piece-move", roomId, board);

        if (whoIsNow === "black") {
          //setWhoIsNow('red')
          enemyMovedAction(board, "red");
        } else {
          enemyMovedAction(board, "black");
        }
        //co jak nie mamy opcji ruchu
      } else {
        //jezeli są kolejne opcje ruchu
        setMoveOptions(result);
        setClickedSquare([rowNumber, columnNumber, clickedSquare[2]]);
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
