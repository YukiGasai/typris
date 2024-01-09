import styled from 'styled-components';

const WarningButton = ({text, callback}) => {
    return (
        <StyledWarningButton onClick={callback}>{text}</StyledWarningButton>
    );
}


const StyledWarningButton = styled.button`
  appearance: none;
  border:1px solid red;
  color: red;
  min-width: 200px;
  min-height: 40px; 
  background-color: ${props => props.theme.colors.background};
  background-image: linear-gradient(45deg, red 50%, ${props => props.theme.colors.background}  50%);
  background-position: 100%;
  background-size: 300%;

  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;

  text-transform: uppercase;
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 700;

&:hover, &:focus {
    color: ${props => props.theme.colors.primary};
    outline: 0;
    background-position: 0;
}


transition: background 300ms ease-in-out;
`;


export default WarningButton;