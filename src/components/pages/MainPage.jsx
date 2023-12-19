import Tetris from '../tetris/Tetris';
import styled from 'styled-components';
import TypeGame from '../typing/TypeGame'
import { gameOver } from '../../helper/gameSignals';
import GameOverScreen from '../GameOverScreen';

const MainPage = () => {
    return (  
        <StyledMainPage>
            {gameOver.value && <GameOverScreen />}
            <TypeGame/>
            <Tetris/>   
        </StyledMainPage>
    )
}


const StyledMainPage = styled.div`
    display: flex;
    flex-direction: column;    
    justify-content: center;
    gap: 10px;
    margin: 0 10%;
    width: fit-content;
`

export default MainPage;