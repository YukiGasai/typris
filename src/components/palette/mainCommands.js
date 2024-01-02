import { gameState } from '../../helper/gameSignals';
import { GameState } from '../../helper/constants';
import * as SettingsObjects from '../../helper/settingsObjects';

export const mainCommands = (setOpen, setCommandList) => [
{
    name: "Start Game",
    hotkey: 'Alt + R',
    condition: gameState.value !== GameState.Playing && gameState.value !== GameState.Paused,
    command() {
        document.getElementById("startGameButton")?.click();
        setOpen(false);
    }
},
{
    name: gameState.value === GameState.Paused ? "Resume Game" : "Pause Game",
    hotkey: 'Alt + P',
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
    hotkey: 'Alt + R',
    command() {
        document.getElementById("startGameButton")?.click();
        setOpen(false);
    }
},
{
    name: "Quit Game",
    hotkey: 'Alt + Q',
    condition: gameState.value === GameState.Playing || gameState.value !== GameState.Paused,
    command() {
        document.getElementById("endGameButton")?.click();
        setOpen(false);
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
// Load settings commands dynamically
...Object.keys(SettingsObjects).map(key => SettingsObjects[key]).map(settingsObject => ({
    name: `Change ${settingsObject._Name}`,
    hotkey: settingsObject._Hotkey,
    command() {
        setCommandList(settingsObject);
    }
})),
]
//.filter(command => command.condition === undefined || command.condition);
