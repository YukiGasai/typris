import './App.css';
import Footer from './components/pages/Footer';
import Header from './components/pages/Header';
import MainPage from './components/pages/MainPage';
import CommandPalette from 'react-command-palette';


const commands = [{
  name: "Open Github",
  command() {
    window.location = "https://github.com/asabaylus/react-command-palette"
  }
},{
  name: "Start Game1",
  command() {
    alert("MOIN");
  }
},
{
  name: "Start Game2",
  command() {
    alert("MOIN");
  }
},
{
  name: "Start Game3",
  command() {
    alert("MOIN");
  }
},
{
  name: "Start Game4",
  command() {
    alert("MOIN");
  }
},
{
  name: "Start Game5",
  command() {
    alert("MOIN");
  }
},
{
  name: "Start Game6",
  command() {
    alert("MOIN");
  }
},
{
  name: "Start Game7",
  command() {
    alert("MOIN");
  }
},
{
  name: "Start Game8",
  command() {
    alert("MOIN");
  }
},
{
  name: "Start Game9",
  command() {
    alert("MOIN");
  }
},
{
  name: "Start Game10",
  command() {
    alert("MOIN");
  }
},
{
  name: "Start Game11",
  command() {
    alert("MOIN");
  }
},
{
  name: "Start Game12",
  command() {
    alert("MOIN");
  }
},
{
  name: "Start Game13",
  command() {
    alert("MOIN");
  }
}
];

function App() {

  return (
    <div className="App">
      <CommandPalette
        trigger={<></>}
        commands={commands}
        closeOnSelect={true}
        resetInputOnOpen={false}
        resetCommandsOnOpen={true}
        maxDisplayed={100}
        hotKeys={["command+shift+p","command+k", "esc"]}
      />
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
}

export default App;
