import React from "react";
import GameContextProvider from "./contexts/gameContext";
import Grid from "./components/grid";
import Settings from "./components/settings";
function App() {
  return (
    <div className="App">
      <header>
        <h1>Conway's Game Of Life</h1>
      </header>
      <div className="game">
        <GameContextProvider>
          <Grid />
          <Settings />
        </GameContextProvider>
      </div>
      <footer>
        <i>Learn more about Conway's game of life here: </i>
        <a
          href="https://www.youtube.com/watch?v=R9Plq-D1gEk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/material-sharp/24/000000/youtube-play.png"
            alt="youtube icon"
          />
        </a>
        <a
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/ios/50/000000/wikipedia.png"
            alt="wikipedia icon"
          />
        </a>
      </footer>
    </div>
  );
}

export default App;
