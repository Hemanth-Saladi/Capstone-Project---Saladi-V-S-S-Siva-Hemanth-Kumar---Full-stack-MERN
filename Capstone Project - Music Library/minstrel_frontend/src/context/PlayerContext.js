import { createContext, useEffect, useRef, useState } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]);
  const [history, setHistory] = useState([]);
  const [queueOpen, setQueueOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const playSong = (song) => {
    if (!song) return;

    const audio = audioRef.current;

    if (currentSong && currentSong._id !== song._id) {
      setHistory((prev) => [...prev, currentSong]);
    }

    setCurrentSong(song);
    audio.src = `http://localhost:5000/${song.audioUrl}`;
    audio.play().catch(console.error);
    setIsPlaying(true);

    fetch(`http://localhost:5000/api/songs/play/${song._id}`, {
      method: "POST"
    }).catch(() => { });
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const resumeSong = () => {
    audioRef.current.play().catch(console.error);
    setIsPlaying(true);
  };

  const addToQueue = (song) => setQueue((prev) => [...prev, song]);

  const playNext = (song) => setQueue((prev) => [song, ...prev]);

  const nextSong = () => {
    if (queue.length === 0) {
      setIsPlaying(false);
      return;
    }

    const next = queue[0];
    setQueue((prev) => prev.slice(1));
    playSong(next);
  };

  const prevSong = () => {
    if (history.length === 0) return;

    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    playSong(previous);
  };

  const seekTo = (value) => {
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress(audio.currentTime || 0);
      setDuration(audio.duration || 0);
    };

    const handleEnd = () => {
      nextSong();
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnd);
    };
  }, [queue, currentSong, history]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        queue,
        history,
        queueOpen,
        isPlaying,
        progress,
        duration,
        audioRef,
        playSong,
        pauseSong,
        resumeSong,
        addToQueue,
        playNext,
        nextSong,
        prevSong,
        seekTo,
        toggleQueue: () => setQueueOpen((p) => !p)
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};