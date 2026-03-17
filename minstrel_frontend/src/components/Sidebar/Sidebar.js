import { Link } from "react-router-dom";

const Sidebar = () => (
    <aside className="sidebar">
        <h3>Library</h3>
        <Link to="/home">Home</Link>
        <Link to="/browse">Browse</Link>
        <Link to="/liked">Liked Songs</Link>
    </aside>
);

export default Sidebar;