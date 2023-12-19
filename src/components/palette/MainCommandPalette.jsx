import CommandPalette from 'react-command-palette';
import MainCommandItem from './MainCommandItem';
import { language } from '../../helper/gameSignals';

const MyCommandPalette = () => {

    const commandStartGame = () => {
        document.getElementById("startGameButton")?.click();
    }
    
    const commandGoToGithub =() => {
        document.location = "https://github.com/YukiGasai/vim-tutor"
    }
    
    const commandGoToImprint = () => {
        document.location = "/imprint"
    }
    
    const commandGoToIntro = () => {
        document.location = "/intro"
    }
    
    const commandGoToProfile = () => {
        document.location = "/profile"
    }
    
    const commandGoToHome = () => {
        document.location = "/"
    }
    
    const commands = [{
        name: "Start Game",
        shortcut: '⌘ Esc', 
        command() {
          commandStartGame();
        }
      },
      {
        name: "Pause Game",
        command() {
     
        }
      },
      {
        name: "Restart Game",
        command() {
          commandStartGame();
        }
      },
      {
        name: "Set Difficulty Low",
        command() {
          
        }
      },
      {
        name: "Set Difficulty Medium",
        command() {
          
        }
      },
      {
        name: "Set Difficulty Heigh",
        command() {
          
        }
      },
      {
        name: "Set Language English 1k",
        command() {
            language.value = "english_1k";
        }
      },
      {
        name: "Set Language English 10k",
        command() {
            language.value = "english_10k";
        }
      },
      {
        name: "Set Language German 1k",
        command() {
            language.value = "german_1k";
        }
      },
      {
        name: "Set Language German 10k",
        command() {
            language.value = "german_10k";
        }
      },
      {
        name: "Toggle Sound",
        command() {
          
        }
      },
      {
        name: "Go to Home",
        command() {
            commandGoToHome();
        }
      },
      {
        name: "Go to Profile",
        command() {
            commandGoToProfile();
        }
      },
      {
        name: "Go to Intro",
        command() {
            commandGoToIntro();
        }
      },
      {
        name: "Go to Imprint",
        command() {
            commandGoToImprint();
        }
      },
      {
        name: "Go to Github",
        command() {
            commandGoToGithub();
        }
      },
      {
        name: "Login",
        command() {
          
        }
      },
      {
        name: "Logout",
        command() {
          
        }
      },
      {
        name: "Show Hotkeys",
        command() {
          
        }
      },
      ];

    return (
        <CommandPalette
        trigger={<></>}
        commands={commands}
        closeOnSelect={true}
        resetInputOnOpen={true}
        resetCommandsOnOpen={true}
        maxDisplayed={100}
        onRequestClose={document.getElementById('tetrisGameContainer')?.focus()} //Todo use React ref to focus
        renderCommand={MainCommandItem}
        hotKeys={["command+shift+p","command+k", "esc"]}
      />
    )
}

export default MyCommandPalette;