import { signal, effect, computed } from "@preact/signals-react";
import { CommandPaletteMenuType, GameState } from "./constants";
import { Difficulty } from "./settingsObjects";
import * as SettingsObjects from "./settingsObjects";
import { jwtDecode } from "jwt-decode";
import { backendUrl } from "./backendUrl";
import { getRandomQuote } from "./typing/gameHelper";
import { toast } from "react-toastify";

const HIGH_SCORES_KEY = "highScores";
const START_DROP_TIME = [800, 500, 200];

const defaultSettings = Object.keys(SettingsObjects)
.map(key => SettingsObjects[key])
.reduce((all, settingsEnum) => {
    const options = Object.entries(settingsEnum)
        .filter(([key]) => !key.startsWith("_"))
    if(settingsEnum._Type === CommandPaletteMenuType.Multi) {
        all[settingsEnum._Key] = settingsEnum._Default.map(index => options[index][1]);
    }else if(settingsEnum._Type === CommandPaletteMenuType.Toggle) {
        all[settingsEnum._Key] = settingsEnum._Default;
    }else {
        all[settingsEnum._Key] = options[settingsEnum._Default][1];
    }
    return all;
}, {highScores: {}});

const checkForLogin = () => {
    const token = localStorage.getItem("token");
    if(token) {
        return jwtDecode(token);
    }
    return null;
}

export const settingsLoaded = signal(false);

export const user = signal(checkForLogin());

const loadSettings = () => {
    const settings = localStorage.getItem("settings");
    if(settings) {
        return JSON.parse(settings);
    }
    return defaultSettings;
}

export const settings = signal(loadSettings());

const checkForOnlineSettings = async () => {
    if(user.value) {
        try {
            console.log("fetching settings")
            const result = await fetch(`${backendUrl()}/api/setting`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(result.status === 200) {
                const setting = await result.json();
                if(setting) {
                    settings.value = setting;
                }
            }
        } catch(e) {
            toast.error("Could not load settings from server")
            settings.value = defaultSettings;
            console.log(e)
        }
    }
    settingsLoaded.value = true;
}
// checkForOnlineSettings();


effect(async () => {
    if(user.value && settingsLoaded.value ) {
        try {
            await fetch(`${backendUrl()}/api/setting`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({setting: settings.value})
            })
        } catch(e) {
            toast.error("Could not save settings to server")
            console.log(e)
        }
    }
    localStorage.setItem("settings", JSON.stringify(settings.value))
})






export const highScores = signal(JSON.parse(localStorage.getItem(HIGH_SCORES_KEY) || "{}"));
effect(() => localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(highScores.value)))

const checkForOnlineHighScores = async () => {
    if(user.value) {
        try {
            const result = await fetch(`${backendUrl()}/api/result/highscore`, {
                method: "GET",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(result.status === 200) {
                const highscore = await result.json();
                console.log(highscore)
                if(highscore) {
                    highScores.value = highscore;
                }
            }
        } catch(e) {
            toast.error("Could not load highscores from server")
            console.log(e)
        }
    }
}
checkForOnlineHighScores();
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
export const showRowClearAnimation = signal(false);
export const bufferedQuote = signal(null);



getRandomQuote();

export const filterList = signal({});

export const sortList = signal(["tetrisScore"]);