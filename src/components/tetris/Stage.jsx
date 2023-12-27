import React from "react";
import Cell from "./Cell";
import styled from 'styled-components';
import ControlInfo from "./ControlInfo";
import { gameState } from "../../helper/gameSignals";

const Stage = ({ stage }) => (
    <StyledStage width={stage[0].length} height={stage.length}>
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
        {gameState.value == "menu" && <ControlInfo />}
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
`;

export default Stage;