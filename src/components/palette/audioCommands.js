import { toast } from 'react-toastify';
import { soundType } from '../../helper/gameSignals';

export const audioCommands = (setOpen) => [{
    name: "Off",
    command() {
      toast("Sound turned off");
      soundType.value = "";
      setOpen(false); 
    }
  },
  {
    name: "Osu Sounds",
    command() {
      toast("Selected osu sounds");
      soundType.value = "osu";
      setOpen(false);
    },
  },
  {
    name: "Typewriter Sounds",
    command() {
      toast("Selected typewriter sounds");
      soundType.value = "typewriter";
      setOpen(false);
    },
  }];
