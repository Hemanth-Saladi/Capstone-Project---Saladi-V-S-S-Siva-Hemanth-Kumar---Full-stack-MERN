import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const SignupPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const register = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await api.post("/auth/signup", { username, email, password });
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Create Account</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={register} className="auth-form">
                    <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button>Create Account</button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;