import React, { useEffect } from "react";
import Stage from "./Stage";
import styled from 'styled-components';

import { useInterval } from "../../hooks/tetris/useInterval";

import { checkCollision } from "../../helper/tetris/gameHelpers"
import { playerHasControl, dropTime, errorRowCount, cursorPosition, typingText, tetrisLevel, tetrisRows, tetrisScore, gameState, tetrisInput, typingLevel, wordCount, settings } from '../../helper/gameSignals';
import { getRandomWords } from "../../helper/typing/gameHelper";
import { GameState } from "../../helper/constants";
import { signal } from "@preact/signals-react";
import { AutoSwitch, TetrisControl } from "../../helper/settingsObjects";

export const droppingPiece = signal(false);
const Tetris = ({rowsCleared, player, stage, updatePlayerPos, playerRotate, endGame}) => {


    useEffect(() => {

        if(rowsCleared > 0) {
            tetrisRows.value = tetrisRows.value + rowsCleared;
            const points = [40, 100, 300, 1200];
            tetrisScore.value = tetrisScore.value + points[rowsCleared - 1] * (Math.floor(tetrisLevel.value) + 1);
            tetrisLevel.value += rowsCleared / 10;
        }

    }, [rowsCleared])

    const movePlayer = dir => {
        if(!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    }


    const drop = async () => {
        if(!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            if (cursorPosition.value !== typingText.value.length) {
                errorRowCount.value = errorRowCount.value + 1;
            }else {
                cursorPosition.value = 0;
                typingText.value = await getRandomWords(wordCount.value);
            }
            if(settings.value[AutoSwitch._Key]) {
                document.getElementById("typeGameContainer")?.focus();
                playerHasControl.value = false;
                droppingPiece.value = false;
                tetrisInput.value = "";
            }


            // Game Over
            if(player.pos.y < 1) {
               endGame();
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const keyUp = ({ keyCode }) => {
        tetrisInput.value = "";
        if(gameState.value === GameState.Playing) {
            if(keyCode === 74 || keyCode === 40 || keyCode === 83) {
                droppingPiece.value = false;
            }
        }
    }

    const dropPlayer = () => {
        droppingPiece.value = true;
        drop();
    }

    const move = (e) => {
        // Stop repeated inputs to move piece by holding down key
        // if (e.repeat) { 
        //     return 
        // }

        const { keyCode } = e;
        if(settings.value[AutoSwitch._Key]) {
            e.preventDefault();
        }

        if(gameState.value === GameState.Playing && playerHasControl.value) {

            //e keycode 69
            if(keyCode === 69) {
                tetrisLevel.value += 1;
            }
            //q keycode 81
            if(keyCode === 81) {
                typingLevel.value += 1;
            }

            switch(settings.value[TetrisControl._Key]) {
                case TetrisControl.HJKL: {
                    // left (h) 72
                    if(keyCode === 72) {
                        tetrisInput.value = "left";
                        movePlayer(-1);
                    // right (l) keycode 76
                    } else if(keyCode === 76) {
                        tetrisInput.value = "right";
                        movePlayer(1);
                    // down (j) keycode 74
                    } else if(keyCode === 74) {
                        tetrisInput.value = "down";
                        dropPlayer();
                    // rotate (k) keycode 75
                    } else if(keyCode === 75) {
                        tetrisInput.value = "rotate";
                        playerRotate(stage, 1);
                    }
                    break;
                }
                case TetrisControl.WASD: {
                    // left (a) keycode 65
                    if(keyCode === 65) {
                        tetrisInput.value = "left";
                        movePlayer(-1);
                    // right (d) keycode 68
                    } else if(keyCode === 68) {
                        tetrisInput.value = "right";
                        movePlayer(1);
                    // down (s) keycode 83
                    } else if(keyCode === 83) {
                        tetrisInput.value = "down";
                        dropPlayer();
                    // rotate (w) keycode 87
                    } else if(keyCode === 87) {
                        tetrisInput.value = "rotate";
                        playerRotate(stage, 1);
                    }
                    break;
                }
                case TetrisControl.Arrows: {
                    // left (left arrow) keycode 37
                    if(keyCode === 37) {
                        tetrisInput.value = "left";
                        movePlayer(-1);
                    // right (right arrow) keycode 39
                    } else if(keyCode === 39) {
                        tetrisInput.value = "right";
                        movePlayer(1);
                    // down (down arrow) keycode 40
                    } else if(keyCode === 40) {
                        tetrisInput.value = "down";
                        dropPlayer();
                    // rotate (up arrow) keycode 38
                    } else if(keyCode === 38) {
                        tetrisInput.value = "rotate";
                        playerRotate(stage, 1);
                    }
                    break;
                }
                default: return;
            }
        }
    }

    useInterval(() => {
        if(gameState.value === GameState.Playing) {
            drop();
        }
    }, droppingPiece.value? null : dropTime.value);

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