const MainCommandItem = (suggestion) => {
    const { name, highlight, category, shortcut } = suggestion;
    return (
      <div className="pallet-suggestion">
        <div>
        <span className={`chrome-category ${category}`}>{category}</span>
        {highlight ? (
          <span dangerouslySetInnerHTML={{ __html: highlight }} />
        ) : (
          <span className='pallet-command'>{name}</span>
        )}
        </div>
        <kbd className="chrome-shortcut">{shortcut}</kbd>
      </div>
    );
}

export default MainCommandItem;