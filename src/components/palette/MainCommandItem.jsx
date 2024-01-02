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
      
        <span className={`chrome-category ${category}`}>{category}</span>
        {highlight ? (
          <span dangerouslySetInnerHTML={{ __html: highlight }} />
        ) : (
          <span className='pallet-command'>{name}</span>
        )}
      </div>
      <kbd className="chrome-shortcut">{hotkey}</kbd>
    </StyledMainCommandItem>
  );
}

const StyledMainCommandItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 5;

  .activState {
    width: 20px;
    min-width: 20px;
    aspect-ratio: 1;
  }

  div {
    display: flex;
  }
`;

export default MainCommandItem;