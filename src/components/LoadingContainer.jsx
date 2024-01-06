import React from 'react';
import styled, { keyframes }  from 'styled-components';



const LoadingContainer = () => {
    return (
        <StyledLoadingContainer>
            <span>-</span>
        </StyledLoadingContainer>
    );
}

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const StyledLoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 100%;
    background-color: ${props => props.theme.colors.background};
    span {
        display: inline-block;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 5px solid ${props => props.theme.colors.primary};
        border-top-color: ${props => props.theme.colors.secondary};
        animation: ${spin} 1s ease-in-out infinite;
    }
`


export default LoadingContainer;