import { signal, effect, computed } from "@preact/signals-react";
import { GameState } from "./constants";

const LANGUAGE_KEY = "language";
const GAME_MODE_KEY = "gameMode";
const AUTO_SWITCH_KEY = "autoSwitch";
const SOUND_TYPE_KEY = "soundType";
const KEY_INPUT_DISPLAY_KEY = "keyInputDisplay";
const HIGH_SCORES_KEY = "highScores";
const DISPLAY_LIST_KEY = "displayList";
const TYPING_DISPLAY_STYLE_KEY = "typingDisplayStyle";
const ALIGN_GAME_KEY = "alignGame";
const START_DROP_TIME = [800, 500, 200];

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
effect(() => localStorage.setItem(KEY_INPUT_DISPLAY_KEY, keyInputDisplay.value))

export const highScores = signal(JSON.parse(localStorage.getItem(HIGH_SCORES_KEY) || "{}"));
effect(() => localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(highScores.value)))

export const displayList = signal(JSON.parse(localStorage.getItem(DISPLAY_LIST_KEY) || '["typedWords"]'));
effect(() => localStorage.setItem(DISPLAY_LIST_KEY, JSON.stringify(displayList.value)))

export const typingDisplayStyle = signal(localStorage.getItem(TYPING_DISPLAY_STYLE_KEY) || 'fancy');
effect(() => localStorage.setItem(TYPING_DISPLAY_STYLE_KEY, typingDisplayStyle.value))

export const alignGame = signal(localStorage.getItem(ALIGN_GAME_KEY) || 'center');
effect(() => localStorage.setItem(ALIGN_GAME_KEY, alignGame.value))

//General Signals
export const gameState = signal(GameState.Menu);

//Tetris Signals
export const playerHasControl = signal(true);
export const dropTime = signal(START_DROP_TIME);
export const errorRowCount = signal(0);

//Text Signals
export const typingText = signal("Lets start typing!");
export const cursorPosition = signal(0);
export const typingLevel = signal(0);
export const forceLowerCase = signal(false);

export const tetrisInput = signal("");
export const wordsPerMinuteScores = signal([]);

export const wordsPerMinute = computed(() => {
    const scores = wordsPerMinuteScores.value;
    if(scores.length === 0) {
        return 0;
    }
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
});

//Game Results
export const correctLetters = signal(0);
export const wrongLetters = signal(0);

export const typingAccuracy = computed(() => {
    if(correctLetters.value === 0 && wrongLetters.value === 0) {
        return 0;
    }
   return (correctLetters.value / (correctLetters.value + wrongLetters.value) * 100).toFixed(2)
});



export const tetrisRows = signal(0);
export const tetrisLevel = signal(0);
export const tetrisScore = signal(0);
export const typedWords = signal(0);


effect(() => {
    dropTime.value = START_DROP_TIME[gameMode.value] / (Math.floor(tetrisLevel.value) / 10 + 1) + 200
})


//Helper
export const blurBackground = signal(false);