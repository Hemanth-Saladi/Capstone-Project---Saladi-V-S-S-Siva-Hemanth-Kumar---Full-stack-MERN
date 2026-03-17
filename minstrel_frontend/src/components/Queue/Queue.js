import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const Queue = () => {
  const { queue, queueOpen, playSong } = useContext(PlayerContext);

  return (
    <aside className={`queue ${queueOpen ? "open" : ""}`}>
      <h3>Queue</h3>
      {queue.length === 0 && <p>No songs in queue</p>}
      {queue.map((song) => (
        <div key={song._id} className="queue-item" onClick={() => playSong(song)}>
          {song.title}
        </div>
      ))}
    </aside>
  );
};

export default Queue;