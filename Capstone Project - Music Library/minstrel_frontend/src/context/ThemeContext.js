import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState("dark");

    const changeTheme = (newTheme) => {

        setTheme(newTheme);
        document.body.className = newTheme;

    };

    return (

        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>

    );

};