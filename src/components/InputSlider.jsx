import React from 'react';
import styled from 'styled-components';

const InputSlider = (props) => (
    <StyledInputSlider type="range" {...props} />
);

const StyledInputSlider = styled.input`
//Chrome

    -webkit-appearance: none;


&::-webkit-slider-runnable-track {
    width: 300px;
    height: 5px;
    background: ${props => props.theme.colors.primary};
    border: none;
    border-radius: 3px;
}

&::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
    margin-top: -5px;
}

&:focus {
    outline: none;
}

&:focus::-webkit-slider-runnable-track {
    background: ${props => props.theme.colors.secondary};
}

//Firefox
&{
    /* fix for FF unable to apply focus style bug  */
    border: 1px solid transparent; 

    /*required for proper track sizing in FF*/
    width: 300px;
    background: transparent;
}

&::-moz-range-track {
    width: 300px;
    height: 5px;
    background: ${props => props.theme.colors.primary};
    border: none;
    border-radius: 3px;
}

&::-moz-range-thumb {
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: ${props => props.theme.colors.primary};
}

/*hide the outline behind the border*/
&:-moz-focusring{
    outline: 1px solid white;
    outline-offset: -1px;
}

&:focus::-moz-range-track {
    background: ${props => props.theme.colors.secondary};
}
`

export default InputSlider;