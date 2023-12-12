import styled from 'styled-components';

export const StyledTypingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    white-space: pre;
    border-radius: 10px;
    border: 1px solid black;    
    flex: 1;

    .letterRed {
        color: red;
    }
    .letterGreen {
        color: green;
    }
    .letterBlack {
        color: black;
    }
    .text {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 80%;
        flex-wrap: wrap;
    }
`