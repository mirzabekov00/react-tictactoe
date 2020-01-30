import React, {useState} from "react";
import Square from "../../components/Square/Square";
import classes from "./Board.module.css";

const Board = () => {
  const [state, setState] = useState({
    squares: Array(9).fill(null)
  });

  const winnerLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
  ];

  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState("");

  const onClickHandler = e => {
    if (winner === "") {
      let data = e.target.getAttribute("id");
      let currentSquares = state.squares;

      if (currentSquares[data] === null) {
        currentSquares[data] = count % 2 === 0 ? "X" : "O";
        setState({squares: currentSquares});
        setCount(count + 1);
        isWinner(currentSquares[data]);
      }
    }
  };

  const isWinner = s => {
    if (state.squares.includes(null)) {
      for (let i in winnerLine) {
        let line = winnerLine[i];
        if (
          state.squares[line[0]] === s &&
          state.squares[line[1]] === s &&
          state.squares[line[2]] === s
        ) {
          let winnerIs = count % 2 === 0 ? "X" : "O";
          setWinner(winnerIs);
          setTimeout(() => {
            setCount(0);
            setState({squares: Array(9).fill(null)});
            setWinner("");
          }, 3000);
        }
      }
    } else {
      setWinner("Draw");
      setTimeout(() => {
        setCount(0);
        setState({squares: Array(9).fill(null)});
        setWinner("");
      }, 3000);
    }
  };

  return (
    <>
      <div className="title">
        <h1>Tic Tac Toe</h1>
        {winner === "Draw" ? (
          <p>{winner}</p>
        ) : winner !== "" ? (
          <p>Winner is: {winner}</p>
        ) : (
          ""
        )}
      </div>
      <div className={classes.Wrapper}>
        <div className={classes.Board}>
          {state.squares.map((e, i) => {
            return (
              <Square
                squares={state.squares[i]}
                key={i}
                id={i}
                onSquareClick={onClickHandler}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Board;
