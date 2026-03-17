import { useEffect, useState } from "react";
import api from "../../services/api";
import MediaGrid from "../../components/Media/MediaGrid";

const LikedSongs = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        if (!user?._id) return;
        api.get(`/users/${user._id}/liked`)
            .then((res) => setSongs(res.data || []))
            .catch(console.error);
    }, [user?._id]);

    return <MediaGrid title="Liked Songs" items={songs} />;
};

export default LikedSongs;