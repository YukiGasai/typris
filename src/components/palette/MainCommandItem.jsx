import styled from 'styled-components';

const MainCommandItem = ({ name, highlight, category, hotkey, active }) => {
  return (
    <StyledMainCommandItem>
       <div>
        { active ? (
          <span className='activState'>✓</span>
        ) : (
          <span className='activState'></span>
        )}
        <span>{name}</span>
        <kbd>{hotkey}</kbd>
      </div>
    </StyledMainCommandItem>
  );
}

const StyledMainCommandItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 5;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.background};

  .activState {
    width: 20px;
    min-width: 20px;
    color: ${props => props.theme.colors.highlight};
  }
  background-color: transparent;
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: transparent;

    kbd {
      margin-left: auto;
      margin-right: 20px;
    }
  }
`;

export default MainCommandItem;