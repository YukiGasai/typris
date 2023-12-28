import { toast } from 'react-toastify';
import { autoSwitch } from '../../helper/gameSignals';


export const mainCommands = (setOpen, setCommandList) => [{
    name: "Start Game",
    shortcut: 'Alt + R',
    command() {
        document.getElementById("startGameButton")?.click();
        setOpen(false);
    }
},
{
    name: "Pause Game",
    command() {
        //TODO: pause game
        setOpen(false);
    }
},
{
    name: "Restart Game",
    shortcut: 'Alt + R',
    command() {
        document.getElementById("startGameButton")?.click();
        setOpen(false);
    }
},
{
    name: "Select Language",
    shortcut: 'Alt + L',
    command() {
        setCommandList("language");
    }
},
{
    name: "Select Difficulty",
    shortcut: 'Alt + D',
    command() {
        setCommandList("difficulty");
    }
},
{
    name: "Select Sound",
    shortcut: 'Alt + S',
    command() {
        setCommandList("audio");
    }
},
{
    name: "Set Key Input Display",
    shortcut: 'Alt + K',
    command() {
        setCommandList("keyInputDisplay");
    }
},
{
    name: "Go to Home",
    command() {
        document.location = "/"
        setOpen(false);
    }
},
{
    name: "Go to Profile",
    command() {
        document.location = "#profile"
        setOpen(false);
    }
},
{
    name: "Go to Intro",
    command() {
        document.location = "#intro"
        setOpen(false);
    }
},
{
    name: "Go to Imprint",
    command() {
        document.location = "#imprint"
        setOpen(false);
    }
},
{
    name: "Go to Github",
    command() {
        document.location = "https://github.com/YukiGasai/vim-tutor"
        setOpen(false);
    }
},
{
    name: "Login",
    command() {
        setOpen(false);
    }
},
{
    name: "Logout",
    command() {
        setOpen(false);
    }
},
{
    name: "Show Hotkeys",
    command() {
        setOpen(false);
    }
},
{
    name: "Toggle Auto Switch",
    command() {
        autoSwitch.value = !autoSwitch.value;
        if (autoSwitch.value) {
            toast("Auto switch enabled");
        } else {
            toast("Auto switch disabled");
        }
        setOpen(false);
    }
}];
