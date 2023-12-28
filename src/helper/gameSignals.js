import { signal, effect } from "@preact/signals-react";

const LANGUAGE_KEY = "language";
const GAME_MODE_KEY = "gameMode";
const AUTO_SWITCH_KEY = "autoSwitch";
const SOUND_TYPE_KEY = "soundType";
const KEY_INPUT_DISPLAY_KEY = "keyInputDisplay";
const START_DROP_TIME = 300;

//Settings Signals
export const language = signal(localStorage.getItem(LANGUAGE_KEY) || "german_1k");
effect(() => localStorage.setItem(LANGUAGE_KEY, language.value))

export const gameMode = signal(localStorage.getItem(GAME_MODE_KEY) || 0);
effect(() => localStorage.setItem(GAME_MODE_KEY, gameMode.value))

export const autoSwitch = signal(JSON.parse(localStorage.getItem(AUTO_SWITCH_KEY)) || false);
effect(() => localStorage.setItem(AUTO_SWITCH_KEY, autoSwitch.value))

export const soundType = signal(localStorage.getItem(SOUND_TYPE_KEY) || "typewriter");
effect(() => localStorage.setItem(SOUND_TYPE_KEY, soundType.value))

export const keyInputDisplay = signal(localStorage.getItem(KEY_INPUT_DISPLAY_KEY) || "horizontal");
effect(() => localStorage.setItem(KEY_INPUT_DISPLAY_KEY, soundType.value))

//General Signals
export const gameState = signal("menu");

//Tetris Signals
export const playerHasControl = signal(true);
export const dropTime = signal(START_DROP_TIME);
export const errorRowCount = signal(0);

//Text Signals
export const typingText = signal("Test Text");
export const cursorPosition = signal(0);
export const typingLevel = signal(1);
export const forceLowerCase = signal(false);

export const tetrisInput = signal("");

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