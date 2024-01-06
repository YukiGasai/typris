import React from 'react';
import styled from 'styled-components';
import { commandList, openCommandPalette } from './palette/MainCommandPalette';
import { getKeyByValue } from '../helper/general';
import { settings } from '../helper/gameSignals';

const PaletteOpenButton = ({icon, menu, className}) => {

    const openMenu = () => {
        openCommandPalette.value = true;
        commandList.value = menu;
    }

    return (
        <StyledPaletteOpenButton onClick={openMenu} className={className ?? ""}>
            {icon}
            <span>{getKeyByValue(menu, settings.value[menu._Key])}</span>
        </StyledPaletteOpenButton>
    );
}

const StyledPaletteOpenButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    gap: 10px;

    &:hover {
        color: ${props => props.theme.colors.highlight};
    }

    &.bottomLeft {
        margin-top: auto;
        align-self: flex-start;
    }
`

export default PaletteOpenButton;