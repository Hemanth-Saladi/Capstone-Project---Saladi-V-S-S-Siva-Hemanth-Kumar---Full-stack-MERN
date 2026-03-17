import { useEffect, useState } from "react";
import api from "../../services/api";

const ManageArtists = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        // if /artists list route exists
        api.get("/music/artists")
            .then((res) => setArtists(res.data || []))
            .catch(console.error);
    }, []);

    return (
        <div className="panel">
            <h2>Manage Artists</h2>
            <table className="table">
                <thead>
                    <tr><th>Name</th></tr>
                </thead>
                <tbody>
                    {artists.map((a) => (
                        <tr key={a._id}>
                            <td>{a.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageArtists;