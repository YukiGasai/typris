import React from "react";
import styled from 'styled-components';
import { gameState, highScores, tetrisLevel, tetrisRows, tetrisScore, typedWords, typingAccuracy, typingLevel, wordsPerMinute } from "../../helper/gameSignals";
import { GameState } from "../../helper/constants";
import { StatDisplay } from "../../helper/settingsObjects";

const Display = ({ stat, t }) => {

    const getCurrentValue = () => {
        switch(stat) {
            case StatDisplay["Tetris Score"]:
                return tetrisScore.value;
            case StatDisplay["Tetris Rows"]:
                return tetrisRows.value;
            case StatDisplay["Tetris Level"]:
                return Math.floor(tetrisLevel.value / 10);
            case StatDisplay["Typing Level"]:
                return typingLevel.value;
            case StatDisplay["Typing Error Rate"]:
                return typingAccuracy.value;
            case StatDisplay["Typing Speed"]:
                return wordsPerMinute.value;
            case StatDisplay["Typed Words"]:
                return typedWords.value;
            default:
                return 0;
        }
    }

    const getHighScore = () => {
        switch(stat) {
            case StatDisplay["Tetris Score"]:
                return highScores.value.tetrisScore;
            case StatDisplay["Tetris Rows"]:
                return highScores.value.tetrisRows;
            case StatDisplay["Tetris Level"]:
                return Math.floor(highScores.value?.tetrisRows / 10);
            case StatDisplay["Typing Level"]:
                return Math.floor(highScores.value?.typedWords / 10);
            case StatDisplay["Typing Error Rate"]:
                return null;
            case StatDisplay["Typing Speed"]:
                return highScores.value.wordsPerMinute;
            case StatDisplay["Typed Words"]:
                return highScores.value.typedWords;
            default:
                return 0;
        }
    }

    function getText() {
        const currentValue = getCurrentValue();
        const highScoreValue = getHighScore();
        if(gameState.value === GameState.Menu) {
            if (highScoreValue || highScoreValue === 0) {
                return highScoreValue;
            }
        } else {
            if(highScoreValue || highScoreValue === 0) {
                return currentValue + " / " + highScoreValue
            }
            return currentValue;
        }
    }


    return (
    <StyledDisplay>
        <span>{t(stat)}</span>
        <span>{getText()}</span>
    </StyledDisplay>
)}

const StyledDisplay = styled.div`

display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
border: 3px solid ${props => props.theme.colors.primary};
min-height: 30px;
border-radius: 20px;
justify-content: center;

span {
    text-align: center;
    box-sizing: border-box;
    font-size: 0.8rem;
    font-family: ${props => props.theme.fonts.secondary};
}
`;

export default Display;