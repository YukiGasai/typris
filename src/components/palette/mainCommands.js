import { toast } from 'react-toastify';
import { autoSwitch, gameState } from '../../helper/gameSignals';
import { GameState } from '../../helper/constants';


export const mainCommands = (setOpen, setCommandList) => [{
    name: "Start Game",
    shortcut: 'Alt + R',
    condition: gameState.value !== GameState.Playing && gameState.value !== GameState.Paused,
    command() {
        document.getElementById("startGameButton")?.click();
        setOpen(false);
    }
},
{
    name: gameState.value === GameState.Paused ? "Resume Game" : "Pause Game",
    shortcut: 'Alt + P',
    condition: gameState.value === GameState.Playing || gameState.value === GameState.Paused,
    command() {
        if(gameState.value === GameState.Paused) {
            gameState.value = GameState.Playing;
        } else if(gameState.value === GameState.Playing) {
            gameState.value = GameState.Paused;
        }
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
    name: "Select UI Items",
    shortcut: 'Alt + U',
    command() {
        setCommandList("displayList");
    }
},
{
    name: "Select Typing Display Style",
    shortcut: 'Alt + T',
    command() {
        setCommandList("typingDisplayStyle");
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
    name: "Go to Stats",
    command() {
        document.location = "#stats"
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
}].filter(command => command.condition === undefined || command.condition);
