import { toast } from 'react-toastify';
import { keyInputDisplay } from "../../helper/gameSignals";

export const keyInputCommands = (setOpen) => [{
    name: "Hidden",
    command() {
      keyInputDisplay.value = "hidden";
      toast("Input display set to hidden");
      setOpen(false); 
    }
  },
  {
    name: "Horizontal",
    command() {
      keyInputDisplay.value = "horizontal";
      toast("Input display set to horizontal");
      setOpen(false); 
    },
  },
  {
    name: "Directional",
    command() {
      keyInputDisplay.value = "directional";
      toast("Input display set to directional");
      setOpen(false); 
    },
  }];
