import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            className="btn btn-outline-primary"
            onClick={toggleTheme}
        >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
    );
}