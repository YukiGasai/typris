import styled from 'styled-components';
import { correctLetters, displayList, highScores, tetrisLevel, tetrisRows, tetrisScore, typedWords, wrongLetters } from '../../helper/gameSignals';
import Display from './Display';

function getCorrectRatio() {
    if(correctLetters.value === 0 || wrongLetters.value === 0) {
        return 0;
    }
   return (correctLetters.value / (correctLetters.value + wrongLetters.value) * 100).toFixed(2)
}

const DisplayList = () => {
    return (
        <StyledDisplayList>
            {displayList.value.includes("typedWords")  &&
                <Display name="Typed Words" current={typedWords.value} highScore={highScores.value?.typedWords} />}
            {displayList.value.includes("tetrisScore")  &&
                <Display name="Tetris Score" current={tetrisScore.value} highScore={highScores.value?.tetrisScore} />}
            {displayList.value.includes("tetrisRows")  &&
                <Display name="Typed Rows" current={tetrisRows.value} highScore={highScores.value?.tetrisRows} />}
            {displayList.value.includes("tetrisLevel")  &&
                <Display name="Tetris Level" current={tetrisLevel.value} highScore={highScores.value?.tetrisLevel} />}
            {displayList.value.includes("typingErrorRate")  &&
                <Display name="Typo Ratio" current={getCorrectRatio()} highScore={null} />}
        </StyledDisplayList>
    )}

const StyledDisplayList = styled.div`

`

export default DisplayList;
