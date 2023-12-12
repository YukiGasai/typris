import { createContext, useState } from 'react';
import { getRandomWords } from '../helper/typing/gameHelper';

export const TextContext = createContext();

export const TextProvider = ({ children }) => {
    const [text, setText] = useState(getRandomWords(1))
    const [position, setPosition] = useState(0);

    return (
        <TextContext.Provider value={[text, setText, position, setPosition]}>
            {children}
        </TextContext.Provider>
    );
}