import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const AdminLogin = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("admin@minstrel.com");
    const [password, setPassword] = useState("admin123");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await api.post("/auth/login", { email, password });

            if (!res.data?.user || res.data.user.role !== "admin") {
                setError("Access denied: admin only");
                setLoading(false);
                return;
            }

            localStorage.setItem("admin", "true");
            login(res.data);
            navigate("/admin");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid admin credentials");
        }

        setLoading(false);
    };

    return (
        <div className="auth-page">
            <div className="auth-card admin-card">
                <h2>Admin Login</h2>
                {error && <p className="auth-error">{error}</p>}

                <form className="auth-form" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Admin Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="primary-btn admin-btn" type="submit">
                        {loading ? "Logging in..." : "Login as Admin"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;