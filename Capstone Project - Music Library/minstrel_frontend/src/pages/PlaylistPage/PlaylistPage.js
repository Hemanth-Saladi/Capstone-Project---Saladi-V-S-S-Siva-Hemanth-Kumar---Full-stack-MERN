import { useEffect, useState } from "react";
import api from "../../services/api";
import MediaGrid from "../../components/Media/MediaGrid";

const PlaylistPage = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const [playlists, setPlaylists] = useState([]);
    const [name, setName] = useState("");

    const load = async () => {
        if (!user?._id) return;
        const res = await api.get(`/playlists/user/${user._id}`);
        setPlaylists(res.data || []);
    };

    useEffect(() => {
        load().catch(console.error);
    }, [user?._id]);

    const createPlaylist = async () => {
        if (!name.trim()) return;
        await api.post("/playlists/create", { name, userId: user._id });
        setName("");
        load().catch(console.error);
    };

    return (
        <div className="panel">
            <h2>Your Playlists</h2>
            <div className="row">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Playlist name" />
                <button onClick={createPlaylist}>Create</button>
            </div>

            {playlists.map((pl) => (
                <div key={pl._id} className="section">
                    <h3>{pl.name}</h3>
                    <MediaGrid title="" items={pl.songs || []} />
                </div>
            ))}
        </div>
    );
};

export default PlaylistPage;