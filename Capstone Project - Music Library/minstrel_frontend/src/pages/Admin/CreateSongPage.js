import { useState } from "react";
import API from "../../services/api";

const CreateSongPage = () => {

    const [form, setForm] = useState({

        name: "",
        duration: "",
        artist: "",
        album: "",
        genre: ""

    });

    const handleChange = (e) => {

        setForm({

            ...form,
            [e.target.name]: e.target.value

        })

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/songs/create", form);

            alert("Song created successfully");

        } catch (err) {

            console.error(err);

        }

    }

    return (

        <div className="admin-create">

            <h2>Create Song</h2>

            <form onSubmit={handleSubmit} className="create-form">

                <input name="name" placeholder="Song Name" onChange={handleChange} />

                <input name="duration" placeholder="Duration" onChange={handleChange} />

                <input name="artist" placeholder="Artist" onChange={handleChange} />

                <input name="album" placeholder="Album" onChange={handleChange} />

                <input name="genre" placeholder="Genre" onChange={handleChange} />

                <button type="submit">

                    Upload Song

                </button>

            </form>

        </div>

    )

}

export default CreateSongPage;