import React, { useContext } from "react";
import { GameContext } from "../contexts/gameContext";
const Settings = () => {
  const {
    clear,
    randomize,
    updateSize,
    updateSpeed,
    boardSize,
    gameSpeed,
    start,
    pause
  } = useContext(GameContext);
  const handleSizeChange = e => {
    updateSize(e.target.value);
  };
  const handleSpeedChange = e => {
    updateSpeed(e.target.value);
  };
  return (
    <div className="settings">
      <button onClick={() => clear()}>Clear</button>
      <button onClick={() => randomize()}>Randomize</button>
      <label>cell size:</label>
      <input
        type="range"
        min="15"
        max="45"
        value={boardSize}
        onChange={handleSizeChange}
      />
      <label>speed:</label>
      <input
        type="range"
        min="0"
        max="1000"
        value={gameSpeed}
        onChange={handleSpeedChange}
        className="speed-range"
      />
      <button onClick={() => start()}>Start</button>
      <button onClick={() => pause()}>Pause</button>
    </div>
  );
};
export default Settings;
