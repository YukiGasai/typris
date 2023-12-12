import german from './german_1k.json';

export const getRandomWord = () => {
    const wordCount = german.words.length;
    const randomIndex = Math.floor(Math.random() * wordCount);
    return german.words[randomIndex];
}

export const getRandomWords = (count) => {
    let words = "";
    for (let i = 0; i < count; i++) {
        words += getRandomWord() + " ";
    }
    return words.trim();
}