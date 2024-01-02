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
    color: ${props => props.theme.colors.background};
    background: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.secondary};
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    text-align: center;
`;

export default GameButton;