import { signal, effect } from "@preact/signals-react";

const LANGUAGE_KEY = "language";
const GAME_MODE_KEY = "gameMode";
const START_DROP_TIME = 300;

//Settings Signals
export const language = signal(localStorage.getItem(LANGUAGE_KEY) || "german_1k");
effect(() => localStorage.setItem(LANGUAGE_KEY, language.value))

export const gameMode = signal(localStorage.getItem(GAME_MODE_KEY) || 0);
effect(() => localStorage.setItem(GAME_MODE_KEY, gameMode.value))

//General Signals
export const gameOver = signal(false);

//Tetris Signals
export const playerHasControl = signal(true);
export const dropTime = signal(START_DROP_TIME);
export const errorRowCount = signal(0);

//Text Signals
export const typingText = signal("Test Text");
export const cursorPosition = signal(0);
export const typingLevel = signal(1);
export const forceLowerCase = signal(false);

//Game Results
export const correctLetters = signal(0);
export const wrongLetters = signal(0);
export const tetrisRows = signal(0);
export const tetrisLevel = signal(1);
export const tetrisScore = signal(0);
export const typedWords = signal(0);

effect(() => {
    dropTime.value = START_DROP_TIME / (tetrisLevel.value + 1) + 200
})