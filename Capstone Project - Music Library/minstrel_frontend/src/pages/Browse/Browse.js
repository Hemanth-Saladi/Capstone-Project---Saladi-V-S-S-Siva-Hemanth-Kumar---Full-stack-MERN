import { useEffect, useState } from "react";
import api from "../../services/api";
import MediaGrid from "../../components/Media/MediaGrid";

const Browse = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        api.get("/songs").then((res) => setSongs(res.data || [])).catch(console.error);
    }, []);

    return <MediaGrid title="Browse Songs" items={songs} />;
};

export default Browse;