import { CommandPaletteMenuType } from "./constants";

export const Language = Object.freeze({
    _Name: "Language",
    _Description: "The language of the words you will be typing. The 1k and 10k options are the most common words in the language. The quotes option is a collection of quotes from famous people.",
    _Key: "language",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + L",
    _Default: 0,
    "German 1k": "german_1k",
    "German 10k": "german_10k",
    "English 1k": "english_1k",
    "English 10k": "english_10k",
    "English Quotes": "english_quotes",
    "English Bible": "english_bible",
});

export const Difficulty = Object.freeze({
    _Name: "Difficulty",
    _Description: "The difficulty of the words you will be typing. The higher the difficulty the longer the words. The higher the difficulty the more points you will get, but the faster the tetris pieces will fall.",
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
    _Description: "Automatically switch between typing and tetris, after a word is typed or a piece is placed.",
    _Key: "autoSwitch",
    _Type: CommandPaletteMenuType.Toggle,
    _Default: true,
    _Hotkey: "Alt + Z",
});


export const TextCasing = Object.freeze({
    _Name: "Text Casing",
    _Description: "The casing of the words you will be typing.",
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
    _Description: "Extra Symbols besides the letters of the words you will be typing.",
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
    _Description: "The style of the typing input display.",
	_Key: "typingDisplayStyle",
    _Type: CommandPaletteMenuType.Single,
	_Hotkey: "Alt + Y",
    _Default: 0,
	Fancy: "fancy",
	Simple:"simple",
});

export const AlignGame =  Object.freeze({
	_Name: "Game Alignment",
    _Description: "The position of the game on the screen.",
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
    _Description: "The sound of the typing inside the typing input display.",
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
    _Description: "The display of the keys you press, while playing tetris.",
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
    _Description: "The keys you use to control the tetris pieces.",
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
    _Description: "The stats on the right side you see while playing.",
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
    _Description: "Switch on or off the confetti animations.",
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
    _Description: "Turn on sound effects for certain events.",
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
    _Description: "The volume of the sound effects.",
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

export const Theme = Object.freeze({
    _Name: "Theme",
    _Description: "The color theme of the website.",
    _Key: "theme",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + T",
    _Default: 0,
    Paper: "paper",
    Github: "github",
    Arch: "arch",
});

export const OnlineShare = Object.freeze({
    _Name: "Online Share",
    _Description: "Share your typing and tetris scores online. If you don't share your scores online, you will not appear on the leaderboard and others won't be able to compere their scores to yours.",
    _Key: "onlineShare",
    _Type: CommandPaletteMenuType.Toggle,
    _Hotkey: "Alt + O",
    _Default: true,
});

export const StatsFilter = Object.freeze({
    _Name: "Stats Filter",
    _Description: "The filter for the stats you see on the leaderboard.",
    _Key: "statsFilter",
    _Type: CommandPaletteMenuType.Multi,
    _Default: [],
    "Difficulty Easy": "difficulty_" + Difficulty.Easy,
    "Difficulty Medium": "difficulty_" + Difficulty.Medium,
    "Difficulty Hard": "difficulty_" + Difficulty.Hard,
    "Language German 1k": "language_" + Language["German 1k"],
    "Language German 10k": "language_" + Language["German 10k"],
    "Language English 1k": "language_" + Language["English 1k"],
    "Language English 10k": "language_" + Language["English 10k"],
    "Language English Quotes": "language_" + Language["English Quotes"],
    "Language English Bible": "language_" + Language["English Bible"],
    "Symbols Numbers": "textSymbols_" + TextSymbols.Numbers,
    "Symbols Text Symbols": "textSymbols_" + TextSymbols["Text Symbols"],
    "Symbols Math Symbols": "textSymbols_" + TextSymbols["Math Symbols"],
    "Symbols Additional Symbols": "textSymbols_" + TextSymbols["Additional Symbols"],
});

export const StatsSort = Object.freeze({
    _Name: "Stats Sort",
    _Description: "The sort for the stats you see on the leaderboard.",
    _Key: "statsSort",
    _Type: CommandPaletteMenuType.Multi,
    _Default: [0],
    "Tetris Score": "tetrisScore",
    "Tetris Rows": "tetrisRows",
    "Error Rows": "errorRows",
    "Typed Words": "typedWords",
    "Words Per Minute": "wordsPerMinute",
});