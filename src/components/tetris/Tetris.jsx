import React, { useState } from "react";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import { StyledTetris } from "./styles/StyledTetris";
import { StyledTetrisWrapper } from "./styles/StyledTetrisWrapper";

import { useInterval } from "../../hooks/tetris/useInterval";
import { usePlayer } from "../../hooks/tetris/usePlayer";
import { useStage } from "../../hooks/tetris/useStage";
import { useGameStatus } from "../../hooks/tetris/useGameStatus";

import { checkCollision, createStage } from "../../helper/tetris/gameHelpers"
import { TextContext } from "../../hooks/textContext";

const START_DROP_TIME = 300;

const Tetris = () => {

    const [text, setText, position, setPosition] = React.useContext(TextContext);

    const [playerHasControl, setPlayerHasControl] = useState(true);
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer, setText, setPosition);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    const movePlayer = dir => {
        if(!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    }

    const startGame = () => {
        // Reset everything
        setPlayerHasControl(true);
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
        setDropTime(START_DROP_TIME)
        setScore(0);
        setLevel(0);
        setRows(0);
    }
    
    const drop = () => {
        // Increase level when player has cleared 10 rows
        if(rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            // Also increase speed
            setDropTime(START_DROP_TIME / (level + 1) + 200);
        }

        if(!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
       
            if(player.pos.y < 1 || position < text.length) {
                console.log("GAME OVER");
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const keyUp = ({ keyCode }) => {
        if(!gameOver) {
            if(keyCode === 74) {
                setDropTime(START_DROP_TIME / (level + 1) + 200);
            }
        }
    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    const move = ({ keyCode }) => {
        console.log(keyCode);
        // 65 is the A key
        if(keyCode === 65) {
            setPlayerHasControl(prev => !prev);
        }
        // reset game (r) 82
        if (keyCode === 82) {
            startGame();
        }
        if(!gameOver && playerHasControl) {
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
    }, dropTime);

    return (
        <StyledTetrisWrapper role="button" tabIndex="2" onKeyDown={(e) => move(e)} onKeyUp={(e) => keyUp(e)}>
            <StyledTetris playerHasControl={playerHasControl}>
                <Stage stage={stage}/>
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over" />
                    ) : (      
                        <div>
                            <Display text={score} />
                            <Display text={rows} />
                            <Display text={level} />
                        </div>
                    )}
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;