import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { blurBackground, settings, tetrisLevel, tetrisRows, tetrisScore, typedWords, typingAccuracy, user, wordsPerMinute, wordsPerMinuteScores } from '../helper/gameSignals';
import LineChartWPM from './LineChartWPM';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import domtoimage from 'dom-to-image-more';
import { toast } from 'react-toastify';
import { Difficulty, Language, TextSymbols, Theme } from '../helper/settingsObjects';
import { EqualNot, Sigma, Quote, AtSign } from 'lucide-react';
import { getTheme } from './App';

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}


const getIconByText = (text, index) => {
    switch (text) {
        case TextSymbols.Numbers:
            return <span key={index}><Sigma/></span>
        case TextSymbols['Text Symbols']:
            return <span key={index}><Quote/></span>
        case TextSymbols['Math Symbols']:
            return <span key={index}><EqualNot/></span>
        case TextSymbols['Additional Symbols']:
            return <span key={index}><AtSign/></span>
        default:
            return <span key={index}><Quote/></span>
    }
}


const GameOverScreen = ({startGame}) => {

    const [takeScreenshot, setTakeScreenshot] = useState(false);

    const ref = useRef(null);
    function getWpmData() {
        return {
            labels: wordsPerMinuteScores.value.map((stat, index) => index + 1),
            datasets: [
                {
                    label: "WPM",
                    data: wordsPerMinuteScores.value,
                    backgroundColor: getTheme(settings.value[Theme._Key]).colors.highlight + "80",
                    yAxisID: "wpm",
                    borderColor: getTheme(settings.value[Theme._Key]).colors.highlight + "80",
                    fill: {
                        target: 'origin',
                        above: getTheme(settings.value[Theme._Key]).colors.highlight + "10",
                      },
                    borderWidth: 4,
                    lineTension: 0.4,  
                }
            ]
        }
    }

    useEffect(() => {
        blurBackground.value = true;
        return () => blurBackground.value = false;
    }, [])

    useLayoutEffect(() => {
        if(takeScreenshot){
            createImage();
        }
    }, [takeScreenshot])

    const createImage = () => {    
        domtoimage.toPng(
            ref.current, {
                style: {
                    "box-shadow": "none",
                    "width": "100%",
                    "border-radius": "0",
                    "padding": "0",
                    "margin": "0",
                    "transform": "none",
                },
                width: ref.current.scrollWidth,
                height: ref.current.scrollHeight,
            }).then(dataUrl => {
                if(window.ClipboardItem && navigator.clipboard) {
                    fetch(dataUrl)
                        .then(r => r.blob())
                        .then(pngImageBlob => {;
                        navigator.clipboard.write([
                            new window.ClipboardItem({
                                'image/png': pngImageBlob
                            })
                        ]);
                        toast("Screenshot saved to clipboard")
                    })
                }else {
                    window.open(dataUrl);
                }
                setTakeScreenshot(false);
            })
    }

    const getCurrentDate = () => {
        const date = new Date();
         return date.toISOString().split("T")[0] + " " + date.toLocaleTimeString().split(":").slice(0, 2).join(":");
    } 

    return (
    <StyledGameOverScreen ref={ref}>
        <div className='title'>
            <h2>Game Over</h2>
            <p>Press Alt+R to restart</p>
        </div>
        <hr />
        <div className='statsContainer'>
            <div className='stats'>
            <h3>Tetris Stats</h3>
                <span>Score</span>
                <span>{tetrisScore.value}</span>
                <span>Rows</span>
                <span>{tetrisRows.value}</span>
                <span>Level</span>
                <span>{Math.floor(tetrisLevel.value)}</span>
            </div>
            <div className='stats'>
                <h3>Typing Stats</h3>
                <span>Words</span>
                <span>{typedWords.value}</span>
                <span>WPM</span>
                <span>{wordsPerMinute.value}</span>
                <span>Accuracy</span>
                <span>{typingAccuracy.value}</span>
            </div>
        </div>
        <hr />         
        


        <LineChartWPM chartData={getWpmData()} />
        
        {takeScreenshot ? (<StyledScreenShotData>
            <span>{user.value ? user.value.name : "Anonymous"}</span>
            <span className='date'>{getCurrentDate()}</span>
            <span className='lang'>{getKeyByValue(Language, settings.value[Language._Key])} {getKeyByValue(Difficulty, settings.value[Difficulty._Key])}</span>
            <span className='diff'></span>
            <div className='symbols'>{settings.value[TextSymbols._Key].map((t, index) => getIconByText(t, index))}</div>
        </StyledScreenShotData>) : (
        <button className="restartButton" onClick={startGame}>Restart</button>
       )}
        <div className={takeScreenshot > 0 ? "hide": "link"}>
            <Link to={"stats"}>
                Stats
            </Link>
            <span id="shareResultsButton" onClick={() => setTakeScreenshot(true)}>
                Share
            </span>
            <Link to={"settings"}>
                Settings
            </Link>
        </div>
        
   
    </StyledGameOverScreen>
)}

const StyledScreenShotData = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: ${props => props.theme.fonts.primary};
    color: ${props => props.theme.colors.primary};
`

const StyledGameOverScreen = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin: 0 0 20px 0;
    padding: 20px;
    height: max-content;
    width: max-content;
    border-radius: 20px;
    border: none;
    background: ${props => props.theme.colors.background};
    font-family: ${props => props.theme.fonts.secondary};
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    width: 80%;
    min-height: 80%;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
    z-index: 3;

    h2 {
        text-align: center;
        padding: 20px 0;
    }

    p {
        text-align: center;
        margin-bottom: 1em;
        font-family: monospace;
    }

    .statsContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .stats {
        display: grid;
        row-gap: 10px;
        column-gap: 10px;
        grid-template-columns: min-content;
        grid-template-rows: repeat(2, auto);
        margin: 0 0 1em 0;
    }

    h3 {
        text-align: left;
        padding: 15px 0;
        grid-column: 1 / 3;
    }

    .controls {
        display: flex;
        flex-direction: row;
    }

    .restartButton {
        width: 50%;
        height: 60px;
        min-height: 30px;
        background: ${props => props.theme.colors.primary};
        border-radius: 20px;
        font-family: ${props => props.theme.fonts.secondary};
        cursor: pointer;
        font-size: 1rem;
        color: ${props => props.theme.colors.background};
        justify-self: center;
        align-self: center;
        margin: auto;
        border: none;
    }

    .restartButton:hover {
        width: 51%;
    }

    hr {
        margin: 3px 0;
    }

    .link {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: flex-end;
        margin: 0 0 20px 0;
        text-decoration: none;
    }

    @media (max-width: ${props => props.theme.screens.mobile}) {
        position: fixed;
        width: 100vw;

    }

    .hide {
        display: none;
    }
`;

export default GameOverScreen;