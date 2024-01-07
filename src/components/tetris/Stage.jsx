import React from "react";
import Cell from "./Cell";
import styled from 'styled-components';
import ControlInfo from "./ControlInfo";
import { gameState, showRowClearAnimation } from "../../helper/gameSignals";
import { GameState } from "../../helper/constants";
import VelocityConfetti from "../RowConfetti";

const Stage = ({ stage }) => (
    <StyledStage width={stage[0].length} height={stage.length}>
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
        {gameState.value === GameState.Menu && <ControlInfo />}
        {showRowClearAnimation.value && <VelocityConfetti/>}
    </StyledStage>
)

const StyledStage = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    border: 1px solid ${props => props.theme.colors.tertiary};
    position: relative;
    aspect-ratio: 12 / 20;
    height: 80vh;
    background: ${props => props.theme.colors.tertiary};
    filter: monotone(100%);

    @media (max-width: ${props => props.theme.screens.mobile}) {
        max-height: 50vh;
    }

    &::focus-within {
        outline: 3px solid ${props => props.theme.colors.highlight};
        border: 1px solid ${props => props.theme.colors.highlight};
    }
`;

export default Stage;