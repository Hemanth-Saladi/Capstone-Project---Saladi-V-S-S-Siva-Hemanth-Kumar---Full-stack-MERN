import { useEffect, useState } from "react";
import api from "../../services/api";
import SongCard from "../../components/SongCard/SongCard";

const NewReleases = () => {

    const [songs, setSongs] = useState([]);

    useEffect(() => {

        api.get("/songs/new")
            .then(res => setSongs(res.data));

    }, []);

    return (

        <div>

            <h1>New Releases</h1>

            <div className="song-grid">

                {songs.map(song => (
                    <SongCard key={song._id} song={song} />
                ))}

            </div>

        </div>

    );

};

export default NewReleases;