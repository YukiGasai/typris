import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { blurBackground, settings, tetrisLevel, tetrisRows, tetrisScore, typedWords, typingAccuracy, user, wordsPerMinute, wordsPerMinuteScores } from '../helper/gameSignals';
import LineChartWPM from './LineChartWPM';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import domtoimage from 'dom-to-image-more';
import { toast } from 'react-toastify';
import { Difficulty, Language, TextSymbols } from '../helper/settingsObjects';
import { EqualNot, Sigma, Quote, AtSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Share2, Settings, BarChart4, RotateCcw } from 'lucide-react';


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

    const { colors } = useTheme();

    const ref = useRef(null);
    function getWpmData() {
        return {
            labels: wordsPerMinuteScores.value.map((stat, index) => index + 1),
            datasets: [
                {
                    label: "WPM",
                    data: wordsPerMinuteScores.value,
                    backgroundColor: colors.highlight + "80",
                    borderColor: colors.highlight + "80",
                    yAxisID: "wpm",
                    fill: {
                        target: 'origin',
                        above: colors.highlight + "10",
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

    const { t } = useTranslation();

    return (
    <StyledGameOverScreen ref={ref}>
        <div className='title'>
            <h2>Game Over</h2>
            <p>{t('restartMessage')}</p>
        </div>
        <hr />
        <div className='statsContainer'>
            <div className='stats'>
            <h3>{t('Tetris Stats')}</h3>
                <span>{t('Score')}</span>
                <span>{tetrisScore.value}</span>
                <span>{t('Rows')}</span>
                <span>{tetrisRows.value}</span>
                <span>{t('Level')}</span>
                <span>{Math.floor(tetrisLevel.value)}</span>
            </div>
            <div className='stats'>
                <h3>{t('Typing Stats')}</h3>
                <span>{t('Words')}</span>
                <span>{typedWords.value}</span>
                <span>{t('WPM')}</span>
                <span>{wordsPerMinute.value}</span>
                <span>{t('Accuracy')}</span>
                <span>{typingAccuracy.value}</span>
            </div>
        </div>
        <hr />         
        


        <LineChartWPM chartData={getWpmData()} />
        {takeScreenshot && 
            <StyledScreenShotData>
                <span>{user.value ? user.value.name : t("Anonymous")}</span>
                <span className='date'>{getCurrentDate()}</span>
                <span className='lang'>{t(settings.value[Language._Key])} {t(settings.value[Difficulty._Key])}</span>
                <div className='symbols'>{settings.value[TextSymbols._Key].map((t, index) => getIconByText(t, index))}</div>
            </StyledScreenShotData>}

        <div className={takeScreenshot > 0 ? "hide": "link"}>

            <div className="restartButton" onClick={startGame}>
                <span>{t("Restart")}</span>
                <RotateCcw />
            </div>
            <div className='otherLinks'>
            <Link to={"stats"}>
                <BarChart4 className='linkIcon'/>
            </Link>
            <span id="shareResultsButton" onClick={() => setTakeScreenshot(true)}>
                <Share2 className='linkIcon'/>
            </span>
            <Link to={"settings"}>
                <Settings className='linkIcon'/>
            </Link>
            </div>
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

    hr {
        margin: 3px 0;
    }

    .link {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
        align-items: flex-end;
        margin: 10px 0 0 0;
        text-decoration: none;

        .restartButton {
            width: fit;
            display: flex;
            flex-direction: row;
            justify-content: center;
            height: 50px;
            width: 200px;
            align-items: center;
            padding: 20px;
            gap: 10px;
            background: ${props => props.theme.colors.primary};
            color: ${props => props.theme.colors.background};
            border-radius: 20px;
            transition: transform 0.2s ease-in-out;

            &:hover {
                color: ${props => props.theme.colors.highlight};
                background-color: ${props => props.theme.colors.secondary};
                transform: scale(1.05);
            }

            svg {
                transition: transform 0.2s ease-in-out;
            
            }

            &:hover svg {
                transform: rotate(-180deg);
            }
        }
        

        .otherLinks {
            display: flex;
            flex-direction: row;
            gap: 10px;
        }

        .linkIcon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            cursor: pointer;
            background: ${props => props.theme.colors.primary};
            color: ${props => props.theme.colors.background};
            padding: 10px;
            width: 32px;
            height: 32px;
            border-radius: 20px;
            border: none;
            transition: transform 0.2s ease-in-out;
            &:hover {
                color: ${props => props.theme.colors.highlight};
                background-color: ${props => props.theme.colors.secondary};
                transform: scale(1.05);
            }
        }
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