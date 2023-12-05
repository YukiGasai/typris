import Tetris from '../tetris/Tetris';
import TypeGame from '../typing/TypeGame'
import Footer from './Footer';
import Header from './Header';

import { StyledMainPage } from './styles/StyledMainPage';

const MainPage = () => {
    return (
        <>
        <Header />
        <StyledMainPage>
            <div>   
                <TypeGame />
                <Tetris />
            </div>
        </StyledMainPage>
        <Footer />
        </>
    )
}

export default MainPage;