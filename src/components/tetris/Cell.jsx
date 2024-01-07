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
    background: ${props=> props.color && props.theme.colors.tetrominos.fill ? `${props.theme.colors.tetrominos[props.type]}CC` : props.theme.colors.background};
    border: ${props => (props.type === 0 ? '0px solid' : '4px solid')};
    border-bottom-color: ${props => `${props.theme.colors.tetrominos[props.type]}${props.theme.colors.tetrominos.fill ? '19' : 'ff'}`};
    border-right-color: ${props => `${props.theme.colors.tetrominos[props.type]}${props.theme.colors.tetrominos.fill ? 'ff' : 'ff'}`};
    border-top-color: ${props => `${props.theme.colors.tetrominos[props.type]}${props.theme.colors.tetrominos.fill ? 'ff' : 'ff'}`};
    border-left-color: ${props => `${props.theme.colors.tetrominos[props.type]}${props.theme.colors.tetrominos.fill ? '4C' : 'ff'}`};
`;

export default React.memo(Cell);