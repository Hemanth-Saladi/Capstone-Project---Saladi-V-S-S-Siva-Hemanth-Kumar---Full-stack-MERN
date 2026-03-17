import { useNavigate } from "react-router-dom";

const StartPage = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Minstrel</h1>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/signup")}>Sign Up</button>
                <button onClick={() => navigate("/admin-login")}>Admin Login</button>
            </div>
        </div>
    );
};

export default StartPage;