import german_1k from './german_1k.json';
import german_10k from './german_10k.json';
import english_1k from './english_1k.json';
import english_10k from './english_10k.json';
import { forceLowerCase, language, typingLevel } from "../gameSignals.js";

// min and max included 
function randomIntInRange(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getRandomWord = () => {

    let wordList;
    switch (language.value) {
        case "german_1k":
            wordList = german_1k;
            break;
        case "german_10k":
            wordList = german_10k;
            break;
        case "english_1k":
            wordList = english_1k;
            break;
        case "english_10k":
            wordList = english_10k;
            break;
        default:
            wordList = german_1k;
    }

    let maxWordLength = Object.keys(wordList).pop();
    if (maxWordLength >= typingLevel.value + 1) {
        maxWordLength = typingLevel.value + 1;
    }
    const wordLength = randomIntInRange(2, maxWordLength);
    const totalWordsWithLength = wordList[wordLength.toString()].length;
    const randomIndex = Math.floor(Math.random() * totalWordsWithLength);

    const word = wordList[wordLength][randomIndex];

    if(forceLowerCase.value) {
        return word.toLowerCase();
    }

    return wordList[wordLength][randomIndex];
}

export const getRandomWords = (count) => {
    let words = "";
    for (let i = 0; i < count; i++) {
        words += getRandomWord() + " ";
    }
    return words.trim();
}