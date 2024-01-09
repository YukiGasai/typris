import styled from 'styled-components';
import { settings, tetrisInput } from '../../helper/gameSignals';
import { KeyInputDisplay, TetrisControl } from '../../helper/settingsObjects';

export const getInputKeys = () => {
  switch (settings.value[TetrisControl._Key]) {
    case TetrisControl.HJKL:
      return {"left": "H", "down": "J", "rotate": "K", "right": "L"};
    case TetrisControl.WASD:
      return {"left": "A", "down": "S", "rotate": "W", "right": "D"};
    case TetrisControl.Arrows:
      return {"left": "←", "down": "↓", "rotate": "↑", "right": "→"};
    default:
      return {"left": "H", "down": "J", "rotate":  "K", "right": "L"};
  }
}

const InputDisplay = () => {
  return (
    <>
      {settings.value[KeyInputDisplay._Key] === KeyInputDisplay.Directional &&
        <StyledInputDirectionDisplay>
          {["none", "rotate", "none", "left", "down", "right"].map((input, index) => (
            <button key={index} className={`kbc-button ${tetrisInput.value === input ? "active" : ""}`}>{getInputKeys()[input] ?? ""}</button>
          ))}
        </StyledInputDirectionDisplay>
      }
      {settings.value[KeyInputDisplay._Key] === KeyInputDisplay.Horizontal &&
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
grid-template-rows: repeat(2, 30px);

grid-column-gap: 10px;
grid-row-gap: 15px;  
justify-content: center;
button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 30px;
    aspect-ratio: 1 / 1;
    font-family: ${props => props.theme.fonts.primary};
}

button::after {
  font-family: ${props => props.theme.fonts.primary};
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
    height: 30px;
    aspect-ratio: 1;
    font-family: ${props => props.theme.fonts.primary};
}
button::after {
  font-family: ${props => props.theme.fonts.primary};
}

`;

export default InputDisplay;