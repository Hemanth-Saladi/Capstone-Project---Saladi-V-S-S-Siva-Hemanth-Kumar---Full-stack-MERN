import { useState } from "react";
import api from "../../services/api";

const CreatePlaylist = () => {

    const [name, setName] = useState("");

    const userId = localStorage.getItem("userId");

    const createPlaylist = async () => {

        try {

            await api.post("/playlists/create", {
                name,
                userId
            });

            alert("Playlist created");

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <div>

            <h2>Create Playlist</h2>

            <input
                type="text"
                placeholder="Playlist Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <button onClick={createPlaylist}>
                Create
            </button>

        </div>

    );

};

export default CreatePlaylist;