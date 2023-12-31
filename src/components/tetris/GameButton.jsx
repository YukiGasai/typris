import React from "react";
import styled from 'styled-components';

const GameButton = ({ callback, text, id }) => (
    <StyledStartButton id={id} onClick={callback}>{text}</StyledStartButton>
)

const StyledStartButton = styled.div`
    box-sizing: border-box;
    margin: 0 0 20px 0;
    padding: 20px;
    height: 60px;
    min-height: 30px;
    width: 100%;
    border-radius: 20px;
    border: none;
    color: white;
    background: #333;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    text-align: center;
`;

export default GameButton;