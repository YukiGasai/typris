import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HeaderLink from './HeaderLink';

import icon from '../assets/images/icon.svg'
import settingsIcon from '../assets/images/settings.svg'
import introIcon from '../assets/images/info.svg'
import imprintIcon from '../assets/images/scale.svg'
import statsIcon from '../assets/images/stats.svg'

const Header = () => {
    return (
        <StyledHeader>
            <Link 
                to='/' 
                className='logo'
                onClick={() => {
                    // Force reload of the page to reset the game
                    window.location.href = window.location.href + "";
                }}
            >
                <img src={icon} alt="Icon" />
                <h1>Tetris Tutor</h1>
            </Link>
            <div className='headerLinks'>
                <HeaderLink to='/stats' alt="Stats" img={statsIcon} />
                <HeaderLink to='/intro' alt="Intro" img={introIcon} />
                <HeaderLink to='/imprint' alt="Imprint" img={imprintIcon} />  
                <HeaderLink to='/settings' alt="Settings" img={settingsIcon} />                
            </div>
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 2px solid black;
    margin: 10px 10%;

    .headerLinks{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
        align-self: flex-end;
        margin-left: 20px;
    }

    .logo {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        font-family: Pixel, Arial, Helvetica, sans-serif;
        font-size: 1rem;
        cursor: pointer;
        text-decoration: none;
        color: black;
    }
`;

export default Header;