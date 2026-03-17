import { useEffect, useState } from "react";
import SongCard from "../SongCard/SongCard";
import api from "../../services/api";

const SongGrid = () => {

    const [songs, setSongs] = useState([]);

    useEffect(() => {

        const fetchSongs = async () => {

            try {

                const res = await api.get("/songs");

                setSongs(res.data);

            } catch (err) {

                console.error(err);

            }

        };

        fetchSongs();

    }, []);

    return (

        <div>

            <h2 className="section-title">Trending Songs</h2>

            <div className="song-grid">

                {songs.map(song => (
                    <SongCard
                        key={song._id}
                        song={song}
                    />
                ))}

            </div>

        </div>

    );

};

export default SongGrid;

