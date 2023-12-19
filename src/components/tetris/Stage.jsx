import React from "react";
import Cell from "./Cell";
import styled from 'styled-components';

const Stage = ({ stage }) => (
    <StyledStage width={stage[0].length} height={stage.length}>
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StyledStage>
)

const StyledStage = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    border: 2px solid #eee;
    
    aspect-ratio: 12 / 20;
    height: 80vh;
    background: #eee;
`;

export default Stage;