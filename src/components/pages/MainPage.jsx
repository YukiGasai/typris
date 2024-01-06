import Tetris, { droppingPiece } from '../tetris/Tetris';
import styled from 'styled-components';
import TypeGame from '../typing/TypeGame'
import { blurBackground, correctLetters, cursorPosition, endButtonAction, errorRowCount, gameState, getLocalStoredHighScores, highScores, playerHasControl, settings, startButtonAction, tetrisLevel, tetrisRows, tetrisScore, typedWords, typingLevel, typingText, user, wordCount, wordsPerMinute, wordsPerMinuteScores, wrongLetters } from '../../helper/gameSignals';
import GameOverScreen from '../GameOverScreen';
import GameButton from '../tetris/GameButton';
import { usePlayer } from '../../hooks/tetris/usePlayer';
import { useStage } from '../../hooks/tetris/useStage';
import { getRandomWords } from '../../helper/typing/gameHelper';
import { createStage } from '../../helper/tetris/gameHelpers';
import InputDisplay from '../tetris/InputDisplay';
import { AlignGame, Difficulty, Language, SoundEffect, SoundVolume, TextSymbols, Theme } from '../../helper/settingsObjects';
import DisplayList from '../tetris/DisplayList';
import React from 'react';
import BlurBackground from '../BlurBackground';
import { GameState } from '../../helper/constants';
import useSound from 'use-sound'
import gameOverSoundAudio from "../../assets/sounds/bravo.wav"
import { backendUrl } from '../../helper/backendUrl';
import { toast } from 'react-toastify';
import { Palette, Globe2, Gauge } from 'lucide-react';
import PaletteOpenButton from '../PaletteOpenButton';

const MainPage = () => {

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);

    const [gameOverSound] = useSound(gameOverSoundAudio, {
        volume:  settings.value[SoundVolume._Key] / 5
    })

    const startGame = () => {
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
        typedWords.value = 0;
        droppingPiece.value = false;
        document.getElementById("typeGameContainer")?.focus();
        wordsPerMinuteScores.value = [];
        cursorPosition.value = 0;
        typingText.value = getRandomWords(wordCount.value);
    }

    const endGame = async () => {
        if(settings.value[SoundEffect._Key].includes(SoundEffect['Game End'])) {
            gameOverSound();
        }

        gameState.value = GameState.Over;
        droppingPiece.value = true;
        // The game result
        const result = {
            tetrisScore: tetrisScore.value,
            tetrisRows: tetrisRows.value,
            errorRowCount: errorRowCount.value,
            correctLetterCount: correctLetters.value,
            wrongLetterCount: wrongLetters.value,
            typedWords: typedWords.value,
            wordsPerMinute: parseFloat(wordsPerMinute.value),
            setting: {
                [Difficulty._Key]: settings.value[Difficulty._Key],
                [Language._Key]: settings.value[Language._Key],
                [TextSymbols._Key]: settings.value[TextSymbols._Key],
            },
            date: new Date()
        }

        if(result.tetrisScore <= 0) {
            return;
        }
        if(user.value) {
            try {
                await fetch(`${backendUrl()}/api/result`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(result)
                })
            }catch(e) {
                toast.error("Could not upload result");
                console.log(e);
            }
        } else {
            const attemptsString = window.localStorage.getItem("attempts") ?? "[]";
            const attempts = JSON.parse(attemptsString);
            attempts.push(result);
            window.localStorage.setItem("attempts", JSON.stringify(attempts));
            highScores.value = getLocalStoredHighScores();       
        }
    }

    return (  
        <>
        <StyledMainPage>
            <TypeGame endGame={endGame}/>
            <div className='modePanel'>
                <PaletteOpenButton icon={<Globe2 />} menu={Language} />
                <span> - </span>
                <PaletteOpenButton icon={<Gauge />} menu={Difficulty} />
            </div>
            <Tetris 
                startGame={startGame}
                endGame={endGame}
                rowsCleared={rowsCleared}
                player={player}
                stage={stage}
                updatePlayerPos={updatePlayerPos}
                playerRotate={playerRotate}
            />
            <div className='rightSideList'>
                {gameState.value !== GameState.Menu && gameState.value !== GameState.Over ?
                    <GameButton id="startGameButton" callback={() => endButtonAction.value === "end" ? endGame() : startGame()} text="End Game"/> :
                    <GameButton id="startGameButton" callback={startGame} text="Start Game" />
                }
                {gameState.value !== GameState.Menu && (<>
                {gameState.value === GameState.Paused ?
                    <GameButton callback={() => gameState.value = GameState.Playing} text="Resume" /> :
                    <GameButton callback={() => gameState.value = GameState.Paused} text="Pause" />
                }</>)}
                <DisplayList />
                <InputDisplay />
                <PaletteOpenButton icon={<Palette />} menu={Theme} className='bottomLeft'/>
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

    .modePanel {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1em;
        font-family: monospace;
        white-space: pre;
    }

    @media (max-width: ${props => props.theme.screens.mobile}) { 
        grid-template-columns: repeat(1, auto);
    }

    .rightSideList {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`

export default React.memo(MainPage);