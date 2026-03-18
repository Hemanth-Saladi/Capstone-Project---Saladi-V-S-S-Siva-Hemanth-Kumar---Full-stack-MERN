import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats").then((res) => setStats(res.data)).catch(console.error);
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="panel">
      <h2>Admin Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card"><h3>Songs</h3><p>{stats.totalSongs}</p></div>
        <div className="stat-card"><h3>Users</h3><p>{stats.totalUsers}</p></div>
        <div className="stat-card"><h3>Artists</h3><p>{stats.totalArtists}</p></div>
        <div className="stat-card"><h3>Albums</h3><p>{stats.totalAlbums}</p></div>
        <div className="stat-card"><h3>Total Plays</h3><p>{stats.totalPlays}</p></div>
      </div>

      <div className="row">
        <Link className="btn-link" to="/admin/upload-song">Upload Song</Link>
        <Link className="btn-link" to="/admin/upload-artist">Add Artist</Link>
        <Link className="btn-link" to="/admin/analytics">Analytics</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;