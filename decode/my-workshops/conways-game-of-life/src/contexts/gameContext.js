import React, { useState, createContext, useEffect, useRef } from "react";
import produce from "immer";
export const GameContext = createContext();

const genEmptyGrid = boardSize => {
  let rows = [];
  for (let i = 0; i < boardSize; i++) {
    let col = [];
    for (let k = 0; k < boardSize; k++) {
      col.push(0);
    }
    rows.push(col);
  }
  return rows;
};
const neighbourCoordinates = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1]
];
let initialGrid = genEmptyGrid(30);
const baseCoords = [
  [13, 15],
  [14, 14],
  [14, 16],
  [15, 14],
  [15, 15],
  [15, 16],
  [16, 15]
];
baseCoords.forEach(coord => {
  initialGrid[coord[0]][coord[1]] = 1;
});

const GameContextProvider = props => {
  const [boardSize, setBoardSize] = useState(30); // number of cells per col/row
  const [gameSpeed, setGameSpeed] = useState(500); //time in milliseconds
  const [grid, setGrid] = useState(initialGrid);
  const [running, setRunning] = useState(false);

  const updateSize = size => {
    setBoardSize(size);
    setGrid(genEmptyGrid(size));
  };
  const updateSpeed = speed => {
    setGameSpeed(speed);
  };
  const clear = () => {
    setGrid(genEmptyGrid(boardSize));
  };
  const randomize = () => {
    let rows = [];
    for (let i = 0; i < boardSize; i++) {
      let col = [];
      for (let k = 0; k < boardSize; k++) {
        col.push(Math.random() > 0.8 ? 1 : 0);
      }
      rows.push(col);
    }
    setGrid(rows);
  };

  const runningRef = useRef(running);
  runningRef.current = running;
  const speedRef = useRef(gameSpeed);
  speedRef.current = gameSpeed;

  const start = () => {
    setRunning(true);
  };

  const pause = () => {
    setRunning(false);
  };

  useEffect(() => {
    if (!running) {
      return;
    }
    const gameCycle = setTimeout(() => {
      setGrid(g => {
        return produce(g, gridCopy => {
          for (let i = 0; i < boardSize; i++) {
            for (let k = 0; k < boardSize; k++) {
              let neighbours = 0;
              neighbourCoordinates.forEach(([x, y]) => {
                let newI = x + i;
                let newK = y + k;

                if (
                  newI >= 0 &&
                  newI < boardSize &&
                  newK >= 0 &&
                  newK < boardSize
                ) {
                  neighbours += g[newI][newK];
                }

                if (neighbours < 2 || neighbours > 3) {
                  gridCopy[i][k] = 0;
                } else if (g[i][k] === 0 && neighbours === 3) {
                  gridCopy[i][k] = 1;
                } else {
                  gridCopy[i][k] = g[i][k];
                }
              });
            }
          }
        });
      });
    }, gameSpeed);
    return () => {
      clearTimeout(gameCycle);
    };
  }, [running, grid]);

  return (
    <GameContext.Provider
      value={{
        boardSize,
        gameSpeed,
        grid,
        setGrid,
        updateSize,
        updateSpeed,
        clear,
        randomize,
        start,
        pause
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
