import { useEffect, useState } from "react";
import api from "../../services/api";

const ManageArtists = () => {
    const [artists, setArtists] = useState([]);

    const loadArtists = async () => {
        try {
            const res = await api.get("/music/artists");
            setArtists(res.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadArtists();
    }, []);

    const deleteArtist = async (id) => {
        const ok = window.confirm("Delete this artist?");
        if (!ok) return;

        try {
            await api.delete(`/admin/artists/${id}`);
            setArtists((prev) => prev.filter((a) => a._id !== id));
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Artist delete failed");
        }
    };

    return (
        <div className="panel">
            <h2>Manage Artists</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>Artist Name</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {artists.map((artist) => (
                        <tr key={artist._id}>
                            <td>{artist.name}</td>
                            <td>
                                <button onClick={() => deleteArtist(artist._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageArtists;