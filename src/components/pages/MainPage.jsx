import Tetris from '../tetris/Tetris';
import styled from 'styled-components';
import TypeGame from '../typing/TypeGame'
import { correctLetters, cursorPosition, dropTime, errorRowCount, gameMode, gameState, playerHasControl, tetrisLevel, tetrisRows, tetrisScore, typedWords, typingLevel, typingText, wrongLetters } from '../../helper/gameSignals';
import GameOverScreen from '../GameOverScreen';
import StartButton from '../tetris/StartButton';
import { usePlayer } from '../../hooks/tetris/usePlayer';
import { useStage } from '../../hooks/tetris/useStage';
import { getRandomWords } from '../../helper/typing/gameHelper';
import { createStage } from '../../helper/tetris/gameHelpers';
import InputDisplay from '../tetris/InputDisplay';
import { GameState } from '../../helper/constants';
import DisplayList from '../tetris/DisplayList';
import React from 'react';

const MainPage = () => {

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);

    const startGame = () => {
        // Reset everything
        switch (gameMode.value) {
            case "0":
                tetrisLevel.value = 1;
                typingLevel.value = 1;
                break;
            case "1":
                tetrisLevel.value = 3;
                typingLevel.value = 3;
                break;
            case "2":
                tetrisLevel.value = 10;
                typingLevel.value = 10;
                break;
        }
        dropTime.value = 300;

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
        document.getElementById("typeGameContainer")?.focus();
    }

    return (  
        <StyledMainPage>
            <TypeGame/>
            <span></span>
            <Tetris 
                startGame={startGame}
                rowsCleared={rowsCleared}
                player={player}
                stage={stage}
                updatePlayerPos={updatePlayerPos}
                playerRotate={playerRotate}
                />
            <div>
                <StartButton callback={startGame}/>
                <DisplayList />
                <InputDisplay />
            </div>
            {gameState.value == GameState.Over && <GameOverScreen />}
        </StyledMainPage>
    )
}


const StyledMainPage = styled.div`

    margin: 0 10%;
    width: fit-content;

    
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, auto);
    grid-column-gap: 10px;
    grid-row-gap: 10px;        
`

export default React.memo(MainPage);