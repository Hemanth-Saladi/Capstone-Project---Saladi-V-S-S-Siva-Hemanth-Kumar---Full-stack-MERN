import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await api.post("/auth/login", { email, password });
            login(res.data);
            if (res.data?.user?.role === "admin") navigate("/admin");
            else navigate("/home");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        }

        setLoading(false);
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}

                <form onSubmit={handleLogin} className="auth-form">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button>{loading ? "Logging in..." : "Login"}</button>
                </form>

                <div className="auth-links">
                    <button onClick={() => navigate("/signup")}>Create account</button>
                    <button onClick={() => navigate("/admin-login")}>Admin login</button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;