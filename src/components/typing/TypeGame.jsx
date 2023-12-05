import React from 'react';

const TypeGame = () => {

    const [text, setText] = React.useState("");

    const write = (e) => {
        e.preventDefault();
        console.log(e);
        setText(prev => prev + e.key);
    }

    return (
        <div id="typeGameContainer" role="button" tabIndex="1" onKeyDown={(e) => write(e)}>
            <p className='highlight'>{text}</p>
        </div>
    );
}

export default TypeGame;