import { CommandPaletteMenuType } from "./constants";

export const Language = Object.freeze({
    _Name: {
        en: "Language",
        de: "Sprache",
    },
    _Description: {
        en: "The language of the words you will be typing. The 1k and 10k options are the most common words in the language. The quotes option is a collection of quotes from famous people.",
        de: "Die Sprache der Wörter, die du tippen wirst. Die Optionen 1k und 10k sind die häufigsten Wörter in der Sprache. Die Option Zitate ist eine Sammlung von Zitaten berühmter Persönlichkeiten.",
    },
    _Key: "language",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + L",
    _Default: 2,
    "German 1k": "german_1k",
    "German 10k": "german_10k",
    "English 1k": "english_1k",
    "English 10k": "english_10k",
    "English Quotes": "english_quotes",
    "English Bible": "english_bible",
});

export const Difficulty = Object.freeze({
    _Name: {
        en: "Difficulty",
        de: "Schwierigkeit",
    },
    _Description: {
        en: "The difficulty of the words you will be typing. The higher the difficulty the longer the words. The higher the difficulty the more points you will get, but the faster the tetris pieces will fall.",
        de: "Die Schwierigkeit der Wörter, die du tippen wirst. Je höher die Schwierigkeit, desto länger die Wörter. Je höher die Schwierigkeit, desto mehr Punkte bekommst du, aber die Tetris-Steine fallen schneller.",
    },
    _Key: "difficulty",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + D",
    _Default: 0,
    Easy: "0",
    Medium: "1",
    Hard: "2",
});
export const AutoSwitch = Object.freeze({
    _Name: {
        en: "Auto Switch",
        de: "Automatischer Wechsel",
    },
    _Description: {
        en: "Automatically switch between typing and tetris, after a word is typed or a piece is placed.",
        de: "Wechselt automatisch zwischen Tippen und Tetris, nachdem ein Wort getippt oder ein Stück platziert wurde.",
    },
    _Key: "autoSwitch",
    _Type: CommandPaletteMenuType.Toggle,
    _Default: true,
    _Hotkey: "Alt + Z",
});


export const TextCasing = Object.freeze({
    _Name: {
        en: "Text Casing",
        de: "Text Groß-/Kleinschreibung",
    },
    _Description: {
        en: "The casing of the words you will be typing.",
        de: "Die Groß-/Kleinschreibung der Wörter, die Sie tippen werden.",
    },
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
    _Name: {
        en: "Text Symbols",
        de: "Textsymbole",
    },
    _Description: {
        en: "Extra Symbols besides the letters of the words you will be typing.",
        de: "Zusätzliche Symbole neben den Buchstaben der Wörter, die Sie tippen werden.",
    },
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
    _Name: {
        en: "Typing Display style",
        de: "Eingabe-Anzeigestil",
    },
    _Description: {
        en: "The style of the typing input display.",
        de: "Der Stil der Eingabeanzeige.",
    },
    _Key: "typingDisplayStyle",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + Y",
    _Default: 0,
    Fancy: "fancy",
    Simple:"simple",
});

export const AlignGame =  Object.freeze({
    _Name: {
        en: "Game Alignment",
        de: "Spiel Ausrichtung",
    },
    _Description: {
        en: "The position of the game on the screen.",
        de: "Die Position des Spiels auf dem Bildschirm.",
    },
    _Key: "alignGame",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + M",
    _Default: 1,
    Left: "left",
    Center:"center",
    Right:"right",
});
export const TypingSound = Object.freeze({
    _Name: {
        en: "Typing Sound",
        de: "Tippgeräusch",
    },
    _Description: {
        en: "The sound of the typing inside the typing input display.",
        de: "Der Klang des Tippens innerhalb der Eingabeanzeige.",
    },
    _Key: "soundType",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + S",
    _Default: 0,
    Typewriter: "typewriter",
    Osu: "osu",
    Off: "off",
});

export const KeyInputDisplay = Object.freeze({
    _Name: {
        en: "Key Input Display",
        de: "Tasteneingabe-Anzeige",
    },
    _Description: {
        en: "The display of the keys you press, while playing tetris.",
        de: "Die Anzeige der Tasten, die Sie drücken, während Sie Tetris spielen.",
    },
    _Key: "keyInputDisplay",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + K",
    _Default: 0,
    Horizontal: "horizontal",
    Directional: "directional",
    Off: "off",
});

