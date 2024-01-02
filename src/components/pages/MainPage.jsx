import Tetris, { droppingPiece } from '../tetris/Tetris';
import styled from 'styled-components';
import TypeGame from '../typing/TypeGame'
import { blurBackground, correctLetters, cursorPosition, errorRowCount, gameState, highScores, playerHasControl, quoteAuthor, settings, tetrisLevel, tetrisRows, tetrisScore, typedWords, typingLevel, typingText, wordCount, wordsPerMinuteScores, wrongLetters } from '../../helper/gameSignals';
import GameOverScreen from '../GameOverScreen';
import GameButton from '../tetris/GameButton';
import { usePlayer } from '../../hooks/tetris/usePlayer';
import { useStage } from '../../hooks/tetris/useStage';
import { getRandomWords } from '../../helper/typing/gameHelper';
import { createStage } from '../../helper/tetris/gameHelpers';
import InputDisplay from '../tetris/InputDisplay';
import { AlignGame, Difficulty, Language, SoundEffect, TextSymbols } from '../../helper/settingsObjects';
import DisplayList from '../tetris/DisplayList';
import React from 'react';
import BlurBackground from '../BlurBackground';
import { GameState } from '../../helper/constants';
import useSound from 'use-sound'
import gameOverSoundAudio from "../../assets/sounds/bravo.wav"

const MainPage = () => {

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);

    const [gameOverSound] = useSound(gameOverSoundAudio, {
        volume:  1 * 0.005
    })

    const startGame = async () => {
        // Reset everything
        switch (settings.value[Difficulty._Key]) {
            case Difficulty.Easy:
                tetrisLevel.value = 0;
                typingLevel.value = 0;
                break;
            case Difficulty.Medium:
                tetrisLevel.value = 3;
                typingLevel.value = 3;
                break;
            case Difficulty.Hard:
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
        cursorPosition.value = 0;
        typedWords.value = 0;
        droppingPiece.value = false;
        document.getElementById("typeGameContainer")?.focus();
        wordsPerMinuteScores.value = [];
        typingText.value = await getRandomWords(wordCount.value);
    }

    const endGame = () => {
        if(settings.value[SoundEffect._Key].includes(SoundEffect['Game End'])) {
            gameOverSound();
        }
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
            [Language._Key]: settings.value[Language._Key],
            [TextSymbols._Key]: settings.value[TextSymbols._Key],
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
            <span className='quoteAuthor'>
                {settings.value[Language._Key] === Language['English Quotes'] ? quoteAuthor.value : ""}
            </span>
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
  switch (settings.value[AlignGame._Key]) {
    case AlignGame.Left:
        return `align-self: flex-start;`;
    case AlignGame.Center:
        return `align-self: center;`;
    case AlignGame.Right:
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

    .quoteAuthor {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        font-size: 1em;
        font-family: monospace;
        white-space: pre;
    }

    @media (max-width: 700px) { 
        grid-template-columns: repeat(1, auto);
    }

`

export default React.memo(MainPage);