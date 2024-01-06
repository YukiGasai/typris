import React from "react";
import styled from 'styled-components';
import { gameState } from "../../helper/gameSignals";
import { GameState } from "../../helper/constants";



const Display = ({ name, current, highScore }) => {

    function getText() {
        if(gameState.value === GameState.Menu) {
            if (highScore) {
                return name + " : " + highScore;
            }
            return name;
        } else {
            if(highScore) {
                return current + " / " + highScore;
            }
            return current;
        }
    }

    return (
    <StyledDisplay>
        {getText()}
    </StyledDisplay>
)}

const StyledDisplay = styled.span`
    text-align: center;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 20px;
    border: 4px solid ${props => props.theme.colors.primary};
    min-height: 30px;
    width: 100%;
    height: 40px;
    border-radius: 20px;
    font-family: ${props => props.theme.fonts.secondary};
    font-size: 0.8rem;
    justify-content: center;
}
`;

export default Display;