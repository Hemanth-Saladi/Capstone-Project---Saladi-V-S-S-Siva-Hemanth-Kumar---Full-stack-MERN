import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import MediaGrid from "../../components/Media/MediaGrid";

const ArtistPage = () => {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        api.get(`/artists/${id}`)
            .then((res) => {
                setArtist(res.data.artist);
                setSongs(res.data.songs || []);
            })
            .catch(console.error);
    }, [id]);

    return (
        <div className="panel">
            <h2>{artist?.name || "Artist"}</h2>
            <MediaGrid title="Songs" items={songs} />
        </div>
    );
};

export default ArtistPage;