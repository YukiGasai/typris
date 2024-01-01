import styled from 'styled-components';
import { keyInputDisplay, tetrisInput, tetrisInputConfig } from '../../helper/gameSignals';

export const getInputKeys = () => {
  switch (tetrisInputConfig.value) {
    case "hjkl":
      return {"left": "H", "down": "J", "rotate": "K", "right": "L"};
    case "wasd":
      return {"left": "A", "down": "S", "rotate": "W", "right": "D"};
    case "arrow":
      return {"left": "←", "down": "↓", "rotate": "↑", "right": "→"};
    default:
      return {"left": "H", "down": "J", "rotate":  "K", "right": "L"};
  }
}

const InputDisplay = () => {
  return (
    <>
      {keyInputDisplay.value === "directional" &&
        <StyledInputDirectionDisplay>
          {["none", "rotate", "none", "left", "down", "right"].map((input, index) => (
            <button key={index} className={`kbc-button ${tetrisInput.value === input ? "active" : ""}`}>{getInputKeys()[input] ?? ""}</button>
          ))}
        </StyledInputDirectionDisplay>
      }
      {keyInputDisplay.value === "horizontal" &&
        <StyledInputHorizontalDisplay>
            {["left", "down", "rotate", "right"].map((input, index) => (
            <button key={index} className={`kbc-button ${tetrisInput.value === input ? "active" : ""}`}>{getInputKeys()[input] ?? ""}</button>
          ))}
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