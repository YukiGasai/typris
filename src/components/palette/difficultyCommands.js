import { toast } from 'react-toastify';
import { gameMode } from "../../helper/gameSignals";

export const difficultyCommands = (setOpen) => [{
    name: "Easy",
    command() {
      gameMode.value = "0";
      toast("Difficulty set to easy");
      setOpen(false); 
    }
  },
  {
    name: "Medium",
    command() {
      gameMode.value = "1";
      toast("Difficulty set to medium");
      setOpen(false); 
    },
  },
  {
    name: "Hard",
    command() {
      gameMode.value = "2";
      toast("Difficulty set to hard");
      setOpen(false); 
    },
  }];
