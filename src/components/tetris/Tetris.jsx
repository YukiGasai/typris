import React, { useEffect } from "react";
import Confetti from 'react-confetti'
import Stage from "./Stage";
import styled from 'styled-components';

import { useInterval } from "../../hooks/tetris/useInterval";

import { checkCollision } from "../../helper/tetris/gameHelpers"
import { playerHasControl, dropTime, errorRowCount, cursorPosition, typingText, tetrisLevel, tetrisRows, tetrisScore, correctLetters, language, gameState, autoSwitch, tetrisInput, highScores, typedWords } from '../../helper/gameSignals';
import { getRandomWords } from "../../helper/typing/gameHelper";
import { GameState } from "../../helper/constants";

const START_DROP_TIME = 300;

const Tetris = ({startGame, rowsCleared, player, stage, updatePlayerPos, playerRotate}) => {

    useEffect(() => {

        if(rowsCleared > 0) {
            tetrisRows.value = tetrisRows.value + rowsCleared;
            const points = [40, 100, 300, 1200];
            tetrisScore.value = tetrisScore.value + points[rowsCleared - 1] * (tetrisLevel.value + 1);
            tetrisLevel.value = Math.floor(tetrisRows.value / 10);
            dropTime.value = START_DROP_TIME / (tetrisLevel.value + 1) + 200;
        }

    }, [rowsCleared])

    const movePlayer = dir => {
        if(!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    }


    const drop = () => {
        if(!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            if (cursorPosition.value !== typingText.value.length) {
                errorRowCount.value = errorRowCount.value + 1;
            }else {
                typingText.value = getRandomWords(1);
                cursorPosition.value = 0;
            }
            if(autoSwitch.value) {
                document.getElementById("typeGameContainer")?.focus();
                playerHasControl.value = false;
                dropTime.value = START_DROP_TIME / (tetrisLevel.value + 1) + 200;
            }

            if(player.pos.y < 1) {
                console.log("GAME OVER");

                const attemptsString = window.localStorage.getItem("attempts") ?? "[]";
                const attempts = JSON.parse(attemptsString);
                attempts.push({
                    score: tetrisScore.value,
                    rows: tetrisRows.value,
                    level: tetrisLevel.value,
                    errorRowCount: errorRowCount.value,
                    correctLetters: correctLetters.value,
                    wrongLetters: errorRowCount.value,
                    typedWords: typedWords.value,
                    language: language.value,
                    date: new Date()
                });
                window.localStorage.setItem("attempts", JSON.stringify(attempts));

                if(tetrisScore.value > (highScores.value?.tetrisScore ?? 0)) {
                    highScores.value = {
                        ...highScores.value,
                        tetrisScore: tetrisScore.value,
                    }
                }

                if(tetrisRows.value > (highScores.value?.tetrisRows ?? 0)) {
                    highScores.value = {
                        ...highScores.value,
                        tetrisRows: tetrisRows.value,
                    }
                }

                if(tetrisLevel.value > (highScores.value?.tetrisLevel ?? 0)) {
                    highScores.value = {
                        ...highScores.value,
                        tetrisLevel: tetrisLevel.value,
                    }
                }
                if(typedWords.value > (highScores.value?.typedWords ?? 0)) {
                    highScores.value = {
                        ...highScores.value,
                        typedWords: typedWords.value,
                    }
                }

                gameState.value = GameState.Over;
                dropTime.value = null;
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const keyUp = ({ keyCode }) => {
        tetrisInput.value = "";
        if(gameState.value === GameState.Playing) {
            if(keyCode === 74) {
                dropTime.value = START_DROP_TIME / (tetrisLevel.value + 1) + 200;
            }
        }
    }

    const dropPlayer = () => {
        dropTime.value = null;
        drop();
    }

    const move = (e) => {
        const { keyCode } = e;
        if(autoSwitch.value) {
            e.preventDefault();
        }
        if(gameState.value == GameState.Playing && playerHasControl.value) {
            // left (h) 72
            if(keyCode === 72) {
                movePlayer(-1);
                tetrisInput.value = "h";
            // right (l) keycode 76
            } else if(keyCode === 76) {
                movePlayer(1);
                tetrisInput.value = "l";
            // down (j) keycode 74
            } else if(keyCode === 74) {
                dropPlayer();
                tetrisInput.value = "j";
            // rotate (k) keycode 75
            } else if(keyCode === 75) {
                playerRotate(stage, 1);
                tetrisInput.value = "k";
            }
        }
    }

    useInterval(() => {
        if(gameState.value === GameState.Playing) {
            drop();
        }
    }, dropTime.value);

    return (
        <StyledTetrisWrapper id="tetrisGameContainer" role="button" tabIndex="2" onKeyDown={(e) => move(e)} onKeyUp={(e) => keyUp(e)}>
            <Stage stage={stage}/>          
        </StyledTetrisWrapper>
    )
}

const StyledTetrisWrapper = styled.div`
    position: relative;
    width: fit-content;
    background-size: cover;
    display: flex;
    gap: 10px;
    flex-direction: row;
    &:focus > div:first-child {
        outline: 3px ridge rgba(170, 50, 220, .6);
    }
`

export default Tetris;