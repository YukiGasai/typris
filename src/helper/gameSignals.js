import { signal, effect, computed } from "@preact/signals-react";
import { GameState } from "./constants";
import { AlignGame, AutoSwitch, Difficulty, KeyInputDisplay, Language, StatDisplay, TetrisControl, TextCasing, TextSymbols, TypingDisplayStyle, TypingSound } from "./settingsObjects";

const HIGH_SCORES_KEY = "highScores";
const START_DROP_TIME = [800, 500, 200];


const defaultSettings = {
    [Language._Key]: Language["German 1k"],
    [Difficulty._Key]: Difficulty.Easy,
    [AutoSwitch._Key]: true,
    [TypingSound._Key]: TypingSound.Typewriter,
    [KeyInputDisplay._Key]: KeyInputDisplay.Horizontal,
    [StatDisplay._Key]: [StatDisplay["Typed Words"], StatDisplay["Typing Speed"]],
    [TypingDisplayStyle._Key]: TypingDisplayStyle.Fancy,
    [AlignGame._Key]: AlignGame.Center,
    [TextCasing._Key]: TextCasing.Mixed,
    [TextSymbols._Key]: [],
    [TetrisControl._Key]: TetrisControl.HJKL,
    highScores: {},
}

const loadSettings = () => {
    const settings = localStorage.getItem("settings");
    if(settings) {
        return JSON.parse(settings);
    }
    return defaultSettings;
}

export const settings = signal(loadSettings());
effect(() => localStorage.setItem("settings", JSON.stringify(settings.value)))

export const highScores = signal(JSON.parse(localStorage.getItem(HIGH_SCORES_KEY) || "{}"));
effect(() => localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(highScores.value)))

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

export const wordCount = computed(() => {
    let count = parseInt(settings.value[Difficulty._Key]) + 1;

    if (typingLevel > 10) {
        return count + 1
    }
    return count;
});

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
    dropTime.value = START_DROP_TIME[settings.value[Difficulty._Key]] / (Math.floor(tetrisLevel.value) / 10 + 1) + 200
})


//Helper
export const blurBackground = signal(false);
export const quoteAuthor = signal("");