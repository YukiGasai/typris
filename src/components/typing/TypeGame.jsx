import React from 'react';
import { StyledTypingWrapper } from './styles/StyledTypingWrapper';
import { TextContext } from '../../hooks/textContext';

const TypeGame = () => {

    const [correctLetters, setCorrectLetters] = React.useState(0);
    const [wrongLetters, setWrongLetters] = React.useState(0);
    
    const [text, setText, position, setPosition] = React.useContext(TextContext);

    const write = (e) => {
        
        e.preventDefault();
        if(e.key === "Tab") {
            document.getElementById("tetrisGameContainer")?.focus();
        }
        if(text.length === 0 || position >= text.length) { 
            return
        }

        const currentLetter = text[position];
        if(e.key === currentLetter) {
            setCorrectLetters(currentLetter => currentLetter + 1)
            setPosition(position => position + 1);
        } else {
            setWrongLetters(wrongLetters => wrongLetters + 1)
        }
     
    }

    return (
        <StyledTypingWrapper id="typeGameContainer" role="button" tabIndex="1" onKeyPressCapture={(e) => write(e)}>
            <div className="stats">
                <div className="correct">
                    <span>Correct: </span>
                    <span>{correctLetters}</span>
                </div>
                <div className="wrong">
                    <span>Wrong: </span>
                    <span>{wrongLetters}</span>
                </div>
            </div>
            <div className="text">
            {text.split("").map((letter, i) => {
                let color =  position <= i ? 'Black' :  'Green';
                return (
                    <span key={Math.random()*1000} className={`letter${color}`}>{letter}</span>
                )
            })}
            </div>
        </StyledTypingWrapper>
    );
}

export default TypeGame;