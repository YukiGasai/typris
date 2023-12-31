import styled from 'styled-components';
import { keyInputDisplay, tetrisInput } from '../../helper/gameSignals';

const InputDisplay = () => {
  return (
    <>
      {keyInputDisplay.value === "directional" &&
        <StyledInputDirectionDisplay>
            <button className={`kbc-button ${tetrisInput.value === "esc" ? "active" : ""}`}></button>
            <button className={`kbc-button ${tetrisInput.value === "k" ? "active" : ""}`}>K</button>
            <button className={`kbc-button ${tetrisInput.value === "r" ? "active" : ""}`}></button>
            <button className={`kbc-button ${tetrisInput.value === "h" ? "active" : ""}`}>H</button>
            <button className={`kbc-button ${tetrisInput.value === "j" ? "active" : ""}`}>J</button>
            <button className={`kbc-button ${tetrisInput.value === "l" ? "active" : ""}`}>L</button>
        </StyledInputDirectionDisplay>
      }
      {keyInputDisplay.value === "horizontal" &&
        <StyledInputHorizontalDisplay>
            <button className={`kbc-button ${tetrisInput.value === "h" ? "active" : ""}`}>H</button>
            <button className={`kbc-button ${tetrisInput.value === "j" ? "active" : ""}`}>J</button>
            <button className={`kbc-button ${tetrisInput.value === "k" ? "active" : ""}`}>K</button>
            <button className={`kbc-button ${tetrisInput.value === "l" ? "active" : ""}`}>L</button>
        </StyledInputHorizontalDisplay>
      }
    </>
  );
}

const StyledInputDirectionDisplay = styled.div`
display: grid;
grid-template-columns: repeat(3, auto);
grid-template-rows: repeat(2, auto);
grid-column-gap: 10px;
grid-row-gap: 10px;  
justify-content: center;
button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    aspect-ratio: 1;
}

`;

const StyledInputHorizontalDisplay = styled.div`
display: flex;
grid-template-columns: repeat(3, auto);
grid-template-rows: repeat(2, auto);
grid-column-gap: 10px;
grid-row-gap: 10px;  
justify-content: center;
button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    aspect-ratio: 1;
}

`;

export default InputDisplay;