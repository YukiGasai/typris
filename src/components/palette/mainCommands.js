import { endButtonAction, gameState, settings, user } from '../../helper/gameSignals';
import { GameState } from '../../helper/constants';
import * as SettingsObjects from '../../helper/settingsObjects';
import { commandList, openCommandPalette } from './MainCommandPalette';

export const mainCommands = (t) => [
{
    name: t("Start Game"),
    hotkey: 'Alt + R',
    condition: gameState.value !== GameState.Playing && gameState.value !== GameState.Paused,
    command() {
        document.getElementById("startGameButton")?.click();
        openCommandPalette.value = false;
    }
},
{
    name: t("Restart Game"),
    hotkey: 'Alt + R',
    command() {
        endButtonAction.value = "restart";
        document.getElementById("startGameButton")?.click();
        openCommandPalette.value = false;
    }
},
{
    name: t("Quit Game"),
    hotkey: 'Alt + Q',
    condition: gameState.value === GameState.Playing || gameState.value === GameState.Paused,
    command() {
        endButtonAction.value = "end";
        document.getElementById("startGameButton")?.click();
        openCommandPalette.value = false;
    }
},
{
    name: t("Go to Home"),
    command() {
        document.location = "/"
        openCommandPalette.value = false;
    }
},
{
    name: t("Go to Profile"),
    command() {
        document.location = "#profile"
        openCommandPalette.value = false;
    }
},
{
    name: t("Go to Intro"),
    command() {
        document.location = "#intro"
        openCommandPalette.value = false;
    }
},
{
    name: t("Go to Books"),
    condition: user.value !== null,
    command() {
        document.location = "#books"
        openCommandPalette.value = false;
    }
},
{
    name: t("Go to Imprint"),
    command() {
        document.location = "#imprint"
        openCommandPalette.value = false;
    }
},
{
    name: t("Go to Settings"),
    command() {
        document.location = "#settings"
        openCommandPalette.value = false;
    }
},
{
    name: t("Go to Github"),
    command() {
        document.location = "https://github.com/YukiGasai/typris"
        openCommandPalette.value = false;
    }
},
{
    name: t("Go to Stats"),
    command() {
        document.location = "#stats"
        openCommandPalette.value = false;
    }
},
{
    name: t("Share Results"),
    hotkey: 'Alt + Shift + S',
    condition: gameState.value === GameState.Over,
    command() {
        document.getElementById("shareResultsButton")?.click();
        openCommandPalette.value = false;
    }
},
// Load settings commands dynamically
...Object.keys(SettingsObjects).map(key => SettingsObjects[key]).map(settingsObject => ({
    name: `${t('Change')} ${settingsObject._Name[settings.value[SettingsObjects.DisplayLanguage._Key]]}`,
    hotkey: settingsObject._Hotkey,
    condition: settingsObject._Condition, 
    command() {
        commandList.value = settingsObject;
    }
})),
]
//.filter(command => command.condition === undefined || command.condition);
