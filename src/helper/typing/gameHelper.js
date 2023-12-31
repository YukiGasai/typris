import german_1k from './german_1k.json';
import german_10k from './german_10k.json';
import english_1k from './english_1k.json';
import english_10k from './english_10k.json';
import { extraLanguageConfig, language, quoteAuthor, textCasing, typingLevel } from "../gameSignals.js";

// min and max included 
function randomIntInRange(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const textSymbols = ["!", "?", ".", ",", ":", ";", "-", "\"", "'"];
const mathSymbols = ["+", "-", "*", "/", "=", "<", ">", "%", "^", "(", ")"];
const additionalSymbols = ["@", "#", "$", "&", "_", "`", "~", "|" , "{", "}", "[", "]", "/"];
const numberSymbols = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

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


    const randomSymbol = Math.random() < 0.2;
    // Select random symbol from  the activated lists
    console.log(extraLanguageConfig.value)
    if (randomSymbol && extraLanguageConfig.value.length > 0) {

        const symbolList = [];
        if (extraLanguageConfig.value.includes("text symbols")) {
            symbolList.push(...textSymbols);
        }
        if (extraLanguageConfig.value.includes("math symbols")) {
            symbolList.push(...mathSymbols);
        }
        if (extraLanguageConfig.value.includes("additional symbols")) {
            symbolList.push(...additionalSymbols);
        }
        if (extraLanguageConfig.value.includes("numbers")) {
            symbolList.push(...numberSymbols)
        }
        let word = "";
        for(let i = wordLength; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * symbolList.length);
            word += symbolList[randomIndex];
        }
        return word;
    }


    const totalWordsWithLength = wordList[wordLength.toString()].length;
    const randomIndex = Math.floor(Math.random() * totalWordsWithLength);

    const word = wordList[wordLength][randomIndex];

    switch (textCasing.value) {
        case "lowercase":
            return word.toLowerCase();
        case "uppercase":
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();     
        case "screaming":
            return word.toUpperCase();       
        default:
            return word;
    }
}

const getRandomQuote = async () => {
    // Get the max quote length by calculating the typing level. It must be possible to type the quote in the time a tetris piece is falling
    const quoteLength = Math.floor((typingLevel.value + 1) * 2.5 + 20);

    const res = await fetch(`https://api.quotable.io/quotes/random?limit=1&maxLength=${quoteLength}`)
    const quote = await res.json();
    const quoteText = quote[0].content;
    quoteAuthor.value = quote[0].author;
    return quoteText;
}

export const getRandomWords = async (count) => {
    if(language.value === "english_quotes") {
        return (await getRandomQuote());
    }
    let words = "";
    for (let i = 0; i < count; i++) {
        words += getRandomWord() + " ";
    }
    return words.trim();
}