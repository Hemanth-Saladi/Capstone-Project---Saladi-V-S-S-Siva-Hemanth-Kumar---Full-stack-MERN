import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="topbar admin-topbar">
      <div className="brand" onClick={() => navigate("/admin")}>
        Minstrel Admin
      </div>

      <div className="topbar-actions">
        <button onClick={() => navigate("/admin/upload-song")}>+ Create</button>
        <button onClick={() => navigate("/admin/analytics")}>Analytics</button>
        <button className="avatar-btn" onClick={() => navigate("/admin/profile")}>
          {user?.username?.[0]?.toUpperCase() || "A"}
        </button>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;