import { useEffect, useState } from "react";
import api from "../../services/api";
import MediaGrid from "../../components/Media/MediaGrid";

const AdminHome = () => {
    const [mix, setMix] = useState([]);
    const [trending, setTrending] = useState([]);
    const [newSongs, setNewSongs] = useState([]);
    const [recent, setRecent] = useState([]);

    useEffect(() => {
        const load = async () => {
            const [a, b, c, d] = await Promise.all([
                api.get("/songs/random"),
                api.get("/songs/mostplayed"),
                api.get("/songs/newest"),
                api.get("/songs")
            ]);
            setMix(a.data || []);
            setTrending(b.data || []);
            setNewSongs(c.data || []);
            setRecent((d.data || []).slice(0, 10));
        };
        load().catch(console.error);
    }, []);

    return (
        <>
            <MediaGrid title="Your Mix" items={mix} />
            <MediaGrid title="Trending" items={trending} />
            <MediaGrid title="New Releases" items={newSongs} />
            <MediaGrid title="Recently Uploaded" items={recent} />
        </>
    );
};

export default AdminHome;