import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HeaderLink from './HeaderLink';
import AccountButton from './AccountButton';
import { Settings, Info, BarChart4, BookOpenText  } from 'lucide-react';
import MainIcon from './MainIcon';
import { settings, user } from '../helper/gameSignals';
import { DisplayLanguage, Language } from '../helper/settingsObjects';
import i18n from '../hooks/i18n';

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
                <MainIcon />
                <h1>Typris</h1>
            </Link>
            <div className='headerLinks'>
                <HeaderLink to='/intro' alt="Intro" icon={<Info />} />
                <HeaderLink to='/stats' alt="Stats" icon={<BarChart4 />} />
                {user.value && settings.value[Language._Key]===Language['Gutenberg Books'] &&
                  <HeaderLink to='/books' alt="Books" icon={<BookOpenText  />} /> 
                }  
                <HeaderLink to='/settings' alt="Settings" icon={<Settings />} /> 
                <span 
                className="languageButton"
                onClick={() => {
                    if(settings.value[DisplayLanguage._Key] === DisplayLanguage.English){
                        settings.value = {
                            ...settings.value,
                            [DisplayLanguage._Key]: DisplayLanguage.German
                        };
                        i18n.changeLanguage(DisplayLanguage.German)
                    } else {
                        settings.value = {
                            ...settings.value,
                            [DisplayLanguage._Key]: DisplayLanguage.English
                        };
                        i18n.changeLanguage(DisplayLanguage.English)
                    }
                }}>{settings.value[DisplayLanguage._Key]}</span>    
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

    .languageButton {
        text-transform: uppercase;
        cursor: pointer;
        font-weight: bold;
        &:hover {
            color: ${props => props.theme.colors.highlight};
        }
    }

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