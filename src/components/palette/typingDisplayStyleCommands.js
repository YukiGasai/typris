import { toast } from 'react-toastify';
import { typingDisplayStyle } from "../../helper/gameSignals";
import { TypingDisplayStyleOptions } from '../../helper/constants';

export const typingDisplayStyleCommands = (setOpen) =>
  Object.entries(TypingDisplayStyleOptions)
    .filter(([key]) => key !== "_Key")
    .map(([key, value]) => (
      {
        name: key,
        command: () => {
          typingDisplayStyle.value = value;
          toast(`Typing display style set to ${key}`);
          setOpen(false);
        }
      }
    )
)