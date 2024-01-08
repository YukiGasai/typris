import CommandPalette from 'react-command-palette';
import MainCommandItem from './MainCommandItem';
import { mainCommands } from './mainCommands';
import { useMouseTrap } from '../../hooks/useMouseTrap';
import { getSubCommands } from './generateSubCommandPallete';
import * as SettingsObjects from '../../helper/settingsObjects';
import { cursorPosition, gameState, typingText, user } from '../../helper/gameSignals';
import { GameState } from '../../helper/constants';
import { logout, startLogin } from '../../helper/authHelper';
import { signal } from '@preact/signals-react';
import { useTranslation } from 'react-i18next';

export const openCommandPalette = signal(false);
export const commandList = signal("");

const MyCommandPalette = () => {
  const { t } = useTranslation();
  // Generate hotkey handlers for all main commands with hotkeys defined
  useMouseTrap(
    mainCommands(t)
      .filter(cmd => cmd.hotkey)
      .map(cmd => ({
        handlerKey: cmd.hotkey.toLowerCase().replace(/ /g, ""),
        handlerCallback: cmd.command
      })),
  );

  const getCommandPaletteMenu = () => {
    if (commandList.value === "") {
      let commands = mainCommands(t).filter(command => command.condition === undefined || command.condition );
      if (user.value) {
        commands.push({
          name: t("Logout"),
          command: () => logout(),
        })
      } else {
        commands.push({
          name: t("Login Github"),
          command: () => startLogin("github"),
        });
        commands.push({
          name: t("Login Discord"),
          command: () => startLogin("discord"),
        });
        commands.push({
          name: t("Login Google"),
          command: () => startLogin("google"),
        });
        commands.push({
          name: t("Login Twitch"),
          command: () => startLogin("twitch"),
        });
      }
      return commands;
    }
    return getSubCommands(t);
  }
  return (
    <CommandPalette
      trigger={null}
      closeOnSelect={false}
      showSpinnerOnSelect={false}
      resetInputOnOpen
      onAfterOpen={() => {
        if (gameState.value === GameState.Playing) {
          gameState.value = GameState.Paused;
        }
        openCommandPalette.value = true;
      }}
      commands={getCommandPaletteMenu()}
      open={openCommandPalette.value}
      maxDisplayed={100}
      onRequestClose={() => {
        if (gameState.value === GameState.Paused) {
          gameState.value = GameState.Playing;
        }
        if (cursorPosition.value === typingText.value.length) {
          document.getElementById('tetrisGameContainer')?.focus()
        } else {
          document.getElementById('typeGameContainer')?.focus()
        }
        commandList.value = "";
        openCommandPalette.value = false;
      }
      }
      renderCommand={MainCommandItem}
      hotKeys={["esc",
        ...Object.keys(SettingsObjects)
          .map(key => SettingsObjects[key])
          .reduce((all, settingsObject) => {
            if (settingsObject._Hotkey) {
              all.push(settingsObject._Hotkey.toLowerCase().replace(/ /g, ""));
            }
            return all;
          }, [])]}
    />
  )
}

export default MyCommandPalette;