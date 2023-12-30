import React, { useEffect, useRef, useState } from 'react';
import { keyframes } from 'styled-components'
import styled from 'styled-components';
import { autoSwitch, correctLetters, cursorPosition, gameState, playerHasControl, typedWords, typingDisplayStyle, typingLevel, typingText, wrongLetters } from '../../helper/gameSignals';
import useSound from 'use-sound'
import { getClickSound, getErrorSound } from '../../helper/typing/soundHelper';
import { GameState } from '../../helper/constants';

const TypeGame = ({endGame}) => {

    const [playClickSound] = useSound(getClickSound())
    const [playErrorSound] = useSound(getErrorSound())

    const [errorResetCount, setErrorResetCount] = useState(0);

    const [errorAnimation, setErrorAnimation] = useState(false)
  
    const ref = useRef(null);

    const triggerErrorAnimation = () => {
        setErrorAnimation(prevState => {
            return !prevState
        })
    }

    const write = (e) => {
        e.preventDefault();
        // Ignore if game is not running
        if(gameState.value !== GameState.Playing) {
            return;
        }
        // Ignore hotkeys
        if (e.repeat || e.altKey || e.ctrlKey) { 
            return 
        }
        // Ignore special keys like Backspace
        if(e.key.length > 1 && e.key !== "Tab" && e.key !== "Space") {
            return;
        }
        // Ignore Tab if autoSwitch is enabled
        if(e.key === "Tab" && autoSwitch.value === true) {
            return;
        }
        // Focus to Tetris if Tab is pressed
        if(e.key === "Tab") {
            document.getElementById("tetrisGameContainer")?.focus();
        }
        // Don't write if game is not running or word is finished
        if(typingText.value.length === 0 || cursorPosition.value >= typingText.value.length) { 
            return
        }

        const currentLetter = typingText.value[cursorPosition.value];
        if(e.key === currentLetter) {
            correctLetters.value += 1
            cursorPosition.value += 1;
            setErrorResetCount(0);
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
            setErrorResetCount(prevState => prevState + 1);
            if(errorResetCount > 10) {
                setErrorResetCount(0);
                endGame();
            }
        }
     
    }
    function getPositionOfLetter(index) {
        const textContainerWidth = ref.current?.offsetWidth ?? 0;
        const center = textContainerWidth / 2;
        const letterWidth = 17;

        const left = center
        return left + (index * letterWidth) - cursorPosition.value * letterWidth;
    }

    function getTextClass() {
        let className =  errorAnimation ? "errorAnimation" : ""
        switch(typingDisplayStyle.value) {
            case "fancy":
                return `${className} fancyText`;
            default:
                return `${className} `;
        }
        
    }

    function getletterCalss(color) {
        switch(typingDisplayStyle.value) {
            case "fancy":
                return `fancyLetter letter${color}`;
            default:
                return `letter${color}`;
        }
    
    }

    useEffect(() => {
        console.log('width', ref.current ? ref.current.offsetWidth : 0);
      }, [ref.current]);

    return (
        <StyledTypingWrapper 
            onAnimationEnd={triggerErrorAnimation}
            className={getTextClass()} 
            ref={ref}
            id="typeGameContainer" 
            role="button" 
            tabIndex="1" 
            onKeyDown={(e) => write(e)}
        >
            {typingText.value?.split("").map((letter, i) => {
                let color = cursorPosition.value <= i ? 'Black' :  'Green';
                return (
                    <span key={Math.random()*1000} className={getletterCalss(color)}
                    style={{
                        left: `${getPositionOfLetter(i)}px`,
                        backgroundColor: i === cursorPosition.value ? "rgba(170, 50, 220, .6)" : "transparent"
                    }}
                    >{letter}</span>
                )
            })}
        </StyledTypingWrapper>
    );
}

const horizontalShaking = keyframes`
    0% { transform: translateX(0) }
    25% { transform: translateX(5px) }
    50% { transform: translateX(-5px) }
    75% { transform: translateX(5px) }
    100% { transform: translateX(0) }
`

const StyledTypingWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    white-space: pre;
    height: 40px;
    border-radius: 10px;
    border: 1px solid black;    
    flex-wrap: wrap;
    overflow: hidden;
    position: relative;
    font-family: monospace;
    font-size: 25px;

    .letterRed {
        color: red;
    }
    .letterGreen {
        color: rgb(140, 140, 140);
        font-weight: bold;

    }
    .letterBlack {
        color: black;
        font-weight: bold;

    }

    &.errorAnimation {
        animation-name: ${horizontalShaking};
        animation-duration: 0.2s;
        animation-iteration-count: 2;
        border-color: red !important;
        outline: 2px solid red !important;
    }

    .fancyText {
        height: 100%;
        overflow: hidden;
        position: relative;
        flex-wrap: no-wrap;
    }

    .fancyLetter {
        position: absolute;
        left: 0;
    }

    &:focus {
        outline: 3px ridge rgba(170, 50, 220, .6);
    }
`

export default TypeGame;