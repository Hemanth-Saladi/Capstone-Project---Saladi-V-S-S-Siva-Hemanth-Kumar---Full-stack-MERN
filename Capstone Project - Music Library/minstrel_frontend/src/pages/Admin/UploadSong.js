import { useEffect, useState } from "react";
import api from "../../services/api";

const UploadSong = () => {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [files, setFiles] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get("/music/artists")
            .then((res) => setArtists(res.data || []))
            .catch(console.error);

        api.get("/songs")
            .then((res) => {
                const uniqueAlbums = [];
                const seen = new Set();

                (res.data || []).forEach((song) => {
                    if (song.album?.title && !seen.has(song.album.title)) {
                        seen.add(song.album.title);
                        uniqueAlbums.push(song.album.title);
                    }
                });

                setAlbums(uniqueAlbums);
            })
            .catch(console.error);
    }, []);

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

        if (!artist || files.length === 0) {
            alert("Please select or enter artist and choose song files");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("artist", artist);
            formData.append("album", album);

            files.forEach((file) => formData.append("songs", file));

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

            <form onSubmit={handleSubmit}>
                <table className="table form-table">
                    <thead>
                        <tr>
                            <th>Song Name</th>
                            <th>Artist</th>
                            <th>Album</th>
                            <th>Files</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Song title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </td>

                            <td>
                                <input
                                    list="artist-options"
                                    placeholder="Select or type artist"
                                    value={artist}
                                    onChange={(e) => setArtist(e.target.value)}
                                    required
                                />
                                <datalist id="artist-options">
                                    {artists.map((a) => (
                                        <option key={a._id} value={a.name} />
                                    ))}
                                </datalist>
                            </td>

                            <td>
                                <input
                                    list="album-options"
                                    placeholder="Select or type album"
                                    value={album}
                                    onChange={(e) => setAlbum(e.target.value)}
                                />
                                <datalist id="album-options">
                                    {albums.map((a, index) => (
                                        <option key={index} value={a} />
                                    ))}
                                </datalist>
                            </td>

                            <td>
                                <input
                                    type="file"
                                    accept=".mp3,audio/*"
                                    multiple
                                    onChange={handleUpload}
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

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

                <button type="submit" className="upload-btn">
                    {loading ? "Uploading..." : "Upload Songs"}
                </button>
            </form>
        </div>
    );
};

export default UploadSong;