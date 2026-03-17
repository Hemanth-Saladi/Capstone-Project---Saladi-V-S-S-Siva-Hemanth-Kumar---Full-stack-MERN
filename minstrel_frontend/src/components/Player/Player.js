import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const Player = () => {
  const {
    currentSong,
    isPlaying,
    pauseSong,
    resumeSong,
    nextSong,
    toggleQueue
  } = useContext(PlayerContext);

  return (
    <footer className="playerbar">
      <div className="player-left">
        {currentSong ? (
          <>
            <div className="player-song-title">{currentSong.title}</div>
            <div className="player-song-sub">
              {currentSong.artists?.map((a) => a.name).join(", ") || "Unknown Artist"}
            </div>
          </>
        ) : (
          <div className="player-song-title">No song playing</div>
        )}
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button onClick={isPlaying ? pauseSong : resumeSong}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={nextSong}>Next</button>
          <button onClick={toggleQueue}>Queue</button>
        </div>
      </div>

      <div className="player-right">
        <span className="player-status">
          {isPlaying ? "Playing" : "Paused"}
        </span>
      </div>
    </footer>
  );
};

export default Player;