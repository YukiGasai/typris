import React from "react";
import styled from 'styled-components';
import { gameState } from "../../helper/gameSignals";
import { GameState } from "../../helper/constants";

const Display = ({ name, current, highScore }) => {

    function getText() {
        if(gameState.value === GameState.Menu) {
            if (highScore) {
                return highScore;
            }
        } else {
            if(highScore) {
                return current + " / " + highScore;
            }
            return current;
        }
    }

    return (
    <StyledDisplay>
        <span>{name}</span>
        <span>{getText()}</span>
    </StyledDisplay>
)}

const StyledDisplay = styled.div`

display: flex;
flex-direction: column;
align-items: center;
padding: 8px;
border: 3px solid ${props => props.theme.colors.primary};
min-height: 30px;
border-radius: 20px;
justify-content: center;

span {
    text-align: center;
    box-sizing: border-box;
    font-size: 0.8rem;
    font-family: ${props => props.theme.fonts.secondary};
}
`;

export default Display;