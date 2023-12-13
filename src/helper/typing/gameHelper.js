import german_1k from './german_1k.json';
import german_10k from './german_10k.json';
import english_1k from './english_1k.json';
import english_10k from './english_10k.json';

export const getRandomWord = (language) => {
    switch (language) {
        case "german_1k":
            return german_1k.words[Math.floor(Math.random() * 1000)];
        case "german_10k":
            return german_10k.words[Math.floor(Math.random() * 10000)];
        case "english_1k":
            return english_1k.words[Math.floor(Math.random() * 1000)];
        case "english_10k":
            return english_10k.words[Math.floor(Math.random() * 10000)];
        default:
            return german_1k.words[Math.floor(Math.random() * 1000)];
    }
}

export const getRandomWords = (count, language = "") => {
    let words = "";
    for (let i = 0; i < count; i++) {
        words += getRandomWord(language) + " ";
    }
    return words.trim();
}