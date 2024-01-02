import React from 'react'
import styled from 'styled-components'
import Confetti from 'react-confetti'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

const VelocityConfetti = () => {

    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)

    const ref = useRef(null)
    const confettiRef = useRef(null)

    useEffect(() => {
        setHeight(ref.current.clientHeight)
        setWidth(ref.current.clientWidth)
    }, [ref.current?.clientHeight, ref.current?.clientWidth])

  return (
    <StyledConfetti ref={ref}>
    <Confetti
      ref={confettiRef}
      width={width}
      recycle={false}
      height={height}
      numberOfPieces={30}
      initialVelocityX={{min: 3, max: 4}}
      initialVelocityY={10}
      gravity={0.15}
      confettiSource={{
        w: 1,
        h: 1,
        x: 0,
        y: height - 30,
      }}
    />
    </StyledConfetti>
  )
}

const StyledConfetti = styled.div`
position: absolute;
top: 0;
left: 100%;
width: 100%;
height: 100%;
overflow: hidden;
pointer-events: none;
`

export default VelocityConfetti
