import React, { useContext, useEffect, useState } from "react";
import produce from "immer";
import { GameContext } from "../contexts/gameContext";

const Grid = () => {
  const { boardSize, grid, setGrid } = useContext(GameContext);
  const [width, setWidth] = useState("");

  useEffect(() => {
    setWidth(document.getElementsByClassName("grid")[0].offsetWidth);
    const handleResize = () =>
      setWidth(document.getElementsByClassName("grid")[0].offsetWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
  const handleCellClick = (i, k) => {
    let newGrid = produce(grid, gridCopy => {
      gridCopy[i][k] = grid[i][k] ? 0 : 1;
    });
    console.log(i, k);
    // newGrid[i][k] = newGrid[i][k] ? 0 : 1;
    setGrid(newGrid);
  };
  return (
    <div
      className="grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${boardSize},${width / boardSize}px)`
      }}
    >
      {/* size:{boardSize} , Speed:{gameSpeed}, width:{width} */}
      {grid.map((rows, i) => {
        return rows.map((cols, k) => {
          return (
            <div
              key={`${i}-${k}`}
              style={{
                // border: "1px solid #eee",
                width: width / boardSize,
                height: width / boardSize,
                backgroundColor: grid[i][k] ? "black" : "#d6d9fd",
                boxSizing: "border-box"
              }}
              draggable={true}
              onDragEnter={() => handleCellClick(i, k)}
              onDragStart={() => handleCellClick(i, k)}
              onClick={() => handleCellClick(i, k)}
            />
          );
        });
      })}
    </div>
  );
};

export default Grid;
