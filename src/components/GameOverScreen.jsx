import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { tetrisLevel, tetrisRows, tetrisScore, typedWords, typingAccuracy } from '../helper/gameSignals';

const GameOverScreen = () => {

    return (
    <StyledGameOverScreen>
        <div className='title'>
            <h2>Game Over</h2>
            <p>Press Alt+R to restart</p>
        </div>
        <hr />
        <div className='stats'>
            <h3>Tetris Stats</h3>
            <span>Score: {tetrisScore.value}</span>
            <span>Rows: {tetrisRows.value}</span>
            <span>Level: {Math.floor(tetrisLevel.value)}</span>
            <h3>Typing Stats</h3>
            <span>Words: {typedWords.value}</span>
            <span>WPM: </span>
            <span>Accuracy: {typingAccuracy.value}</span>
        </div>
        <hr />
        <div className="controls">
            <span>Restart</span>
            <Link to={"stats"}>
                Stats
            </Link>
        </div>
   
    </StyledGameOverScreen>
)}


const StyledGameOverScreen = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: 0 0 20px 0;
    padding: 20px;
    height: max-content;
    width: max-content;
    border-radius: 20px;
    border: none;
    background: white;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    width: 80%;
    height: 80%;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);

    h2 {
        text-align: center;
        padding: 20px 0;
    }

    p {
        text-align: center;
        margin-bottom: 1em;
        font-family: monospace;
    }

    .stats {
        display: flex;
        flex-direction: column;
        gap: 0.6em;
    }

    h3 {
        text-align: left;
        padding: 15px 0;
    }

    .controls {
        dipslay: flex;
        flex-direction: row;
    }

    hr {
        margin: 3px 0;
    }

`;

export default GameOverScreen;