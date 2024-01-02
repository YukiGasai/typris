import styled from 'styled-components';
import { getInputKeys } from './InputDisplay';
import React from 'react';
import { settings } from '../../helper/gameSignals';
import { AutoSwitch } from '../../helper/settingsObjects';

// eslint-disable-next-line no-extend-native
String.prototype.firstUppercase = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const ControlInfo = () => {
    return (
        <StyledControlInfo>      
            {["left", "down", "rotate", "right"].map((input, index) => (<React.Fragment key={index}>
                <kbd className='kbc-button'>{getInputKeys()[input] ?? ""}</kbd>
                <span>{input.firstUppercase()}</span>
            </React.Fragment>))} 
            {!settings.value[AutoSwitch._Key] && <>
                <kbd className="kbc-button">Tab</kbd>
                <span>Toggle control</span>
            </>}
            <span>
            <kbd className="kbc-button">Alt</kbd>
            <span> + </span>
            <kbd className="kbc-button">R</kbd>
            </span>
            <span>Reset game</span>
            <kbd className="kbc-button">Esc</kbd>
            <span>Command pallet</span>
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
    row-gap: 2px;
    align-items: center;
    justify-items: center;

    transform: translate(-50%, -50%);
    width: max-content;
    background: rgba(255,255,255, .5);
    padding: 2em;
    border-radius: 20px;

    kbd, span {
        justify-self: left;
    }

    span {
        font-size: 1.2em;
        font-family: monospace;
    }
`;

export default ControlInfo;