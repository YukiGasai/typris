import { tetrisInputConfig } from "../../helper/gameSignals";
import { toast } from "react-toastify"

export const tetrisInputCommands = (setOpen) => [{
    name: "HJKL Input",
    command: () => {
        tetrisInputConfig.value = "hjkl";
        toast("HJKL Tetris Input Selected")
        setOpen(false);
    }
},
{
    name: "WASD Input",
    command: () => {
        tetrisInputConfig.value = "wasd";
        toast("WASD Tetris Input Selected")
        setOpen(false);
    }
},
{
    name: "Arrow Input",
    command: () => {
        tetrisInputConfig.value = "arrow";
        toast("Arrow Keys Tetris Input Selected")
        setOpen(false);
    }
}
]