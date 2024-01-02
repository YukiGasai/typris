import CommandPalette from 'react-command-palette';
import MainCommandItem from './MainCommandItem';
import { useState } from 'react';
import { mainCommands } from './mainCommands';
import { useMouseTrap } from '../../hooks/useMouseTrap';
import { getSubCommands } from './generateSubCommandPallete';

const MyCommandPalette = () => {

    const [open, setOpen] = useState(false);
    const [commandList, setCommandList] = useState("");
    
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
          setOpen(true);
        }}
        commands={getCommandPaletteMenu(commandList)}
        open={open}
        maxDisplayed={100}
        onRequestClose={ () => {
          document.getElementById('tetrisGameContainer')?.focus()
          setCommandList("");
        }
        }
        renderCommand={MainCommandItem}
        hotKeys={["esc", "alt+d", "alt+l", "alt+s", "alt+k", "alt+u", "alt+t", "alt+a", "alt+c", "alt+i"]}
      />
    )
}

export default MyCommandPalette;