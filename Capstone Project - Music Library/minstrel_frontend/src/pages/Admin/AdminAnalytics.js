import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminAnalytics = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        api.get("/admin/stats").then((res) => setStats(res.data)).catch(console.error);
    }, []);

    if (!stats) return <p>Loading analytics...</p>;

    return (
        <div className="panel">
            <h2>Analytics</h2>
            <div className="stats-grid">
                <div className="stat-card"><h3>Songs</h3><p>{stats.totalSongs}</p></div>
                <div className="stat-card"><h3>Users</h3><p>{stats.totalUsers}</p></div>
                <div className="stat-card"><h3>Artists</h3><p>{stats.totalArtists}</p></div>
                <div className="stat-card"><h3>Total Plays</h3><p>{stats.totalPlays}</p></div>
            </div>
        </div>
    );
};

export default AdminAnalytics;