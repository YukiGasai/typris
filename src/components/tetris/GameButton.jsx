import React from "react";
import styled from 'styled-components';

const GameButton = ({ callback, text, id, callbackDbl = () => {} }) => (
    <StyledStartButton id={id} onClick={callback} onDoubleClick={callbackDbl}>{text}</StyledStartButton>
)

const StyledStartButton = styled.div`
    box-sizing: border-box;
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