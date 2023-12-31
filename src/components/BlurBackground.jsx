import styled from 'styled-components';

const BlurBackground = ({callback}) => {
    return (
        <StyledBlurBackground onClick={callback}></StyledBlurBackground>
    )
}

const StyledBlurBackground = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 2;
    top: 0;
    left: 0;
`

export default BlurBackground;