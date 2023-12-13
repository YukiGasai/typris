import { createContext, useContext, useEffect, useState } from 'react';
import { getRandomWords } from '../helper/typing/gameHelper';
import { OptionContext } from './optionContext';

export const TextContext = createContext();

export const TextProvider = ({ children }) => {

    const {language} = useContext(OptionContext);

    const [text, setText] = useState(getRandomWords(1, language))
    const [position, setPosition] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        setText(getRandomWords(1, language));
        setPosition(0);
        setGameOver(false);
    }, [language]);


    return (
        <TextContext.Provider value={{
            text, setText,
            position, setPosition,
            gameOver, setGameOver,
        }}>
            {children}
        </TextContext.Provider>
    );
}