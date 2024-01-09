import styled from 'styled-components';
import { getInputKeys } from './InputDisplay';
import React from 'react';
import { settings } from '../../helper/gameSignals';
import { AutoSwitch } from '../../helper/settingsObjects';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line no-extend-native
String.prototype.firstUppercase = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const ControlInfo = () => {

    const { t } = useTranslation(); 

    return (
        <StyledControlInfo>      
            {["left", "down", "rotate", "right"].map((input, index) => (<React.Fragment key={index}>
                <kbd className='kbc-button'>{getInputKeys()[input] ?? ""}</kbd>
                <span>{t("controls" + input.firstUppercase())}</span>
            </React.Fragment>))} 
            {!settings.value[AutoSwitch._Key] && <>
                <kbd className="kbc-button">Tab</kbd>
                <span>{t('Toggle control')}</span>
            </>}
            <div>
                <kbd className="kbc-button">Alt</kbd>
                <span> + </span>
                <kbd className="kbc-button">R</kbd>
            </div>
            <span>{t('Restart Game')}</span>
            <kbd className="kbc-button">Esc</kbd>
            <span>{t('Command pallet')}</span>
        </StyledControlInfo>
    );
    }


const StyledControlInfo = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    display: grid;
    grid-template-columns: repeat(2, auto);
    column-gap: 10px;
    row-gap: 7px;
    align-items: center;
    justify-items: center;

    transform: translate(-50%, -50%);
    width: max-content;
    background: ${props => props.theme.colors.secondary}77;
    padding: 2em;
    border-radius: 20px;

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        column-gap: 10px;
    }

    kbd, span {
        justify-self: left;
    }

    kbd {
        font-family: ${props => props.theme.fonts.primary};
        font-size: 1em;
        border-radius: 5px;
        width: 20px;
        height: 30px;
        display: flex;  
        align-items: center;
        justify-content: center;      
    }

    span {
        font-size: 1.2em;
        font-family: monospace;
    }
`;

export default ControlInfo;