import { toast } from "react-toastify";
import { textCasing } from "../../helper/gameSignals";

export const textCasingCommands = (setOpen) => [{
    name: "Mixed",
    command() {
        toast("Selected mixed text casing");
        textCasing.value = "mixed";
        setOpen(false);
    }
},
{
    name: "Lowercase",
    command() {
        toast("Selected lowercase text casing");
        textCasing.value = "lowercase";
        setOpen(false);
    },
},
{
    name: "Uppercase",
    command() {
        toast("Selected uppercase text casing");
        textCasing.value = "uppercase";
        setOpen(false);
    },
},
{
    name: "SCREAMING",
    command() {
        toast("Selected SCREAM text casing");
        textCasing.value = "screaming";
        setOpen(false);
    },
}];