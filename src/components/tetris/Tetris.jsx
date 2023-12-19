import React, { useEffect } from "react";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import styled from 'styled-components';

import { useInterval } from "../../hooks/tetris/useInterval";
import { usePlayer } from "../../hooks/tetris/usePlayer";
import { useStage } from "../../hooks/tetris/useStage";

import { checkCollision, createStage } from "../../helper/tetris/gameHelpers"
import { playerHasControl, dropTime, errorRowCount, gameOver, cursorPosition, typingText, tetrisLevel, tetrisRows, tetrisScore, correctLetters, wrongLetters, language } from '../../helper/gameSignals';
import { getRandomWords } from "../../helper/typing/gameHelper";
import TypeGame from "../typing/TypeGame";

const START_DROP_TIME = 300;

const Tetris = () => {

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);

    useEffect(() => {

        if(rowsCleared > 0) {
            console.log(rowsCleared)
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

    const startGame = () => {
        // Reset everything
        playerHasControl.value = true;
        setStage(createStage());
        resetPlayer();
        dropTime.value = START_DROP_TIME;
        gameOver.value = false;
        tetrisRows.value = 0;
        errorRowCount.value = 0;
        correctLetters.value = 0;
        wrongLetters.value = 0;
        tetrisScore.value = 0;
        tetrisLevel.value = 1;
        typingText.value = getRandomWords(1);
        cursorPosition.value = 0;

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
                    language: language.value,
                    date: new Date()
                });
                window.localStorage.setItem("attempts", JSON.stringify(attempts));

                gameOver.value = true;
                dropTime.value = null;
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const keyUp = ({ keyCode }) => {
        if(!gameOver.value) {
            if(keyCode === 74) {
                dropTime.value = START_DROP_TIME / (tetrisLevel.value + 1) + 200;
            }
        }
    }

    const dropPlayer = () => {
        dropTime.value = null;
        drop();
    }

    const move = ({ keyCode }) => {
        // 65 is the A key
        if(keyCode === 65) {
            playerHasControl.value = !playerHasControl.value;
        }
        // reset game (r) 82
        if (keyCode === 82) {
            startGame();
        }
        if(!gameOver.value && playerHasControl.value) {
            // left (h) 72
            if(keyCode === 72) {
                movePlayer(-1);
            // right (l) keycode 76
            } else if(keyCode === 76) {
                movePlayer(1);
            // down (j) keycode 74
            } else if(keyCode === 74) {
                dropPlayer();
            // rotate (k) keycode 75
            } else if(keyCode === 75) {
                playerRotate(stage, 1);
            }
        }
    }

    useInterval(() => {
        drop();
    }, dropTime.value);

    return (
        <StyledTetrisWrapper role="button" tabIndex="2" onKeyDown={(e) => move(e)} onKeyUp={(e) => keyUp(e)}>
                <Stage stage={stage}/>
                {/* <aside>
                    {gameOver.value ? 
                        <Display gameOver={gameOver.value} text="Game Over" />
                     : (      
                        <div>
                            <Display text={tetrisScore.value} />
                            <Display text={tetrisRows.value} />
                            <Display text={tetrisLevel.value} />
                        </div>
                    )}
                </aside> */}
                <StartButton callback={startGame}/>

        </StyledTetrisWrapper>
    )
}




const StyledTetrisWrapper = styled.div`
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