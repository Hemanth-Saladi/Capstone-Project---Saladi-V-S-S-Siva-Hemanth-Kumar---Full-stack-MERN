import { useEffect, useState } from "react";
import api from "../../services/api";

const Database = () => {

    const [stats, setStats] = useState({});

    useEffect(() => {

        api.get("/admin/stats")
            .then(res => setStats(res.data));

    }, []);

    return (

        <div className="database-page">

            <h1>Database Overview</h1>

            <div className="stats-grid">

                <div className="stat-card">
                    <h3>Songs</h3>
                    <p>{stats.totalSongs}</p>
                </div>

                <div className="stat-card">
                    <h3>Artists</h3>
                    <p>{stats.totalArtists}</p>
                </div>

                <div className="stat-card">
                    <h3>Albums</h3>
                    <p>{stats.totalAlbums}</p>
                </div>

                <div className="stat-card">
                    <h3>Users</h3>
                    <p>{stats.totalUsers}</p>
                </div>

                <div className="stat-card">
                    <h3>Total Plays</h3>
                    <p>{stats.totalPlays}</p>
                </div>

            </div>

        </div>

    );

};

export default Database;