import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        document.body.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className="panel">
            <h2>Admin Profile</h2>

            <div className="profile-section">
                <p><strong>Username:</strong> {user?.username || "Admin"}</p>
                <p><strong>Email:</strong> {user?.email || "admin@minstrel.com"}</p>
                <p><strong>Role:</strong> {user?.role || "admin"}</p>
            </div>

            <div className="profile-section">
                <label>Theme</label>
                <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                </select>
            </div>

            <button
                onClick={() => {
                    logout();
                    navigate("/login");
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default AdminProfile;