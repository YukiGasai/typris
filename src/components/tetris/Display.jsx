import React from "react";
import styled from 'styled-components';
import { gameOver } from '../../helper/gameSignals';

const Display = ({ text }) => (
    <StyledDisplay>{text}</StyledDisplay>
)

const StyledDisplay = styled.div`
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
    color: ${gameOver.value ? 'red' : '#999'};
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 0.8rem;
`;

export default Display;