import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { tetrisLevel, tetrisRows, tetrisScore } from '../helper/gameSignals';

const GameOverScreen = () => {

    return (
    <StyledGameOverScreen>
        <h1>Game Over</h1>
        <p>Press R to restart</p>
        <div >
            <span>Score: {tetrisScore.value}</span><br/>
            <span>Rows: {tetrisRows.value}</span><br/>
            <span>Level: {tetrisLevel.value}</span><br/>
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
    box-sizing: border-box;
    margin: 0 0 20px 0;
    padding: 20px;
    height: max-content;
    width: max-content;
    border-radius: 20px;
    border: none;
    color: white;
    background: #333;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
`;

export default GameOverScreen;