export const TetrisControl = Object.freeze({
    _Name: {
        en: "Tetris Control",
        de: "Tetris Steuerung",
    },
    _Description: {
        en: "The keys you use to control the tetris pieces.",
        de: "Die Tasten, die Sie zur Steuerung der Tetris-Teile verwenden.",
    },
    _Key: "tetrisControl",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + I",
    _Default: 2,
    HJKL: "hjkl",
    WASD: "wasd",
    Arrows: "arrows",
});
export const StatDisplay = Object.freeze({
    _Name: {
        en: "Stat Display",
        de: "Stat Anzeige",
    },
    _Description: {
        en: "The stats on the right side you see while playing.",
        de: "Die Statistiken auf der rechten Seite, die Sie beim Spielen sehen.",
    },
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
    _Name: {
        en: "Confetti",
        de: "Konfetti",
    },
    _Description: {
        en: "Switch on or off the confetti animations.",
        de: "Schalten Sie die Konfetti-Animationen ein oder aus.",
    },
    _Key: "confetti",
    _Type: CommandPaletteMenuType.Multi,
    _Hotkey: "Alt + F",
    _Default: [1, 2],
    "Game End": "gameEnd",
    "Row Clear": "rowClear",
    "Highscore": "highscore",
});

export const SoundEffect = Object.freeze({
    _Name: {
        en: "Sound Effects",
        de: "Soundeffekte",
    },
    _Description: {
        en: "Turn on sound effects for certain events.",
        de: "Schalten Sie Soundeffekte für bestimmte Ereignisse ein.",
    },
    _Key: "soundEffects",
    _Type: CommandPaletteMenuType.Multi,
    _Hotkey: "Alt + U",
    _Default: [0, 1, 2, 3, 4, 5, 6, 7],
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
    _Name: {
        en: "Sound Volume",
        de: "Lautstärke",
    },
    _Description: {
        en: "The volume of the sound effects.",
        de: "Die Lautstärke der Soundeffekte.",
    },
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
    _Name: {
        en: "Theme",
        de: "Farbschema",
    },
    _Description: {
        en: "The color theme of the website.",
        de: "Das Farbschema der Website.",
    },
    _Key: "theme",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + T",
    _Default: 0,
    Paper: "paper",
    Github: "github",
    Catppuccin: "catppuccin",
    Drakula: "drakula",
    Vaporwave: "vaporwave",
    "Tokio Night": "tokioNight",
    "Cotton Candy": "cottonCandy",
});

export const OnlineShare = Object.freeze({
    _Name: {
        en: "Online Share",
        de: "Online Teilen",
    },
    _Description: {
        en: "Share your typing and tetris scores online. If you don't share your scores online, you will not appear on the leaderboard and others won't be able to compare their scores to yours.",
        de: "Teilen Sie Ihre Tipp- und Tetris-Punkte online. Wenn Sie Ihre Punkte nicht online teilen, erscheinen Sie nicht auf der Bestenliste und andere können ihre Punkte nicht mit Ihren vergleichen.",
    },
    _Key: "onlineShare",
    _Type: CommandPaletteMenuType.Toggle,
    _Hotkey: "Alt + O",
    _Default: true,
});

export const StatsFilter = Object.freeze({
    _Name: {
        en: "Stats Filter",
        de: "Statistik Filter",
    },
    _Description: {
        en: "The filter for the stats you see on the leaderboard.",
        de: "Der Filter für die Statistiken, die Sie auf der Bestenliste sehen.",
    },
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
    _Name: {
        en: "Stats Sort",
        de: "Statistik Sortierung",
    },
    _Description: {
        en: "The sort for the stats you see on the leaderboard.",
        de: "Die Sortierung für die Statistiken, die Sie auf der Bestenliste sehen.",
    },
    _Key: "statsSort",
    _Type: CommandPaletteMenuType.Multi,
    _Default: [0],
    "Tetris Score": "tetrisScore",
    "Tetris Rows": "tetrisRows",
    "Error Rows": "errorRows",
    "Typed Words": "typedWords",
    "Words Per Minute": "wordsPerMinute",
});

export const DisplayLanguage = Object.freeze({
    _Name: {
        en: "Display Language",
        de: "Anzeigesprache",
    },
    _Description: {
        en: "The language of the website.",
        de: "Die Sprache der Website.",
    },
    _Key: "displayLanguage",
    _Type: CommandPaletteMenuType.Single,
    _Hotkey: "Alt + G",
    _Default: 0,
    English: "en",
    German: "de",
});