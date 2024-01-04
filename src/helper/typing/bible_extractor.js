const fs = require('fs')
const path = require('path')

const bible = fs.readFileSync(path.join(__dirname, 'bible.txt'), 'utf8');

const bibleArray = bible.split('\n\n');


const verses = bibleArray.filter((verse) => {
  return verse.match(/\d+:\d+/);
})

const bibleArrayWithoutNumbers = verses.map((verse) => {
  return verse.replace(/\d+:\d+ /, '').replace(/\n/, ' ');
})

const total = bibleArrayWithoutNumbers.length;

const totoalWords = bibleArrayWithoutNumbers.reduce((total, verse) => {
  return total + verse.split(' ').length;
}, 0);

const averageWordsPerVerse = totoalWords / total;


const shortVerses = bibleArrayWithoutNumbers.filter((verse) => {
  return verse.split(' ').length < 15;
})

fs.writeFileSync(path.join('bible_short.json'), JSON.stringify(shortVerses), 'utf8')

