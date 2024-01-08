import React from 'react';
import styled from 'styled-components';
import { commandList, openCommandPalette } from './palette/MainCommandPalette';
import { settings } from '../helper/gameSignals';
import { useTranslation } from 'react-i18next';

const PaletteOpenButton = ({icon, menu, className}) => {

    const { t } = useTranslation();

    const openMenu = () => {
        openCommandPalette.value = true;
        commandList.value = menu;
    }

    return (
        <StyledPaletteOpenButton onClick={openMenu} className={className ?? ""}>
            {icon}
            <span>{t(settings.value[menu._Key])}</span>
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