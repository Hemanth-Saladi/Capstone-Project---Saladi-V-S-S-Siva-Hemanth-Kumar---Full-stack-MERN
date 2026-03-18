import { NavLink } from "react-router-dom";

const ActivitySidebar = () => (
    <aside className="sidebar">
        <h3>Admin</h3>
        <NavLink to="/admin">Dashboard</NavLink>
        <NavLink to="/admin/home">Music Home</NavLink>
        <NavLink to="/admin/upload-song">Upload Song</NavLink>
        <NavLink to="/admin/upload-artist">Add Artist</NavLink>
        <NavLink to="/admin/songs">Manage Songs</NavLink>
        <NavLink to="/admin/artists">Manage Artists</NavLink>
        <NavLink to="/admin/analytics">Analytics</NavLink>
    </aside>
);

export default ActivitySidebar;