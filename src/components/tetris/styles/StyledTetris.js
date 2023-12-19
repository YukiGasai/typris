import styled from 'styled-components';
import { playerHasControl } from '../../../helper/gameSignals';

export const StyledTetris = styled.div`
    width: min-content;
    display: flex;
    align-items: flex-start;
    filter: blur(${playerHasControl ? "0px" : "20px"});
    aside {
        width: 100%;
        max-width: 200px;
        display: block;
        padding: 0 20px;
    }
`