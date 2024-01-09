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

import styled, { useTheme } from 'styled-components';

export const openCommandPalette = signal(false);
export const commandList = signal("");

const MyCommandPalette = () => {

  const {colors, fonts} = useTheme();

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

  const customTheme = {
    modal: "custom-modal",
    overlay: "custom-overlay",
    header: "custom-header",
    container: "custom-container",
    content: "custom-content",
    containerOpen: "custom-containerOpen",
    input: "custom-input",
    inputOpen: "custom-inputOpen",
    inputFocused: "custom-inputFocused",
    spinner: "custom-spinner",
    suggestionsContainer: "custom-suggestionsContainer",
    suggestionsContainerOpen: "custom-suggestionsContainerOpen",
    suggestionsList: "custom-suggestionsList",
    suggestion: "custom-suggestion",
    suggestionFirst: "custom-suggestionFirst",
    suggestionHighlighted: "custom-suggestionHighlighted",
    trigger: "custom-trigger"
  }

  return (
    <>
    {/* Super stupid but the theme prop is overwritten if using styled component */}
    <style>
      {`
      .custom-modal {
      width: 605px;
      position: absolute;
      top: 80px;
      left: 50%;
      right: auto;
      bottom: auto;
      border: 0px none;
      background: ${colors.background};
      overflow: hidden;
      border-radius: 4px;
      outline: none;
      padding: 10px;
      box-shadow: rgb(0, 0, 0) 0px 2px 4px 0px;
      margin-right: -50%;
      transform: translate(-50%, 0px);
    }

    .custom-overlay {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      background-color: rgba(0, 0, 0, 0.75);
    }

    .custom-container {
      font-family: ${fonts.primary};
      font-weight: lighter;
      font-size: 12px;
      background-color: ${colors.background};
    }

    .custom-containerOpen {}

    .custom-input {
      font-size: 14px;
      border-radius: 4px;
      border: 2px solid ${colors.primary};
      width: 590px;
      padding: 6px;
      outline: none;
      background-color: ${colors.background};
      color: ${colors.primary};
      font-family: ${fonts.primary};
      caret-color: ${colors.primary};
    }

    .custom-inputOpen {}

    .custom-inputFocused {
      border: 2px solid ${colors.highlight};
      background-color: ${colors.background};
    }

    .custom-suggestionsContainer {}

    .custom-suggestionsContainerOpen {
      overflow: hidden;
      max-height: 315px;
      margin-top: 10px
    }

    .custom-suggestionsList {
      list-style: none;
      padding: 0;
      margin-bottom: 0;
      margin-top: 0
    }

    .custom-suggestion {
      color: #9da5b4;
      font-family: ${fonts.primary};
      border-bottom: 1px dotted ${colors.primary};
      border-top: 0px none;
      background-color: ${colors.background};
      padding: 14px 12px;
      cursor: pointer;
    }

    .custom-suggestion b {
      color: #598cef;
      font-weight: bold;
    }
    .custom-suggestionFirst {
    }

    .custom-suggestionHighlighted {
      background-color: ${colors.tertiary};
    }

    .custom-spinner {
      border-top: 0.4em solid rgba(255, 255, 255, 0.2);
      border-right: 0.4em solid rgba(255, 255, 255, 0.2);
      border-bottom: 0.4em solid rgba(255, 255, 255, 0.2);
      border-left: 0.4em solid rgb(255, 255, 255);
    }`}
    </style>
    <CommandPalette
      colors={colors}
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
      theme={customTheme}
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
    </>
  )
}

export default MyCommandPalette;