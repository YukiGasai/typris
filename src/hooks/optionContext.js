import { createContext, useState } from 'react';

export const OptionContext = createContext();

export const OptionProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [gameMode, setGameMode] = useState(0);
    const [language, setLanguage] = useState("german_1k");

    return (
        <OptionContext.Provider value={{
            darkMode, setDarkMode,
            gameMode, setGameMode,
            language, setLanguage,
        }}>
            {children}
        </OptionContext.Provider>
    );
}