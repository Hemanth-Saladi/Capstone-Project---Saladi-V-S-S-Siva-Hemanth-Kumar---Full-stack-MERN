import { useEffect, useState } from "react";
import api from "../../services/api";
import MediaGrid from "../../components/Media/MediaGrid";

const Home = () => {
    const [trending, setTrending] = useState([]);
    const [newSongs, setNewSongs] = useState([]);
    const [mix, setMix] = useState([]);

    useEffect(() => {
        const load = async () => {
            const [a, b, c] = await Promise.all([
                api.get("/songs/mostplayed"),
                api.get("/songs/newest"),
                api.get("/songs/random")
            ]);
            setTrending(a.data || []);
            setNewSongs(b.data || []);
            setMix(c.data || []);
        };
        load().catch(console.error);
    }, []);

    return (
        <>
            <MediaGrid title="Trending Now" items={trending} />
            <MediaGrid title="New Releases" items={newSongs} />
            <MediaGrid title="Your Mix" items={mix} />
        </>
    );
};

export default Home;