import styled from 'styled-components';
import { autoSwitch } from '../../helper/gameSignals';

const ControlInfo = () => {
    return (
        <StyledControlInfo>      
            <kbd className="kbc-button">H</kbd>
            <span>Move Left</span>
            <kbd className="kbc-button">L</kbd>
            <span>Move Right</span>
            <kbd className="kbc-button">J</kbd>
            <span>Drop</span>
            <kbd className="kbc-button">K</kbd>
            <span>Rotate</span>    
            {!autoSwitch.value && <>
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
    padding: 50px;
    border-radius: 20px;
    

    kbd, span {
        justify-self: left;
    }
`;

export default ControlInfo;