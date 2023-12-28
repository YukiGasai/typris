import React from "react";
import styled from 'styled-components';
import { gameState } from "../../helper/gameSignals";
import { GameState } from "../../helper/constants";

const Display = ({ name, current, highScore }) => (
    <StyledDisplay>
    {gameState.value === GameState.Menu ? 
        name + ": " + (highScore ?? 0) :
        current + " / " +  (highScore ?? 0)
    }
    </StyledDisplay>
)

const StyledDisplay = styled.span`
    text-align: center;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin: 0 0 20px 0;
    padding: 20px;
    border: 4px solid #333;
    min-height: 30px;
    width: 100%;
    height: 40px;
    border-radius: 20px;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
    justify-content: center;
}
`;

export default Display;