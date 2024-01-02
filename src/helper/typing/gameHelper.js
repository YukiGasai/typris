import german_1k from './german_1k.json';
import german_10k from './german_10k.json';
import english_1k from './english_1k.json';
import english_10k from './english_10k.json';
import { quoteAuthor, settings, typingLevel } from "../gameSignals.js";
import { Language, TextCasing, TextSymbols } from '../settingsObjects.js';

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
    switch (settings.value[Language._Key]) {
        case Language['German 1k']:
            wordList = german_1k;
            break;
        case Language['German 10k']:
            wordList = german_10k;
            break;
        case Language['English 1k']:
            wordList = english_1k;
            break;
        case Language['English 10k']:
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
    
    const extraLanguageConfig = settings.value[TextSymbols._Key];

    if (randomSymbol && extraLanguageConfig.length > 0) {

        const symbolList = [];
        if (extraLanguageConfig.includes(TextSymbols['Text Symbols'])) {
            symbolList.push(...textSymbols);
        }
        if (extraLanguageConfig.includes(TextSymbols['Math Symbols'])) {
            symbolList.push(...mathSymbols);
        }
        if (extraLanguageConfig.includes(TextSymbols['Additional Symbols'])) {
            symbolList.push(...additionalSymbols);
        }
        if (extraLanguageConfig.includes(TextSymbols.Numbers)) {
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

    switch (settings.value[TextCasing._Key]) {
        case TextCasing.Lowercase:
            return word.toLowerCase();
        case TextCasing.Uppercase:
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();     
        case TextCasing.SCREAMING:
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
    if(settings.value[Language._Key] === Language['English Quotes']) {
        return (await getRandomQuote());
    }
    let words = "";
    for (let i = 0; i < count; i++) {
        words += getRandomWord() + " ";
    }
    return words.trim();
}