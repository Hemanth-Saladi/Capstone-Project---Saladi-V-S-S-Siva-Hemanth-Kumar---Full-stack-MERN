import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const formatTime = (time) => {
  if (!time || Number.isNaN(time)) return "0:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const Player = () => {
  const {
    currentSong,
    isPlaying,
    pauseSong,
    resumeSong,
    nextSong,
    prevSong,
    toggleQueue,
    progress,
    duration,
    seekTo
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
          <button onClick={prevSong}>Prev</button>
          <button onClick={isPlaying ? pauseSong : resumeSong}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={nextSong}>Next</button>
        </div>

        <div className="player-seek-row">
          <span>{formatTime(progress)}</span>

          <input
            className="player-seek"
            type="range"
            min="0"
            max={duration || 0}
            value={progress || 0}
            onChange={(e) => seekTo(Number(e.target.value))}
          />

          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-right">
        <button className="queue-btn" onClick={toggleQueue}>
          Queue
        </button>
      </div>
    </footer>
  );
};

export default Player;