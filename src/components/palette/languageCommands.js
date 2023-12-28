import { toast } from 'react-toastify';
import { language } from '../../helper/gameSignals';

export const languageCommands = (setOpen) => [{
    name: "English 1k",
    command() {
      language.value = "english_1k";
      toast("Language set to english 1k");
      setOpen(false);
    }
  },
  {
    name: "English 10k",
    command() {
      language.value = "english_10k";
      toast("Language set to english 10k");
      setOpen(false);
    },
  },
  {
    name: "German 1k",
    command() {
      language.value = "german_1k";
      toast("Language set to german 1k");
      setOpen(false);        
    },
  },
  {
    name: "German 10k",
    command() {
      language.value = "german_10k";
      toast("Language set to german 10k");
      setOpen(false); 
    }
  }];
