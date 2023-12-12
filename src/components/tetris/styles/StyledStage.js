import styled from 'styled-components';

export const StyledStage = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    border: 2px solid #eee;
    width: 100%;
    max-width: 20vw;
    background: #eee;

`;