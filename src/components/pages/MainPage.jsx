import Tetris, { droppingPiece } from '../tetris/Tetris';
import styled from 'styled-components';
import TypeGame from '../typing/TypeGame'
import { alignGame, blurBackground, correctLetters, cursorPosition, dropTime, errorRowCount, gameMode, gameState, highScores, language, playerHasControl, tetrisLevel, tetrisRows, tetrisScore, typedWords, typingLevel, typingText, wordsPerMinute, wordsPerMinuteScores, wrongLetters } from '../../helper/gameSignals';
import GameOverScreen from '../GameOverScreen';
import GameButton from '../tetris/GameButton';
import { usePlayer } from '../../hooks/tetris/usePlayer';
import { useStage } from '../../hooks/tetris/useStage';
import { getRandomWords } from '../../helper/typing/gameHelper';
import { createStage } from '../../helper/tetris/gameHelpers';
import InputDisplay from '../tetris/InputDisplay';
import { GameState } from '../../helper/constants';
import DisplayList from '../tetris/DisplayList';
import React from 'react';
import BlurBackground from '../BlurBackground';

const MainPage = () => {

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);

    const startGame = () => {
        // Reset everything
        switch (gameMode.value) {
            case "0":
                tetrisLevel.value = 0;
                typingLevel.value = 0;
                break;
            case "1":
                tetrisLevel.value = 3;
                typingLevel.value = 3;
                break;
            case "2":
                tetrisLevel.value = 10;
                typingLevel.value = 10;
                break;
            default:
                tetrisLevel.value = 0;
                typingLevel.value = 1;
                break;
        }

        playerHasControl.value = true;
        setStage(createStage());
        resetPlayer();
        gameState.value = GameState.Playing;
        tetrisRows.value = 0;
        errorRowCount.value = 0;
        correctLetters.value = 0;
        wrongLetters.value = 0;
        tetrisScore.value = 0;
        typingText.value = getRandomWords(1);
        cursorPosition.value = 0;
        typedWords.value = 0;
        droppingPiece.value = false;
        document.getElementById("typeGameContainer")?.focus();
        wordsPerMinuteScores.value = [];
    }

    const endGame = () => {
        console.log("GAME OVER");

        const attemptsString = window.localStorage.getItem("attempts") ?? "[]";
        const attempts = JSON.parse(attemptsString);
        attempts.push({
            score: tetrisScore.value,
            rows: tetrisRows.value,
            level: Math.floor(tetrisLevel.value),
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

        if(Math.floor(tetrisLevel.value) > (highScores.value?.tetrisLevel ?? 0)) {
            highScores.value = {
                ...highScores.value,
                tetrisLevel: Math.floor(tetrisLevel.value),
            }
        }
        if(typedWords.value > (highScores.value?.typedWords ?? 0)) {
            highScores.value = {
                ...highScores.value,
                typedWords: typedWords.value,
            }
        }

        if(typingLevel.value > (highScores.value?.typingLevel ?? 0)) {
            highScores.value = {
                ...highScores.value,
                typingLevel: typingLevel.value,
            }
        }

        gameState.value = GameState.Over;
        droppingPiece.value = true;
    }

    return (  
        <>
        <StyledMainPage>
            <TypeGame
                endGame={endGame}
            />
            <span />
            <Tetris 
                startGame={startGame}
                endGame={endGame}
                rowsCleared={rowsCleared}
                player={player}
                stage={stage}
                updatePlayerPos={updatePlayerPos}
                playerRotate={playerRotate}
            />
            <div>
                {gameState.value !== GameState.Menu && gameState.value !== GameState.Over ?
                    <GameButton id="endGameButton" callback={endGame} text="End Game" /> :
                    <GameButton id="startGameButton" callback={startGame} text="Start Game" />
                }
                {gameState.value !== GameState.Menu && (<>
                {gameState.value === GameState.Paused ?
                    <GameButton callback={() => gameState.value = GameState.Playing} text="Resume" /> :
                    <GameButton callback={() => gameState.value = GameState.Paused} text="Pause" />
                }</>)}
                <DisplayList />
                <InputDisplay />
                {gameState.value === GameState.Over && <GameOverScreen startGame={startGame}/>}
            </div>
        </StyledMainPage>
        {blurBackground.value && <BlurBackground callback={() => gameState.value = GameState.Menu}/>}
        </>
    )
}

function getAlignMent() {
  switch (alignGame.value) {
    case 'left':
        return `align-self: flex-start;`;
    case 'center':
        return `align-self: center;`;
    case 'right':
        return `align-self: flex-end;`;
    default:
        return `align-self: flex-start;`;
  }
}

const StyledMainPage = styled.div`

    margin: 0 10%;
    width: fit-content;
    position: relative;
    
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, auto);
    grid-column-gap: 10px;
    grid-row-gap: 10px;    

    ${getAlignMent}
`

export default React.memo(MainPage);