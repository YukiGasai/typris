import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import * as SettingsObjects from '../helper/settingsObjects';


// Helper funktion to get all options for the settings objects to use in the translation file (not used anymore) only ran once to get the options and translate manually
// const getSettingsOptions = (type) => {
//   let options = "";
  
//   for(const objectName of Object.keys(SettingsObjects)) {

//     const settingsObject = SettingsObjects[objectName];

//     if(settingsObject._Key === SettingsObjects.SoundVolume._Key) continue;

//     for(const key in settingsObject) {
//       if(key.startsWith("_")) continue;
//       const name = `[SettingsObjects.${objectName}["${key}"]]`

//       options+=`
//       ${name}: "${key}",`
//     }

//   }

//   console.log(options)

//   return options
// }

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translation: {
          //Intro Page
          'introTitle': "How to play",
          'introText': "This game is about typing words while playing tetris. Every time you get a new piece you have to enter the word displayed above before the tetris piece hits the bottom. If the piece hits the bottom before you typed the word you get a error row. The usual tetris rules apply.",
          'playButton': "Play",
          'loginButton': "Login",
          'introTypingTitle': "10 Finger Typing",
          'introTypingText': "10 Finger Typing is a typing technique that uses all 10 fingers and is the most efficient way to type. It is recommended to learn this technique to get the most out of this game. You can learn it for free on the following websites:",

          //Main Page
          //Controls
          'controlsLeft': "Left",
          'controlsRight': "Right",
          'controlsRotate': "Rotate",
          'controlsDown': "Down",

          // ...getSettingsOptions(),
          [SettingsObjects.AlignGame["Left"]]: "Left",
          [SettingsObjects.AlignGame["Center"]]: "Center",
          [SettingsObjects.AlignGame["Right"]]: "Right",
          [SettingsObjects.Confetti["Game End"]]: "Game End",
          [SettingsObjects.Confetti["Row Clear"]]: "Row Clear",
          [SettingsObjects.Confetti["Highscore"]]: "Highscore",
          [SettingsObjects.Difficulty["Easy"]]: "Easy",
          [SettingsObjects.Difficulty["Medium"]]: "Medium",
          [SettingsObjects.Difficulty["Hard"]]: "Hard",
          [SettingsObjects.DisplayLanguage["English"]]: "English",
          [SettingsObjects.DisplayLanguage["German"]]: "German",
          [SettingsObjects.KeyInputDisplay["Horizontal"]]: "Horizontal",
          [SettingsObjects.KeyInputDisplay["Directional"]]: "Directional",
          [SettingsObjects.KeyInputDisplay["Off"]]: "Off",
          [SettingsObjects.Language["German 1k"]]: "German 1k",
          [SettingsObjects.Language["German 10k"]]: "German 10k",
          [SettingsObjects.Language["English 1k"]]: "English 1k",
          [SettingsObjects.Language["English 10k"]]: "English 10k",
          [SettingsObjects.Language["English Quotes"]]: "English Quotes",
          [SettingsObjects.Language["English Bible"]]: "English Bible",
          [SettingsObjects.SoundEffect["Typing"]]: "Typing",
          [SettingsObjects.SoundEffect["Typing Error"]]: "Typing Error",
          [SettingsObjects.SoundEffect["Row Clear"]]: "Row Clear",
          [SettingsObjects.SoundEffect["Move"]]: "Move",
          [SettingsObjects.SoundEffect["Rotate"]]: "Rotate",
          [SettingsObjects.SoundEffect["Drop"]]: "Drop",
          [SettingsObjects.SoundEffect["Game End"]]: "Game End",
          [SettingsObjects.SoundEffect["Error Row"]]: "Error Row",
          [SettingsObjects.StatDisplay["Typed Words"]]: "Typed Words",
          [SettingsObjects.StatDisplay["Typing Level"]]: "Typing Level",
          [SettingsObjects.StatDisplay["Tetris Score"]]: "Tetris Score",
          [SettingsObjects.StatDisplay["Tetris Rows"]]: "Tetris Rows",
          [SettingsObjects.StatDisplay["Tetris Level"]]: "Tetris Level",
          [SettingsObjects.StatDisplay["Typing Error Rate"]]: "Typing Error Rate",
          [SettingsObjects.StatDisplay["Typing Speed"]]: "Typing Speed",
          [SettingsObjects.StatsFilter["Difficulty Easy"]]: "Difficulty Easy",
          [SettingsObjects.StatsFilter["Difficulty Medium"]]: "Difficulty Medium",
          [SettingsObjects.StatsFilter["Difficulty Hard"]]: "Difficulty Hard",
          [SettingsObjects.StatsFilter["Language German 1k"]]: "Language German 1k",
          [SettingsObjects.StatsFilter["Language German 10k"]]: "Language German 10k",
          [SettingsObjects.StatsFilter["Language English 1k"]]: "Language English 1k",
          [SettingsObjects.StatsFilter["Language English 10k"]]: "Language English 10k",
          [SettingsObjects.StatsFilter["Language English Quotes"]]: "Language English Quotes",
          [SettingsObjects.StatsFilter["Language English Bible"]]: "Language English Bible",
          [SettingsObjects.StatsFilter["Symbols Numbers"]]: "Symbols Numbers",
          [SettingsObjects.StatsFilter["Symbols Text Symbols"]]: "Symbols Text Symbols",
          [SettingsObjects.StatsFilter["Symbols Math Symbols"]]: "Symbols Math Symbols",
          [SettingsObjects.StatsFilter["Symbols Additional Symbols"]]: "Symbols Additional Symbols",
          [SettingsObjects.StatsSort["Tetris Score"]]: "Tetris Score",
          [SettingsObjects.StatsSort["Tetris Rows"]]: "Tetris Rows",
          [SettingsObjects.StatsSort["Error Rows"]]: "Error Rows",
          [SettingsObjects.StatsSort["Typed Words"]]: "Typed Words",
          [SettingsObjects.StatsSort["Words Per Minute"]]: "Words Per Minute",
          [SettingsObjects.TetrisControl["HJKL"]]: "HJKL",
          [SettingsObjects.TetrisControl["WASD"]]: "WASD",
          [SettingsObjects.TetrisControl["Arrows"]]: "Arrows",
          [SettingsObjects.TextCasing["Mixed"]]: "Mixed",
          [SettingsObjects.TextCasing["Lowercase"]]: "Lowercase",
          [SettingsObjects.TextCasing["Uppercase"]]: "Uppercase",
          [SettingsObjects.TextCasing["SCREAMING"]]: "SCREAMING",
          [SettingsObjects.TextSymbols["Numbers"]]: "Numbers",
          [SettingsObjects.TextSymbols["Text Symbols"]]: "Text Symbols",
          [SettingsObjects.TextSymbols["Math Symbols"]]: "Math Symbols",
          [SettingsObjects.TextSymbols["Additional Symbols"]]: "Additional Symbols",
          [SettingsObjects.Theme["Paper"]]: "Paper",
          [SettingsObjects.Theme["Github"]]: "Github",
          [SettingsObjects.Theme["Catppuccin"]]: "Catppuccin",
          [SettingsObjects.Theme["Drakula"]]: "Drakula",
          [SettingsObjects.Theme["Vaporwave"]]: "Vaporwave",
          [SettingsObjects.Theme["Cotton Candy"]]: "Cotton Candy",
          [SettingsObjects.TypingDisplayStyle["Fancy"]]: "Fancy",
          [SettingsObjects.TypingDisplayStyle["Simple"]]: "Simple",
          [SettingsObjects.TypingSound["Typewriter"]]: "Typewriter",
          [SettingsObjects.TypingSound["Osu"]]: "Osu",
          [SettingsObjects.TypingSound["Off"]]: "Off",
          
          'on': "On",


          //Game Over Screen
          'Game Over': "Game Over",
          "restartMessage": "Press Alt + R to restart the game",


          //Settings
          logoutMessage: "Log out of your account to store your stats locally.",
          loginMessage: "Log in to your account to track your stats online.",

          'resetSettingsMessage': "This action can not be undone. Please be sure before pressing the reset button.",

        }
      },
      de: {
        translation: {
          //Intro Page
          'introTitle': "Spieleinführung",
          'introText': "Bei diesem Spiel geht es darum, Wörter zu tippen, während man Tetris spielt. Jedes Mal, wenn du einen neuen Stein bekommst, musst du das oben angezeigte Wort eingeben, bevor der Stein den Boden berührt. Wenn der Stein den Boden berührt, bevor du das Wort eingegeben hast, erhältst du eine Fehlerzeile. Es gelten die üblichen Tetris-Regeln.",
          'playButton': "Spielen",
          'loginButton': "Anmelden",

          'introTypingTitle': "10 Finger Tippen",
          'introTypingText': "10 Finger Tippen ist eine Schreibtechnik, die alle 10 Finger verwendet und die effizienteste Art zu tippen ist. Es wird empfohlen, diese Technik zu erlernen, um das Beste aus diesem Spiel herauszuholen. Du kannst es kostenlos auf den folgenden Websites lernen:",

          //Main Page
          //Controls
          'controlsLeft': "Links",
          'controlsRight': "Rechts",
          'controlsRotate': "Rotieren",
          'controlsDown': "Fallen",
          'Toggle control': "Fokus wechseln",
          'controlsRestart': "Neustart",
          'controlsPalette': "Komanndo Palette",       
                  

          [SettingsObjects.AlignGame["Left"]]: "Links",
          [SettingsObjects.AlignGame["Center"]]: "Zentrum",
          [SettingsObjects.AlignGame["Right"]]: "Rechts",
          [SettingsObjects.Confetti["Game End"]]: "Spielende",
          [SettingsObjects.Confetti["Row Clear"]]: "Reihe gelöscht",
          [SettingsObjects.Confetti["Highscore"]]: "Höchstpunktzahl",
          [SettingsObjects.Difficulty["Easy"]]: "Einfach",
          [SettingsObjects.Difficulty["Medium"]]: "Mittel",
          [SettingsObjects.Difficulty["Hard"]]: "Schwer",
          [SettingsObjects.DisplayLanguage["English"]]: "Englisch",
          [SettingsObjects.DisplayLanguage["German"]]: "Deutsch",
          [SettingsObjects.KeyInputDisplay["Horizontal"]]: "Horizontal",
          [SettingsObjects.KeyInputDisplay["Directional"]]: "Richtungsweisend",
          [SettingsObjects.KeyInputDisplay["Off"]]: "Aus",
          [SettingsObjects.Language["German 1k"]]: "Deutsch 1k",
          [SettingsObjects.Language["German 10k"]]: "Deutsch 10k",
          [SettingsObjects.Language["English 1k"]]: "Englisch 1k",
          [SettingsObjects.Language["English 10k"]]: "Englisch 10k",
          [SettingsObjects.Language["English Quotes"]]: "Englische Zitate",
          [SettingsObjects.Language["English Bible"]]: "Englische Bibel",
          [SettingsObjects.SoundEffect["Typing"]]: "Tippen",
          [SettingsObjects.SoundEffect["Typing Error"]]: "Tippfehler",
          [SettingsObjects.SoundEffect["Row Clear"]]: "Reihe gelöscht",
          [SettingsObjects.SoundEffect["Move"]]: "Bewegen",
          [SettingsObjects.SoundEffect["Rotate"]]: "Drehen",
          [SettingsObjects.SoundEffect["Drop"]]: "Fallen lassen",
          [SettingsObjects.SoundEffect["Game End"]]: "Spielende",
          [SettingsObjects.SoundEffect["Error Row"]]: "Fehlerreihe",
          [SettingsObjects.StatDisplay["Typed Words"]]: "Getippte Wörter",
          [SettingsObjects.StatDisplay["Typing Level"]]: "Tippstufe",
          [SettingsObjects.StatDisplay["Tetris Score"]]: "Tetris Punktzahl",
          [SettingsObjects.StatDisplay["Tetris Rows"]]: "Tetris Reihen",
          [SettingsObjects.StatDisplay["Tetris Level"]]: "Tetris Stufe",
          [SettingsObjects.StatDisplay["Typing Error Rate"]]: "Tippfehlerquote",
          [SettingsObjects.StatDisplay["Typing Speed"]]: "Tippgeschwindigkeit",
          [SettingsObjects.StatsFilter["Difficulty Easy"]]: "Schwierigkeit Einfach",
          [SettingsObjects.StatsFilter["Difficulty Medium"]]: "Schwierigkeit Mittel",
          [SettingsObjects.StatsFilter["Difficulty Hard"]]: "Schwierigkeit Schwer",
          [SettingsObjects.StatsFilter["Language German 1k"]]: "Sprache Deutsch 1k",
          [SettingsObjects.StatsFilter["Language German 10k"]]: "Sprache Deutsch 10k",
          [SettingsObjects.StatsFilter["Language English 1k"]]: "Sprache Englisch 1k",
          [SettingsObjects.StatsFilter["Language English 10k"]]: "Sprache Englisch 10k",
          [SettingsObjects.StatsFilter["Language English Quotes"]]: "Sprache Englische Zitate",
          [SettingsObjects.StatsFilter["Language English Bible"]]: "Sprache Englische Bibel",
          [SettingsObjects.StatsFilter["Symbols Numbers"]]: "Symbole Zahlen",
          [SettingsObjects.StatsFilter["Symbols Text Symbols"]]: "Symbole Textsymbole",
          [SettingsObjects.StatsFilter["Symbols Math Symbols"]]: "Symbole Mathematische Symbole",
          [SettingsObjects.StatsFilter["Symbols Additional Symbols"]]: "Symbole Zusätzliche Symbole",
          [SettingsObjects.StatsSort["Tetris Score"]]: "Tetris Punktzahl",
          [SettingsObjects.StatsSort["Tetris Rows"]]: "Tetris Reihen",
          [SettingsObjects.StatsSort["Error Rows"]]: "Fehlerreihen",
          [SettingsObjects.StatsSort["Typed Words"]]: "Getippte Wörter",
          [SettingsObjects.StatsSort["Words Per Minute"]]: "Wörter pro Minute",
          [SettingsObjects.TetrisControl["HJKL"]]: "HJKL",
          [SettingsObjects.TetrisControl["WASD"]]: "WASD",
          [SettingsObjects.TetrisControl["Arrows"]]: "Pfeile",
          [SettingsObjects.TextCasing["Mixed"]]: "Gemischt",
          [SettingsObjects.TextCasing["Lowercase"]]: "Kleinbuchstaben",
          [SettingsObjects.TextCasing["Uppercase"]]: "Großbuchstaben",
          [SettingsObjects.TextCasing["SCREAMING"]]: "SCHREIEND",
          [SettingsObjects.TextSymbols["Numbers"]]: "Zahlen",
          [SettingsObjects.TextSymbols["Text Symbols"]]: "Textsymbole",
          [SettingsObjects.TextSymbols["Math Symbols"]]: "Mathematische Symbole",
          [SettingsObjects.TextSymbols["Additional Symbols"]]: "Zusätzliche Symbole",
          [SettingsObjects.Theme["Paper"]]: "Papier",
          [SettingsObjects.Theme["Github"]]: "Github",
          [SettingsObjects.Theme["Catppuccin"]]: "Catppuccin",
          [SettingsObjects.Theme["Drakula"]]: "Drakula",
          [SettingsObjects.Theme["Vaporwave"]]: "Vaporwave",
          [SettingsObjects.Theme["Cotton Candy"]]: "Zuckerwatte",
          [SettingsObjects.TypingDisplayStyle["Fancy"]]: "Ausgefallen",
          [SettingsObjects.TypingDisplayStyle["Simple"]]: "Einfach",
          [SettingsObjects.TypingSound["Typewriter"]]: "Schreibmaschine",
          [SettingsObjects.TypingSound["Osu"]]: "Osu",
          [SettingsObjects.TypingSound["Off"]]: "Aus",

          "on": "An",
          "enabled": "aktiviert",
          "disabled": "deaktiviert",
          "Removed": "Entfernt",
          "Added": "Hinzugefügt",
          "from": "von",
          "to": "zu",
          "set to": "auf",
          "Change": "Ändere",
          "Start Game": "Spiel starten",
          "Restart Game": "Spiel neustarten",
          "Quit Game": "Spiel beenden",
          "Go to Home": "Gehe zur Startseite",
          "Go to Profile": "Gehe zum Profil",
          "Go to Intro": "Gehe zur Spieleinführung",
          "Go to Imprint": "Gehe zum Impressum",
          "Go to Settings": "Gehe zu den Einstellungen",
          "Go to Github": "Gehe zu Github",
          "Go to Stats": "Gehe zu den Statistiken",
          "Share Results": "Teile das Ergebniss",
          "Logout": "Abmelden",
          "Login Github": "Mit Github anmelden",
          "Login Google": "Mit Google anmelden",
          "Login Discord": "Mit Discord anmelden",
          "Login Twitch": "Mit Twitch anmelden",

          "Resume": "Fortsetzen",
          "Command pallet": "Kommando Palette",


          //Game Over Screen
          "Game Over": "Spiel Beendet",
          "restartMessage": "Drücke Alt + R um das Spiel neuzustarten",
          "Score": "Punktzahl",
          "Tetris Stats": "Tetris Statistiken",
          "Typing Stats": "Tipp Statistiken",
          "Rows": "Reihen",
          "Level": "Stufe",
          "Words": "Wörter",
          "WPM": "WPM",
          "Accuracy": "Genauigkeit",
          "Anonymous": "Anonym",
          "Restart": "Neustart",
          "Stats": "Statistiken",
          "Share": "Teilen",
          "Settings": "Einstellungen",

          //Settings
          "Search": "Suchen",
          "Account": "Konto",
          logoutMessage: "Melde dich von deinem Konto ab, um deine Statistiken lokal zu speichern.",
          loginMessage: "Melde dich bei deinem Konto an, um deine Statistiken online zu speichern.",

          'Reset Settings': "Einstellungen zurücksetzen",
          'resetSettingsMessage': "Diese Aktion kann nicht rückgängig gemacht werden. Bitte sei dir sicher, bevor du den Zurücksetzen-Button drückst.",
          'Reset': "Zurücksetzen",
          'Setting reset was successful': "Einstellungen wurden erfolgreich zurückgesetzt",
          'Setting reset failed': "Einstellungen konnten nicht zurückgesetzt werden",


          //Stats menu

          'You need to be logged in to compare stats': "Du musst angemeldet sein, um Statistiken zu vergleichen",
          'Could not load names': "Namen konnten nicht geladen werden",
          'Could not load global high scores': "Globale Höchstpunktzahlen konnten nicht geladen werden",
          'Could not load result history': "Ergebnisverlauf konnte nicht geladen werden",
          'Could not load high scores': "Höchstpunktzahlen konnten nicht geladen werden",

          'User': "Benutzer",
          'Global High Scores': "Globale Höchstpunktzahlen",
          'Tetris Score': "Tetris Punktzahl",
          'Tetris Rows': "Tetris Reihen",
          'Error Rows': "Fehlerreihen",
          'Typed Words': "Getippte Wörter",
          'Personal Stats': "Persönliche Statistiken",
          'Words per minute': "Wörter pro Minute",
          'Compare': "Vergleichen",

          'No personal high scores yet': "Noch keine persönlichen Höchstpunktzahlen", 
          'No attempt history yet': "Noch kein Versuchsverlauf",
          'Search for name': "Suche nach Namen",
          
        }
      }
    },
    fallbackLng: "en",
    debug: false,

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
