import { useState } from "react";
import api from "../../services/api";

const UploadArtist = () => {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/admin/artists", {
                artists: [
                    {
                        name,
                        bio
                    }
                ]
            });

            alert("Artist created successfully");
            setName("");
            setBio("");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Artist creation failed");
        }
    };

    return (
        <div className="panel">
            <h2>Add Artist</h2>

            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    placeholder="Artist name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Artist bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />

                <button type="submit">Add Artist</button>
            </form>
        </div>
    );
};

export default UploadArtist;