import { useState } from "react";
import api from "../../services/api";

const UploadSong = () => {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleUpload = (e) => {
        const selected = Array.from(e.target.files || []);

        if (selected.length > 15) {
            alert("Max 15 songs allowed");
            return;
        }

        setFiles(selected);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !artist || files.length === 0) {
            alert("Please provide title, artist and at least one song file");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("artist", artist);
            formData.append("album", album);

            files.forEach((file) => {
                formData.append("songs", file);
            });

            await api.post("/admin/upload-song", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("Songs uploaded successfully");
            setTitle("");
            setArtist("");
            setAlbum("");
            setFiles([]);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Song upload failed");
        }

        setLoading(false);
    };

    return (
        <div className="panel">
            <h2>Upload Songs</h2>

            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    placeholder="Song title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Artist"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Album"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                />

                <input
                    type="file"
                    accept=".mp3,audio/*"
                    multiple
                    onChange={handleUpload}
                    required
                />

                {files.length > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>Size (KB)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file, i) => (
                                <tr key={i}>
                                    <td>{file.name}</td>
                                    <td>{Math.round(file.size / 1024)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <button type="submit">
                    {loading ? "Uploading..." : "Upload Songs"}
                </button>
            </form>
        </div>
    );
};

export default UploadSong;