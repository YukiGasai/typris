import { CommandPaletteMenuType } from "./constants";

export const Language = Object.freeze({
    _Name: "Language",
    _Key: "language",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + L",
    _Default: 0,
    "German 1k": "german_1k",
    "German 10k": "german_10k",
    "English 1k": "english_1k",
    "English 10k": "english_10k",
    "English Quotes": "english_quotes",
});

export const Difficulty = Object.freeze({
    _Name: "Difficulty",
    _Key: "difficulty",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + D",
    _Default: 0,
    Easy: "0",
    Medium: "1",
    Hard: "2",
});

export const AutoSwitch = Object.freeze({
    _Name: "Auto Switch",
    _Key: "autoSwitch",
    _Type: CommandPaletteMenuType.Toggle,
    _Default: true,
    _Hotkey: "Alt + Z",
});


export const TextCasing = Object.freeze({
    _Name: "Text Casing",
    _Key: "textCasing",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + C",
    _Default: 0,
    Mixed: "mixed",
    Lowercase: "lowercase",
    Uppercase: "uppercase",
    SCREAMING: "screaming",
});

export const TextSymbols = Object.freeze({
    _Name: "Text Symbols",
    _Key: "textSymbols",
    _Type: CommandPaletteMenuType.Multi,
    _Hotkey: "Alt + X",
    _Default: [],
    "Numbers": "numbers",
    "Text Symbols": "textSymbols",
    "Math Symbols": "mathSymbols",
    "Additional Symbols": "additionalSymbols",    
});


export const TypingDisplayStyle = Object.freeze({
	_Name: "Typing Display style",
	_Key: "typingDisplayStyle",
    _Type: CommandPaletteMenuType.Single,
	_Hotkey: "Alt + T",
    _Default: 0,
	Fancy: "fancy",
	Simple:"simple",
});

export const AlignGame =  Object.freeze({
	_Name: "Game Alignment",
	_Key: "alignGame",
    _Type: CommandPaletteMenuType.Single,
	_Hotkey: "Alt + M",
    _Default: 1,
	Left: "left",
	Center:"center",
	Right:"right",
});

export const TypingSound = Object.freeze({
    _Name: "Typing Sound",
    _Key: "soundType",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + S",
    _Default: 0,
    Typewriter: "typewriter",
    Osu: "osu",
    Off: "off",
});

export const KeyInputDisplay = Object.freeze({
    _Name: "Key Input Display",
    _Key: "keyInputDisplay",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + K",
    _Default: 0,
    Horizontal: "horizontal",
    Directional: "directional",
    Off: "off",
});

export const TetrisControl = Object.freeze({
    _Name: "Tetris Control",
    _Key: "tetrisControl",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + I",
    _Default: 0,
    HJKL: "hjkl",
    WASD: "wasd",
    Arrows: "arrows",
});



export const StatDisplay = Object.freeze({
    _Name: "Stat Display",
    _Key: "statDisplay",
    _Type: CommandPaletteMenuType.Multi,
    _Hotkey: "Alt + U",
    _Default: [0, 5, 6],
    "Typed Words": "typedWords",
    "Typing Level": "typingLevel",
    "Tetris Score": "tetrisScore",
    "Tetris Rows": "tetrisRows",
    "Tetris Level": "tetrisLevel",
    "Typing Error Rate": "typingErrorRate",
    "Typing Speed": "typingSpeed",
});

export const Confetti = Object.freeze({
    _Name: "Confetti",
    _Key: "confetti",
    _Type: CommandPaletteMenuType.Multi,
    _Hotkey: "Alt + F",
    _Default: [1, 2],
    "Game End": "gameEnd",
    "Row Clear": "rowClear",
    "Highscore": "highscore",
});


export const SoundEffect = Object.freeze({
    _Name: "Sound Effects",
    _Key: "soundEffects",
    _Type: CommandPaletteMenuType.Multi,
    _Hotkey: "Alt + U",
    _Default: [0, 1, 2],
    "Typing": "typing",
    "Typing Error": "typingError",
    "Row Clear": "rowClear",
    "Move": "move",
    "Rotate": "rotate",
    "Drop": "drop",
    "Game End": "gameEnd",
    "Error Row": "errorRow",
});

export const SoundVolume = Object.freeze({
    _Name: "Sound Volume",
    _Key: "soundVolume",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + V",
    _Default: 5,
    0: 0,
    10: 0.1,
    20: 0.2,
    30: 0.3,
    40: 0.4,
    50: 0.5,
    60: 0.6,
    70: 0.7,
    80: 0.8,
    90: 0.9,
    100: 1,
});
