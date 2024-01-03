import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HeaderLink from './HeaderLink';

import icon from '../assets/images/icon.svg'
import AccountButton from './AccountButton';
import { Settings, Info, BarChart4  } from 'lucide-react';

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
                <HeaderLink to='/stats' alt="Stats" icon={<BarChart4 />} />
                <HeaderLink to='/intro' alt="Intro" icon={<Info />} />
                <HeaderLink to='/settings' alt="Settings" icon={<Settings />} />        
                <AccountButton />        
            </div>
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 2px solid ${props => props.theme.colors.primary};
    margin: 10px 10%;

    .headerLinks{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        align-self: flex-end;
        flex: 1;
        margin-left: 20px;
        margin-bottom: 5px;
    }

    .headerLinks > div{
        margin-left: auto;
    }

    .logo {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        font-family: ${props => props.theme.fonts.secondary};
        font-size: 1rem;
        cursor: pointer;
        text-decoration: none;
        color: ${props => props.theme.colors.primary};
    }

    h1 {
        font-size: 1.5rem;
    }
`;

export default Header;