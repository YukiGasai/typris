import styled from 'styled-components';
import React from "react";

import { TETROMINOS } from "../../helper/tetris/tetrominos";

const Cell = ({ type }) => (
    <StyledCell
        type={type}
        color={TETROMINOS[type].color}
    >
    </StyledCell>
)

const StyledCell = styled.div`
    width: auto;
    aspect-ratio : 1 / 1;
    background: ${props=> props.color ? `rgba(${props.color}, 0.8)` : props.theme.colors.background};
    border: ${props => (props.type === 0 ? '0px solid' : '4px solid')};
    border-bottom-color: rgba(${props => props.color}, 0.1);
    border-right-color: rgba(${props => props.color}, 1);
    border-top-color: rgba(${props => props.color}, 1);
    border-left-color: rgba(${props => props.color}, 0.3);
`;

export default React.memo(Cell);