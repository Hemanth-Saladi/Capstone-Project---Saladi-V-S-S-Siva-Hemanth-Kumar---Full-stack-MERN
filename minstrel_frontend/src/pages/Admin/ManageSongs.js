import { useEffect, useState } from "react";
import api from "../../services/api";

const ManageSongs = () => {
    const [songs, setSongs] = useState([]);

    const load = async () => {
        const res = await api.get("/songs");
        setSongs(res.data || []);
    };

    useEffect(() => {
        load().catch(console.error);
    }, []);

    const deleteSong = async (id) => {
        await api.delete(`/admin/songs/${id}`);
        setSongs((prev) => prev.filter((s) => s._id !== id));
    };

    return (
        <div className="panel">
            <h2>Manage Songs</h2>
            <table className="table">
                <thead>
                    <tr><th>Title</th><th>Action</th></tr>
                </thead>
                <tbody>
                    {songs.map((song) => (
                        <tr key={song._id}>
                            <td>{song.title}</td>
                            <td><button onClick={() => deleteSong(song._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageSongs;