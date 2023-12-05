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

export const commands = [{
    name: "Start Game",
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
    name: "Set Language English",
    command() {
      
    }
  },
  {
    name: "Set Language German",
    command() {
      
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