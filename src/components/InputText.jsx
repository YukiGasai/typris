import React from 'react';
import styled from 'styled-components';

const InputText = React.forwardRef((props, ref) => (
    <StyledInputBox ref={ref} type="text" {...props} />
));

const StyledInputBox = styled.input`
    min-width: 200px;
    height: 20px;
    padding: 10px;
    font-size: 1em;
    border: none;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.primary};
    border-bottom: 1px solid ${props => props.theme.colors.primary};
`

export default InputText;