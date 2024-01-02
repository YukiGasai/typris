import intro from '../../assets/video/intro.mp4';
import styled from 'styled-components';

const IntroPage = () => {

    const playGame = () => {
        window.location.href = '';
    }


    return (
        <MainContent>
        <Title>TETRIS TUTOR</Title>
        <Content>
            <VideoContainer>
                <video src={intro} loop autoPlay></video>
            </VideoContainer>
            <Instructions>
                <h2>How to Play</h2>
                <p>This game is about typing words while playing tetris. Every time you get a new piece you have to enter the word displayed above before the tetris piece hits the bottom. If the piece hits the bottom before you typed the word you get a error row. The usual tetris rules apply</p>
                <ButtonContainer> 
            <Button onClick={playGame}>Play</Button>  
            <Button>Register</Button>  
        </ButtonContainer>
            </Instructions>
        

       </Content>
    </MainContent>
    );
    }

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
    margin: 20px 10%;
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
   flex: 1 1;
   justify-content:center; 
   gap:70px; 
   justify-self:flex-end;
   align-self:flex-end;
   align-items:flex-end;
   width:100%;
`;

const Button = styled.button`
   padding:10px 20px; 
   width:100px;
   height:50px;
   cursor:pointer; 
`;

export default IntroPage;