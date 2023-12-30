import { toast } from 'react-toastify';
import { typingDisplayStyle } from "../../helper/gameSignals";

export const typingDisplayStyleCommands = (setOpen) => [{
    name: "Fancy",
    command() {
      typingDisplayStyle.value = "fancy";
      toast("Typing display style set to fancy");
      setOpen(false);
    }
  },
  {
    name: "Simple",
    command() {
      typingDisplayStyle.value = "simple";
      toast("Typing display style set to simple");
      setOpen(false);
    },
  }];