import { useState } from "react";
import API from "../../services/api";

const CreateSongs = () => {

    const [songs, setSongs] = useState([]);

    const handleUpload = async (e) => {

        const files = e.target.files;

        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append("songs", files[i]);
        }

        const res = await API.post(
            "/admin/uploadSongs",
            formData
        );

        setSongs(res.data.songs);

    };

    return (

        <div>

            <h2>Upload Songs</h2>

            <input
                type="file"
                multiple
                accept=".mp3"
                onChange={handleUpload}
            />

            {songs.map((song, index) => (

                <div key={index}>

                    <input defaultValue={song.title} />

                    <input defaultValue={song.artist} />

                    <input defaultValue={song.duration} />

                </div>

            ))}

        </div>

    );

};

export default CreateSongs;