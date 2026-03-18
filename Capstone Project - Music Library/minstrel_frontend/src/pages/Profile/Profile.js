import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        document.body.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className="panel">
            <h2>Profile</h2>
            <p>Username: {user?.username}</p>
            <p>Email: {user?.email}</p>

            <label>Theme</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
            </select>

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

export default Profile;