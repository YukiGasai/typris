import CommandPalette from 'react-command-palette';
import MainCommandItem from './MainCommandItem';
import { useState } from 'react';
import { mainCommands } from './mainCommands';
import { useMouseTrap } from '../../hooks/useMouseTrap';
import { getSubCommands } from './generateSubCommandPallete';
import * as SettingsObjects from '../../helper/settingsObjects';
import { cursorPosition, gameState, typingText } from '../../helper/gameSignals';
import { GameState } from '../../helper/constants';


const MyCommandPalette = () => {

    const [open, setOpen] = useState(false);
    const [commandList, setCommandList] = useState("");

    // Generate hotkey handlers for all main commands with hotkeys defined
    useMouseTrap(
      mainCommands(setOpen, setCommandList)
        .filter(cmd => cmd.hotkey)
        .map(cmd => ({
          handlerKey: cmd.hotkey.toLowerCase().replace(/ /g, ""),
          handlerCallback: cmd.command
        })),
    );

    const getCommandPaletteMenu = (menuName) => {
      if(menuName === "") {
        return mainCommands(setOpen, setCommandList).filter(command => command.condition === undefined || command.condition);
      }
      return getSubCommands(menuName, setOpen); 
    }

    return (
        <CommandPalette
        trigger={null}
        closeOnSelect={false}
        showSpinnerOnSelect={false}
        resetInputOnOpen
        resetCommandsOnOpen
        onAfterOpen={() => {
          if(gameState.value === GameState.Playing) {
            gameState.value = GameState.Paused;
          }
          setOpen(true);
        }}
        commands={getCommandPaletteMenu(commandList)}
        open={open}
        maxDisplayed={100}
        onRequestClose={ () => {
          if(gameState.value === GameState.Paused) {
            gameState.value = GameState.Playing;
          }
          if(cursorPosition.value === typingText.value.length){
            document.getElementById('tetrisGameContainer')?.focus()
          } else {
            document.getElementById('typeGameContainer')?.focus()
          }
          setCommandList("");
        }
        }
        renderCommand={MainCommandItem}
        hotKeys={["esc", 
        ...Object.keys(SettingsObjects)
        .map(key => SettingsObjects[key]) 
        .reduce((all, settingsObject) => {
          if(settingsObject._Hotkey) {
            all.push(settingsObject._Hotkey.toLowerCase().replace(/ /g, ""));
          }
          return all;
        }, [])]}
      />
    )
}

export default MyCommandPalette;