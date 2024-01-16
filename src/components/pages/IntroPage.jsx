import { useTranslation } from 'react-i18next';
import intro from '../../assets/video/intro.mp4';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { user } from '../../helper/gameSignals';
import { logout, startLogin } from '../../helper/authHelper';
import { getAlignMent } from './MainPage';
import AccountButton from '../AccountButton';

const IntroPage = () => {

    const { t } = useTranslation();


    return (
        <MainContent>
        <Title>Typris</Title>
        <Content>
            <VideoContainer>
                <video src={intro} loop autoPlay></video>
            </VideoContainer>
            <Instructions>
                <h2>{t("introTitle")}</h2>
                <p>{t("introText")}</p>
                <ButtonContainer> 
                <Button>
                    <Link to="/">
                        {t('playButton')}
                    </Link>
                </Button>
            {user.value ?
                <Button onClick={()=>logout()}>
                    {t('Logout')}
                </Button>
            :   
                <Button>
                    <AccountButton />
                </Button>
            }
        </ButtonContainer>

            </Instructions>
       </Content>
       <Content>
            <Instructions>
                <h2>{t("introTypingTitle")}</h2>
                <p>{t("introTypingText")}</p>
            <ButtonContainer> 
                <Button>
                    <Link to='https://www.typing.academy/10-finger-typing'>
                        Typing Academy
                    </Link>
                </Button>
                <Button>
                    <Link to='https://www.typingclub.com/'>
                        Typing Club
                    </Link>
                </Button>
            </ButtonContainer>
            </Instructions>
            <VideoContainer>
                <video src={intro} loop autoPlay></video>
            </VideoContainer>
        </Content>
    </MainContent>
    );
    }

const MainContent = styled.div`
    display: flex;
    max-width: 800px;
    flex-direction: column;
    align-items: center;
    margin: 0 10%;
    ${getAlignMent}
`;

const Title = styled.h1`
    font-size: 2em;
    padding: 40px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;

    @media (max-width: ${props => props.theme.screens.mobile}) {
        flex-direction: column;
        gap: 20px;
    }
`;

const VideoContainer = styled.div`
    height: auto;
    border: 1px solid ${props => props.theme.colors.background};; 
    flex: 1.5;

    video {
        width: 100%;
        border-radius: 15px;
        overflow: hidden;
    }

`;

const Instructions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    flex: 2;
    height: 100%;

    h2 {
        font-size: 1.5em;
        padding-bottom: 20px;

    }
`;

const ButtonContainer = styled.div`
   display:flex;
   gap: 10px;
   width:100%;
   margin: 20px 0;
   flex-wrap:wrap;
`;

const Button = styled.button`
   padding:10px 20px; 
    display:flex;
    flex:1;
    justify-content:center;

    align-items:center;
    align-content:center;
    min-height: 40px;
    height: 50px;
    min-width: 100px;
   cursor:pointer; 
   background-color: ${props => props.theme.colors.background};
   border: 3px solid ${props => props.theme.colors.primary};
   color: ${props => props.theme.colors.primary};
   font-size: 1em;
   font-family: ${props => props.theme.fonts.primary};
   width: 100%;
    border-radius: 15px;
`;

export default IntroPage;