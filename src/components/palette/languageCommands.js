import { toast } from 'react-toastify';
import { extraLanguageConfig, language } from '../../helper/gameSignals';

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
    name: "English Quotes (Hard)",
    command() {
      language.value = "english_quotes";
      toast("Language set to english quotes");
      setOpen(false); 
    }
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
  },
  {
    name: "Add Numbers",
    state: extraLanguageConfig.value.includes("numbers"),
    command() {
      if(extraLanguageConfig.value.includes("numbers")) {
        extraLanguageConfig.value = extraLanguageConfig.value.filter(item => item !== "numbers");
        toast("Removed numbers from text");
      } else {
        extraLanguageConfig.value = [...extraLanguageConfig.value, "numbers"];
        toast("Add numbers from text");
      }
    }
  },
  {
    name: "Add text Symbols",
    state: extraLanguageConfig.value.includes("text symbols"),
    command() {
      if(extraLanguageConfig.value.includes("text symbols")) {
        extraLanguageConfig.value = extraLanguageConfig.value.filter(item => item !== "text symbols");
        toast("Removed text symbols from text");
      } else {
        extraLanguageConfig.value = [...extraLanguageConfig.value, "text symbols"];
        toast("Add text symbols from text");
      }
    }
  },
  {
    name: "Add math Symbols",
    state: extraLanguageConfig.value.includes("math symbols"),
    command() {
      if(extraLanguageConfig.value.includes("math symbols")) {
        extraLanguageConfig.value = extraLanguageConfig.value.filter(item => item !== "math symbols");
        toast("Removed math symbols from text");
      } else {
        extraLanguageConfig.value = [...extraLanguageConfig.value, "math symbols"];
        toast("Add math symbols from text");
      }
    }
  },
  {
    name: "Add additional Symbols",
    state: extraLanguageConfig.value.includes("additional symbols"),
    command() {
      if(extraLanguageConfig.value.includes("additional symbols")) {
        extraLanguageConfig.value = extraLanguageConfig.value.filter(item => item !== "additional symbols");
        toast("Removed additional symbols from text");
      } else {
        extraLanguageConfig.value = [...extraLanguageConfig.value, "additional symbols"];
        toast("Add additional symbols from text");
      }
    }
  }
];
