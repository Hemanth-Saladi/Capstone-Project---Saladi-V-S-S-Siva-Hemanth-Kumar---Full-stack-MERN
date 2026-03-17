import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import api from "../../services/api";

const SongCard = ({ song }) => {
  const { playSong, addToQueue, playNext } = useContext(PlayerContext);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const likeSong = async () => {
    if (!user?._id) return;
    try {
      await api.post("/songs/like", {
        userId: user._id,
        songId: song._id
      });
      alert("Song liked");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="card">
      <img
        className="cover"
        src={song.coverUrl ? `http://localhost:5000/${song.coverUrl}` : "https://via.placeholder.com/300"}
        alt={song.title}
        onClick={() => playSong(song)}
      />
      <h4>{song.title}</h4>
      <p>{song.artists?.map((a) => a.name).join(", ") || "Unknown artist"}</p>
      <div className="card-actions">
        <button onClick={() => playSong(song)}>Play</button>
        <button onClick={() => addToQueue(song)}>Queue</button>
        <button onClick={() => playNext(song)}>Next</button>
        <button onClick={likeSong}>Like</button>
      </div>
    </div>
  );
};

export default SongCard;