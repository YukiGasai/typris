import styled from 'styled-components';

const MainCommandItem = (suggestion) => {
  const { name, highlight, category, shortcut, state } = suggestion;
  return (
    <StyledMainCommandItem>
       <div>
      {state !== undefined && <>
        {state ? (
          <input className="stateInput" type="checkbox" checked />
        ) : (
          <input className="stateInput" type="checkbox" />
        )}
      </>
      }
        <span className={`chrome-category ${category}`}>{category}</span>
        {highlight ? (
          <span dangerouslySetInnerHTML={{ __html: highlight }} />
        ) : (
          <span className='pallet-command'>{name}</span>
        )}
      </div>
      <kbd className="chrome-shortcut">{shortcut}</kbd>
    </StyledMainCommandItem>
  );
}


const StyledMainCommandItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  z-index: 5;
  .stateInput{
    margin-right: 10px;
  }
`;

export default MainCommandItem;