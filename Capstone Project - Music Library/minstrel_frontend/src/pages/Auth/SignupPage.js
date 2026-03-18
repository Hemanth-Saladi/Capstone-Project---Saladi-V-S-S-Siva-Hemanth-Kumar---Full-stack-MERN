import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const SignupPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const register = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post("/auth/signup", {
                username,
                email,
                password
            });

            alert("Account created successfully");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }

        setLoading(false);
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Create Account</h2>

                {error && <p className="auth-error">{error}</p>}

                <form onSubmit={register} className="auth-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="primary-btn">
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>

                <div className="auth-links">
                    <button type="button" onClick={() => navigate("/login")}>
                        Already have an account? Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;