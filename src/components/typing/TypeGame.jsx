import React, { useState } from 'react';
import styled from 'styled-components';
import { autoSwitch, correctLetters, cursorPosition, gameState, playerHasControl, typedWords, typingLevel, typingText, wrongLetters } from '../../helper/gameSignals';
import useSound from 'use-sound'
import { getClickSound, getErrorSound } from '../../helper/typing/soundHelper';

const TypeGame = () => {

    const [playClickSound] = useSound(getClickSound())
    const [playErrorSound] = useSound(getErrorSound())

    const [errorAnimation, setErrorAnimation] = useState(false)
  
    const triggerErrorAnimation = () => {
        setErrorAnimation(prevState => {
            return !prevState
        })
    }

    const write = (e) => {

        if(autoSwitch.value) {
            e.preventDefault();
        }

        if(gameState.value !== "playing") {
            return;
        }
        if(e.key === "Tab") {
            document.getElementById("tetrisGameContainer")?.focus();
        }
        if(typingText.value.length === 0 || cursorPosition.value >= typingText.value.length) { 
            return
        }

        const currentLetter = typingText.value[cursorPosition.value];
        if(e.key === currentLetter) {
            correctLetters.value += 1
            cursorPosition.value += 1;
            playClickSound();
            if(cursorPosition.value === typingText.value.length) {
                if(autoSwitch.value) {
                    document.getElementById("tetrisGameContainer")?.focus();
                    playerHasControl.value = true;
                }
                typedWords.value += 1;
                if(typedWords.value % 10 === 0) {
                    typingLevel.value += 1;
                }
            }
          
        } else {
            wrongLetters.value += 1
            triggerErrorAnimation();
            playErrorSound();
        }
     
    }

    return (
        <StyledTypingWrapper 
            onAnimationEnd={triggerErrorAnimation}
            className={errorAnimation ? "errorAnimation" : ""} 
            id="typeGameContainer" 
            role="button" 
            tabIndex="1" 
            onKeyPressCapture={(e) => write(e)}
        >
            <div className="text">
            {typingText.value?.split("").map((letter, i) => {
                let color = cursorPosition.value <= i ? 'Black' :  'Green';
                return (
                    <span key={Math.random()*1000} className={`letter${color}`}>{letter}</span>
                )
            })}
            </div>
        </StyledTypingWrapper>
    );
}

const StyledTypingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    white-space: pre;
    border-radius: 10px;
    border: 1px solid black;    

    .letterRed {
        color: red;
    }
    .letterGreen {
        color: #aaffaa;
    }
    .letterBlack {
        color: black;
    }
    .text {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 80%;
        flex-wrap: wrap;
    }

    &:focus {
        outline: 3px ridge rgba(170, 50, 220, .6);
    }
`


export default TypeGame;