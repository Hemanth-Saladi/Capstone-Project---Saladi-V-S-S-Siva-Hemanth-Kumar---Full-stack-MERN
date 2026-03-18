import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState("");

  const submit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="topbar">
      <div className="brand" onClick={() => navigate("/home")}>Minstrel</div>

      <form className="searchbar" onSubmit={submit}>
        <input
          placeholder="Search songs, artists, albums"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <button className="avatar-btn" onClick={() => navigate("/profile")}>
        {user?.username?.[0]?.toUpperCase() || "U"}
      </button>
    </header>
  );
};

export default Navbar;