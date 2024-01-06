import styled from 'styled-components';
import { typingAccuracy, highScores, tetrisLevel, tetrisRows, tetrisScore, typedWords, typingLevel, wordsPerMinute, settings } from '../../helper/gameSignals';
import Display from './Display';
import { StatDisplay } from '../../helper/settingsObjects';

const DisplayList = () => {
    return (
        <StyledDisplayList>
            {settings.value[StatDisplay._Key].includes(StatDisplay['Typed Words'])  &&
                <Display name="Typed Words" current={typedWords.value} highScore={highScores.value?.typedWords} />}
            {settings.value[StatDisplay._Key].includes(StatDisplay['Typing Level'])  &&
                <Display name="Typing Level" current={typingLevel.value} highScore={highScores.value?.typingLevel} />}
            {settings.value[StatDisplay._Key].includes(StatDisplay['Tetris Score'])  &&
                <Display name="Tetris Score" current={tetrisScore.value} highScore={highScores.value?.tetrisScore} />}
            {settings.value[StatDisplay._Key].includes(StatDisplay['Tetris Rows'])  &&
                <Display name="Tetris Rows" current={tetrisRows.value} highScore={highScores.value?.tetrisRows} />}
            {settings.value[StatDisplay._Key].includes(StatDisplay['Tetris Level'])  &&
                <Display name="Tetris Level" current={Math.floor(tetrisLevel.value)} highScore={Math.floor(highScores.value?.tetrisRows / 10)} />}
            {settings.value[StatDisplay._Key].includes(StatDisplay['Typing Error Rate'])  &&
                <Display name="Typing Accuracy" current={typingAccuracy.value} highScore={null} />}
            {settings.value[StatDisplay._Key].includes(StatDisplay['Typing Speed'])  &&
                <Display name="Typing Speed" current={wordsPerMinute.value} highScore={highScores.value?.wordsPerMinute} />}
        </StyledDisplayList>
    )}

const StyledDisplayList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export default DisplayList;
