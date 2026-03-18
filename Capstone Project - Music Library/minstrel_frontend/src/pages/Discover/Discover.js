import { useEffect, useState } from "react";

import { getSongs, getTrending, getNewReleases } from "../../services/api";

import SongCard from "../../components/SongCard/SongCard";

const Discover = ({ type }) => {

    const [songs, setSongs] = useState([]);

    useEffect(() => {

        const fetchSongs = async () => {

            let res;

            if (type === "trending") {

                res = await getTrending();

            } else if (type === "new") {

                res = await getNewReleases();

            } else {

                res = await getSongs();

            }

            setSongs(res.data);

        };

        fetchSongs();

    }, [type]);

    return (

        <div>

            <h2>Discover Music</h2>

            <div className="song-grid">

                {songs.map(song => (
                    <SongCard key={song._id} song={song} />
                ))}

            </div>

        </div>

    );

};

export default Discover;