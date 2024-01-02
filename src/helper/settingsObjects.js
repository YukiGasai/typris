export const Language = Object.freeze({
    _Name: "Language",
    _Key: "language",
    _Type: "single",
    _Hotkey: "Alt + L",
    "German 1k": "german_1k",
    "German 10k": "german_10k",
    "English 1k": "english_1k",
    "English 10k": "english_10k",
    "English Quotes": "english_quotes",
});

export const Difficulty = Object.freeze({
    _Name: "Difficulty",
    _Key: "difficulty",
    _Type: "single",
    _Hotkey: "Alt + D",
    Easy: "0",
    Medium: "1",
    Hard: "2",
});

export const AutoSwitch = Object.freeze({
    _Name: "Auto Switch",
    _Key: "autoSwitch",
    _Type: "toggle",
    _Hotkey: "Alt + Z",
});


export const TextCasing = Object.freeze({
    _Name: "Text Casing",
    _Key: "textCasing",
    _Type: "single",
    _Hotkey: "Alt + C",
    Mixed: "mixed",
    Lowercase: "lowercase",
    Uppercase: "uppercase",
    SCREAMING: "screaming",
});

export const TextSymbols = Object.freeze({
    _Name: "Text Symbols",
    _Key: "textSymbols",
    _Type: "multi",
    _Hotkey: "Alt + X",
    "Numbers": "numbers",
    "Text Symbols": "textSymbols",
    "Math Symbols": "mathSymbols",
    "Additional Symbols": "additionalSymbols",    
});


export const TypingDisplayStyle = Object.freeze({
	_Name: "Typing Display style",
	_Key: "typingDisplayStyle",
    _Type: "single",
	_Hotkey: "Alt + T",
	Fancy: "fancy",
	Simple:"simple",
});

export const AlignGame =  Object.freeze({
	_Name: "Game Alignment",
	_Key: "alignGame",
    _Type: "single",
	_Hotkey: "Alt + M",
	Left: "left",
	Center:"center",
	Right:"right",
});

export const TypingSound = Object.freeze({
    _Name: "Typing Sound",
    _Key: "soundType",
    _Type: "single",
    _Hotkey: "Alt + S",
    Typewriter: "typewriter",
    Osu: "osu",
    Off: "off",
});

export const KeyInputDisplay = Object.freeze({
    _Name: "Key Input Display",
    _Key: "keyInputDisplay",
    _Type: "single",
    _Hotkey: "Alt + K",
    Horizontal: "horizontal",
    Directional: "directional",
    Off: "off",
});

export const TetrisControl = Object.freeze({
    _Name: "Tetris Control",
    _Key: "tetrisControl",
    _Type: "single",
    _Hotkey: "Alt + I",
    HJKL: "hjkl",
    WASD: "wasd",
    Arrows: "arrows",
});



export const StatDisplay = Object.freeze({
    _Name: "Stat Display",
    _Key: "statDisplay",
    _Type: "multi",
    _Hotkey: "Alt + U",
    "Typed Words": "typedWords",
    "Typing Level": "typingLevel",
    "Tetris Score": "tetrisScore",
    "Tetris Rows": "tetrisRows",
    "Tetris Level": "tetrisLevel",
    "Typing Error Rate": "typingErrorRate",
    "Typing Speed": "typingSpeed",
});
