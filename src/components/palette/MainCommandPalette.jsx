import CommandPalette from 'react-command-palette';
import MainCommandItem from './MainCommandItem';
import { useState } from 'react';
import { languageCommands } from './languageCommands';
import { audioCommands } from './audioCommands';
import { difficultyCommands } from './difficultyCommands';
import { mainCommands } from './mainCommands';
import { useMouseTrap } from '../../hooks/useMouseTrap';
import { keyInputCommands } from './keyInputCommands';
import { displayListCommands } from './displayListCommands';
import { typingDisplayStyleCommands } from './typingDisplayStyleCommands';
import { alignCommands } from './alignCommands';
import { textCasingCommands } from './textCasingCommands';
import { tetrisInputCommands } from './tetrisInputComannds';

const MyCommandPalette = () => {

    const [open, setOpen] = useState(false);
    const [commandList, setCommandList] = useState("main");
    
    useMouseTrap("alt+r", () => { 
      mainCommands(setOpen, setCommandList)[0].command();
    });

    useMouseTrap("alt+p", () => { 
      mainCommands(setOpen, setCommandList)[1].command();
    });

    useMouseTrap("alt+l", () => { 
      mainCommands(setOpen, setCommandList)[3].command();      
    });

    useMouseTrap("alt+d", () => { 
      mainCommands(setOpen, setCommandList)[4].command();      
    });

    useMouseTrap("alt+s", () => { 
      mainCommands(setOpen, setCommandList)[5].command();      
    });

    useMouseTrap("alt+k", () => { 
      mainCommands(setOpen, setCommandList)[6].command();      
    });

    useMouseTrap("alt+u", () => { 
      mainCommands(setOpen, setCommandList)[7].command();      
    });

    useMouseTrap("alt+t", () => { 
      mainCommands(setOpen, setCommandList)[8].command();      
    });

    useMouseTrap("alt+q", () => { 
      mainCommands(setOpen, setCommandList)[9].command();      
    });

    useMouseTrap("alt+a", () => { 
      mainCommands(setOpen, setCommandList)[10].command();      
    });

    useMouseTrap("alt+c", () => { 
      mainCommands(setOpen, setCommandList)[11].command();      
    });

    useMouseTrap("alt+i", () => { 
      mainCommands(setOpen, setCommandList)[12].command();      
    });

      const getCommands = () => {
        switch(commandList) {
          case "main":
            return mainCommands(setOpen, setCommandList).filter(command => command.condition === undefined || command.condition);
          case "language":
            return languageCommands(setOpen);;
          case "difficulty":
            return difficultyCommands(setOpen);;
          case "audio":
            return audioCommands(setOpen);
          case "keyInputDisplay":
            return keyInputCommands(setOpen);
          case "displayList":
            return displayListCommands();
          case "typingDisplayStyle":
            return typingDisplayStyleCommands(setOpen);
          case "alignGame":
              return alignCommands(setOpen)
          case "textCasing":
              return textCasingCommands(setOpen)
          case "tetrisInputConfig":
              return tetrisInputCommands(setOpen);
          default:
            return mainCommands(setOpen, setCommandList);
        }
      }

    return (
        <CommandPalette
        trigger={null}
        closeOnSelect={false}
        showSpinnerOnSelect={false}
        resetInputOnOpen
        resetCommandsOnOpen
        onAfterOpen={() => {
          setOpen(true);
        }}
        commands={getCommands()}
        open={open}
        maxDisplayed={100}
        onRequestClose={ () => {
          document.getElementById('tetrisGameContainer')?.focus()
          setCommandList("main");
        }
        }
        renderCommand={MainCommandItem}
        hotKeys={["esc", "alt+d", "alt+l", "alt+s", "alt+k", "alt+u", "alt+t", "alt+a", "alt+c", "alt+i"]}
      />
    )
}

export default MyCommandPalette;