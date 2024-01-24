import React, { useEffect, useRef } from "react";
import styled, { useTheme, keyframes } from "styled-components";

const FancyCursorElement = () => {

    const cursorRef1 = useRef(null)
    const cursorRef2 = useRef(null)
    const [click, setClick] = React.useState(false);
    const [hover, setHover] = React.useState(false);
    const {colors} = useTheme();


    function applyCursorRippleEffect(e) {
        const ripple = document.createElement("div");
     
        ripple.className = "ripple";
        document.body.appendChild(ripple);
     
       ripple.style.left = `${e.clientX}px`;
       ripple.style.top = `${e.clientY}px`; 
     
        ripple.style.animation = "ripple-effect .4s  linear";
        ripple.style.border =  `1px solid ${colors.primary}`;
        ripple.onanimationend = () => document.body.removeChild(ripple);
     
     }


    const handleMouseMove = (e) => {
        let { clientX, clientY } = e
        // clientX = 10
        // clientY = 10
        cursorRef1.current.style.left = `${clientX}px`
        cursorRef1.current.style.top = `${clientY}px`

        cursorRef2.current.animate({
            left: `${clientX}px`,
            top: `${clientY}px`
        }, {duration: 500, fill: 'forwards'})
    }

    const handleMouseDown = (e) => {
        setClick(true)
        applyCursorRippleEffect(e)
        // cursorRef1.current.style.transform = 'scale(0.8)'
        // cursorRef1.current.style.borderColor = colors.highlight
        // cursorRef2.current.style.transform = 'scale(0.8)'
        // cursorRef2.current.style.borderColor = colors.highlight
        
    }

    const handleMouseUp = () => {
        setClick(false)
        
        // cursorRef1.current.style.transform = 'scale(1)'
        // cursorRef1.current.style.borderColor = colors.primary
        // cursorRef2.current.style.transform = 'scale(1)'
        // cursorRef2.current.style.borderColor = colors.primary
        
    }

    const mouseOver = (e) => { 
        if(e.target.classList.contains('clickable')) {
            setHover(true)
            cursorRef2.current.style.transform = 'translate(-50%, -50%) scale(1.5)'
        }
    }

    const mouseOut = () => {
        setHover(false)
        cursorRef2.current.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('mouseover', mouseOver)
        window.addEventListener('mouseout', mouseOut)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('mouseover', mouseOver)
            window.removeEventListener('mouseout', mouseOut)
        }
    }, [])

    return (
        <>
        <StyledFancyCursorDot ref={cursorRef1} $click={click} $hover={hover}/>
        <StyledFancyCursorRing ref={cursorRef2} $click={click} $hover={hover}/>
        </>
    )
}


const StyledFancyCursorDot = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    mix-blend-mode: difference;
    background-color: ${props => props.hover ? props.theme.colors.highlight : props.theme.colors.primary};
    transform: translate(-50%, -50%);
    z-index: 7;
`

const rotate = keyframes`
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
`

const StyledFancyCursorRing = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    mix-blend-mode: difference;

    border: 2px solid ${props => props.hover ? props.theme.colors.highlight : props.theme.colors.primary};
    width: ${props => props.hover ? 50 : 30}px;
    height: ${props => props.hover ? 50 : 30}px;
    transition: all 0.1s ease;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 7;
    animation: ${rotate} 2s cubic-bezier(.41,-0.49,.59,1.46) infinite;   

    &:after, 
    &:before {
        visibility: ${props => props.hover ? 'visible' : 'hidden'};
        content: "";
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        width: ${props => props.hover ? 16 : 8}px;
        height: ${props => props.hover ? 16 : 8}px;
        border-radius: 50%;
        background-color: ${props => props.hover ? props.theme.colors.highlight : props.theme.colors.primary};
    }

    &:before {
        top: -1px;
    }
    &:after {
        top: 100%
    }
    
`

export default FancyCursorElement;