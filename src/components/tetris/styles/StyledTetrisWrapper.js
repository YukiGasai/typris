import styled from 'styled-components';


export const StyledTetrisWrapper = styled.div`
    width: fit-content;
    background-size: cover;
    display: flex;
    flex-direction: row;
    &:focus > div:first-child {
        outline: 3px ridge rgba(170, 50, 220, .6);
    }
`