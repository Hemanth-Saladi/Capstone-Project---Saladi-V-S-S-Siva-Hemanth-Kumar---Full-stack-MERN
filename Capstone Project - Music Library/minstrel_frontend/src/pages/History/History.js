import { useEffect, useState } from "react";
import api from "../../services/api";
import SongCard from "../../components/SongCard/SongCard";

const History = () => {

    const [songs, setSongs] = useState([]);

    const userId = localStorage.getItem("userId");

    useEffect(() => {

        api.get(`/users/${userId}/history`)
            .then(res => setSongs(res.data));

    }, []);

    return (

        <div>

            <h1>Listening History</h1>

            <div className="song-grid">

                {songs.map(song => (
                    <SongCard key={song._id} song={song} />
                ))}

            </div>

        </div>

    );

};

export default History;