import React from "react";
import classes from "./Square.module.css";

const Square = props => {
  return (
    <div id={props.id} onClick={props.onSquareClick} className={classes.Square}>
      {props.squares}
    </div>
  );
};

export default Square;
