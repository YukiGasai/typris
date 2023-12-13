import { useContext, useEffect } from 'react';
import { OptionContext } from '../../hooks/optionContext';
import { TextContext, TextProvider } from '../../hooks/textContext';
import Tetris from '../tetris/Tetris';
import TypeGame from '../typing/TypeGame'
import Footer from './Footer';
import Header from './Header';

import { StyledMainPage } from './styles/StyledMainPage';

const MainPage = () => {
    return (

        <>
        <StyledMainPage>
            <TextProvider>
                <TypeGame />
                <Tetris />   
            </TextProvider>
        </StyledMainPage>
        </>
    )
}

export default MainPage;