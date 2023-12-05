import Tetris from '../tetris/Tetris';
import TypeGame from '../typing/TypeGame'

import { StyledMainPage } from './styles/StyledMainPage';

const MainPage = () => {
    return (
        <StyledMainPage>
            <div>   
                <TypeGame />
                <Tetris />
            </div>
        </StyledMainPage>
    )
}

export default MainPage;