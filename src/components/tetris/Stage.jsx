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
    border: 2px solid #eee;
    position: relative;
    aspect-ratio: 12 / 20;
    height: 80vh;
    background: #eee;
    filter: monotone(100%);

    @media (max-width: 700px) {
        max-height: 50vh;
    }
`;

export default Stage;