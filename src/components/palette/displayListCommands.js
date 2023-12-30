import { toast } from 'react-toastify';
import { displayList } from '../../helper/gameSignals';

const getItem = (name, key) => ({
    name,
    state: displayList.value.includes(key),
    command() {
      if(displayList.value.includes(key)) {
        displayList.value.splice(displayList.value.indexOf(key), 1);
        toast(`Hiding ${name} display`);
      } else {
        displayList.value.push(key);
        toast(`Showing ${name} display`);
      }
      displayList.value = [...displayList.value];
    },
})

export const displayListCommands = () => [
    getItem("Typed Words", "typedWords"),
    getItem("Typing Level", "typingLevel"),
    getItem("Tetris Score", "tetrisScore"),
    getItem("Tetris Rows", "tetrisRows"),
    getItem("Tetris Level", "tetrisLevel"),
    getItem("Typing Error Rate", "typingErrorRate"),
    getItem("Typing Speed", "typingSpeed"),
];

