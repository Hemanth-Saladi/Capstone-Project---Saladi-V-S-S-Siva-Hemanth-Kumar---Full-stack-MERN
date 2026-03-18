import { useEffect, useState } from "react";
import api from "../../services/api";
import SongCard from "../../components/SongCard/SongCard";

const Library = () => {

    const [liked, setLiked] = useState([]);
    const [history, setHistory] = useState([]);

    const loadLibrary = async () => {

        try {

            const likedRes = await api.get("/user/liked");
            const historyRes = await api.get("/user/history");

            setLiked(likedRes.data);
            setHistory(historyRes.data);

        } catch (err) {

            console.error(err);

        }

    }

    useEffect(() => {

        loadLibrary();

    }, [])

    return (

        <div className="library-page">

            <h2>Liked Songs</h2>

            <div className="song-grid">

                {liked.map(song => (
                    <SongCard key={song._id} song={song} />
                ))}

            </div>

            <h2>Recently Played</h2>

            <div className="song-grid">

                {history.map(song => (
                    <SongCard key={song._id} song={song} />
                ))}

            </div>

        </div>

    )

}

export default Library