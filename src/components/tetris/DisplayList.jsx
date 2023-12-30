import styled from 'styled-components';
import { typingAccuracy, displayList, highScores, tetrisLevel, tetrisRows, tetrisScore, typedWords, typingLevel } from '../../helper/gameSignals';
import Display from './Display';

const DisplayList = () => {
    return (
        <StyledDisplayList>
            {displayList.value.includes("typedWords")  &&
                <Display name="Typed Words" current={typedWords.value} highScore={highScores.value?.typedWords} />}
            {displayList.value.includes("typingLevel")  &&
                <Display name="Typing Level" current={typingLevel.value} highScore={highScores.value?.typingLevel} />}
            {displayList.value.includes("tetrisScore")  &&
                <Display name="Tetris Score" current={tetrisScore.value} highScore={highScores.value?.tetrisScore} />}
            {displayList.value.includes("tetrisRows")  &&
                <Display name="Tetris Rows" current={tetrisRows.value} highScore={highScores.value?.tetrisRows} />}
            {displayList.value.includes("tetrisLevel")  &&
                <Display name="Tetris Level" current={Math.floor(tetrisLevel.value)} highScore={highScores.value?.tetrisLevel} />}
            {displayList.value.includes("typingErrorRate")  &&
                <Display name="Typing Accuracy" current={typingAccuracy.value} highScore={null} />}
        </StyledDisplayList>
    )}

const StyledDisplayList = styled.div`

`

export default DisplayList;
