import React from 'react';
import styled from 'styled-components';

const InputText = (props, ref) => {
    const {icon, ...otherProps} = props;
    
    return (
        <StyledInputBox>
            <input ref={ref} type="text" {...otherProps} />
            <span>{icon}</span>
        </StyledInputBox>
)};

const StyledInputBox = styled.div`

position: relative;

input {
    min-width: 200px;
    height: 20px;
    padding: 10px;
    font-size: 1em;
    border: none;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.primary};
    border-bottom: 1px solid ${props => props.theme.colors.primary};
    padding-right: 30px;
    &:focus {
        border-bottom: 1px solid ${props => props.theme.colors.highlight};
    }
}
span {
    display: flex;
    justify-content: center;
    position: absolute;
    color: ${props => props.theme.colors.primary};
    font-size: 1.5em;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    pointer-events: none;
}

`

export default React.forwardRef(InputText);