import { toast } from 'react-toastify';
import { alignGame } from '../../helper/gameSignals';

export const alignCommands = (setOpen) => [{
    name: "Align Left",
    command() {
        toast("Align game to the left");
        alignGame.value = "left";
        setOpen(false);
    }
},
{
    name: "Align Center",
    command() {
        toast("Align game to the center");
        alignGame.value = "center";
        setOpen(false);
    },
},
{
    name: "Align Right",
    command() {
        toast("Align game to the right");
        alignGame.value = "right";
        setOpen(false);
    },
}];
