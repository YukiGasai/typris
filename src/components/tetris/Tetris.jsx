import React, { useEffect } from "react";
import Stage from "./Stage";
import styled from 'styled-components';

import { useInterval } from "../../hooks/tetris/useInterval";
import useSound from 'use-sound'

import { checkCollision } from "../../helper/tetris/gameHelpers"
import { playerHasControl, dropTime, errorRowCount, cursorPosition, typingText, tetrisLevel, tetrisRows, tetrisScore, gameState, tetrisInput, typingLevel, wordCount, settings, showRowClearAnimation } from '../../helper/gameSignals';
import { getRandomWords } from "../../helper/typing/gameHelper";
import { GameState } from "../../helper/constants";
import { signal } from "@preact/signals-react";
import { AutoSwitch, Confetti, SoundEffect, SoundVolume, TetrisControl } from "../../helper/settingsObjects";
import rowClearSound1 from "../../assets/sounds/clear1.wav";
import rowClearSound2 from "../../assets/sounds/clear2.wav";
import rowClearSound3 from "../../assets/sounds/clear3.wav";
import rowClearSound4 from "../../assets/sounds/clear4.wav";
import errorRowSound  from "../../assets/sounds/errorRow.wav";
import moveSound from "../../assets/sounds/move.wav";
import dropSound from "../../assets/sounds/drop.wav";

export const droppingPiece = signal(false);
const Tetris = ({rowsCleared, player, stage, updatePlayerPos, playerRotate, endGame}) => {

    const [playRowClearSound1] = useSound(rowClearSound1, {
        volume: settings.value[SoundVolume._Key]
    })
    const [playRowClearSound2] = useSound(rowClearSound2, {
        volume: settings.value[SoundVolume._Key]
    })
    const [playRowClearSound3] = useSound(rowClearSound3, {
        volume: settings.value[SoundVolume._Key]
    })
    const [playRowClearSound4] = useSound(rowClearSound4, {
        volume: settings.value[SoundVolume._Key]
    })
    const [playMoveSound] = useSound(moveSound, {
        volume: settings.value[SoundVolume._Key]
    })
    const [playDropSound] = useSound(dropSound, {
        volume: settings.value[SoundVolume._Key]
    })
    const [playErrorRowSound] = useSound(errorRowSound, {
        volume: settings.value[SoundVolume._Key]
    })


    const playRowClearSound = (amount) => {
        switch(amount) {
            case 1:
                playRowClearSound1();
                break;
            case 2:
                playRowClearSound2();
                break;
            case 3:
                playRowClearSound3();
                break;
            case 4:
                playRowClearSound4();
                break;
            default:
                playRowClearSound1();
                break;
        }
    }


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
            if(settings.value[SoundEffect._Key].includes(SoundEffect.Move)) {
                playMoveSound();
            }
        }
    }

    const drop = async () => {
        if(!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            if (cursorPosition.value !== typingText.value.length) {
                errorRowCount.value = errorRowCount.value + 1;
                if(settings.value[SoundEffect._Key].includes(SoundEffect['Error Row'])) {
                    playErrorRowSound();
                }
            }else {
                if(settings.value[SoundEffect._Key].includes(SoundEffect.Drop)) {
                    playDropSound();
                }
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


    useEffect(() => {
        if(rowsCleared <= 0) {
            return;
        }
        if(settings.value[SoundEffect._Key].includes(SoundEffect["Row Clear"])) {
            playRowClearSound(rowsCleared);
        }
        if(settings.value[Confetti._Key].includes(Confetti["Row Clear"])) {
            showRowClearAnimation.value = true;
            setTimeout(() => {
                showRowClearAnimation.value = false;
            }, 4000);
        } 
    }, [rowsCleared])

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
        outline: 3px ridge ${props => props.theme.colors.highlight};
    }

`

export default Tetris;