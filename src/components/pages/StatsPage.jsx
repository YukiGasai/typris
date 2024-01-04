import React, { useEffect, useState } from "react";
import LineChart from "../LineChart";
import styled from "styled-components"; 
import { filterList, sortList, user } from "../../helper/gameSignals";
import { backendUrl } from "../../helper/backendUrl";
import { Difficulty, Language, TextSymbols } from "../../helper/settingsObjects";
import { StyledOption, getAlignment } from "./SettingsPage";

const OptionList = ({options}) => {
    return (
        <StyledOptionList>
            {Object.entries(options).filter(([key]) => !key.startsWith("_")).map(([key, value]) => (
                <StyledOption 
                    key={value} 
                    onClick={() => {
                        if(filterList.value[options._Key]?.includes(value)) {
                            filterList.value = {
                                ...filterList.value,
                                [options._Key]: filterList.value[options._Key].filter((val) => val !== value),
                            }
                        } else {
                            filterList.value = {
                                ...filterList.value,
                                [options._Key]: [...filterList.value[options._Key] ?? [], value],
                            }
                        }
                    }}
                    className={filterList.value[options._Key]?.includes(value) ? "active" : ""}
                >{key}</StyledOption>
            ))}
        </StyledOptionList>
    )
}

const getSortAndFilter = () => {
    let sortAndFilter = "?";
    Object.entries(filterList.value).forEach(([key, value]) => {
        if(value.length > 0) {
            sortAndFilter += `${key}=${value.join(",")}&`;
        }
    })

    if(sortList.value.length > 0) {
        sortAndFilter += `sort=${sortList.value.join(",")}&`;
    }

    return sortAndFilter.slice(0, -1);
}

const StatsPage = () => {

    const [results, setResults] = useState(null);
    const [personalHighScores, setPersonalHighScores] = useState(null);
    const [highScores, setHighScores] = useState(null); 
    const [showFilter, setShowFilter] = useState(true);

    useEffect(() => {
        
        if(user.value) {
            const getResults = async () => {
                const data = await fetch(`${backendUrl()}/api/result${getSortAndFilter()}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const stats = await data.json();
                setResults(stats);
                const highScoresData = await fetch(`${backendUrl()}/api/result/highscore${getSortAndFilter()}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const highScores = await highScoresData.json();
                setPersonalHighScores(highScores);

                const globalHighScoresData = await fetch(`${backendUrl()}/api/result/highscore/all${getSortAndFilter()}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const globalHighScores = await globalHighScoresData.json();
                setHighScores(globalHighScores);
              };
            getResults();
        } else {
            setResults(JSON.parse(localStorage.getItem("attempts")) ?? []);
        }        
    }, [filterList.value, sortList.value])


    const toggleSort = (sort) => {
        if(sortList.value.includes(sort)) {
            sortList.value = sortList.value.filter((val) => val !== sort);
        } else {
            sortList.value = [...sortList.value, sort];
        }
    }

    const getClass = (sort) => {
        if(sortList.value.includes(sort)) {
            return "active";
        } else {
            return "";
        }
    }

    const getChartData = () => ({

        labels: results.map((stat, index) => index + 1),
        datasets: [
            {
                label: "Tetris Score",
                data: results.map(stat => stat.tetrisScore),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderWidth: 4
            },
            {
                label: "Tetris Rows",
                data: results.map(stat => stat.tetrisRows),
                backgroundColor: "rgba(153, 102, 255, 0.6)",
                borderWidth: 4
            },
            {
                label: "Tetris Level",
                data: results.map(stat => Math.floor(stat.tetrisRows / 10)),
                backgroundColor: "rgba(255, 159, 64, 0.6)",
                borderWidth: 4
            },
            {
                label: "Error Rows",
                data: results.map(stat => stat.errorRowCount),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderWidth: 4
            },
            {
                label: "Error Percentage",
                data: results.map(stat => stat.wrongLetterCount / (stat.correctLetterCount + stat.wrongLetterCount) * 100),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderWidth: 4
            },
            {
                label: "Words Per Minute",
                data: results.map(stat => stat.wordsPerMinute),
                backgroundColor: "rgba(255, 206, 86, 0.6)",
                borderWidth: 4
            }
        ]
    })

    return (
        <StyledStatsPage>
            <div className="header">
            <h1>Stats</h1>
            <span className="filterButton" onClick={()=>setShowFilter(s=>!s)}>Filter</span>
            </div>
            <div>
                <h2>Global High Scores</h2>
                <div className="globalTable">
                    <span >User</span>
                    <span className={getClass("tetrisScore")} onClick={() => {toggleSort("tetrisScore")}}>Tetris Score</span>
                    <span className={getClass("tetrisRows")} onClick={() => {toggleSort("tetrisRows")}}>Tetris Rows</span>
                    <span className={getClass("errorRowCount")} onClick={() => {toggleSort("errorRowCount")}}>Error Rows</span>
                    <span className={getClass("typedWords")} onClick={() => {toggleSort("typedWords")}}>Typed Words</span>
                    <span className={getClass("wordsPerMinute")} onClick={() => {toggleSort("wordsPerMinute")}}>Wpm</span>
                    <span >Accuracy</span>
                    {(highScores ?? [])?.map((scores, index) => 
                    <React.Fragment key={index}>
                        <span className="userField"><img src={scores.user.avatar} alt={scores.user.name}/>{scores.user.name}</span>
                        <span>{scores.tetrisScore}</span>
                        <span>{scores.tetrisRows}</span>
                        <span>{scores.errorRowCount}</span>
                        <span>{scores.typedWords}</span>
                        <span>{scores.wordsPerMinute}</span>
                        <span>{(scores.correctLetterCount / (scores.correctLetterCount + scores.wrongLetterCount) * 100).toFixed(2)}%</span>
                    </React.Fragment>
                    )}
                </div>
            </div>
            <div className="personalHighscore">
                <h2>Personal High Scores</h2>
                <StyleScoreList>
                    <div>
                        <h3>Tetris Score</h3>
                        <p>{personalHighScores?.tetrisScore}</p>
                    </div>
                    <div>
                        <h3>Tetris Rows</h3>
                        <p>{personalHighScores?.tetrisRows}</p>
                    </div>
                    <div>
                        <h3>Typed Words</h3>
                        <p>{personalHighScores?.typedWords}</p>
                    </div>
                    <div>
                        <h3>Words per minute</h3>
                        <p>{personalHighScores?.wordsPerMinute}</p>
                    </div>
                </StyleScoreList>    
            </div>
    
            {results &&
            <div className="chartContainer">
                <LineChart chartData={getChartData(results)} />
            </div>
            }

            {showFilter &&
            <StyledFilterMenu>
                <h2 className="filterButton" onClick={() => setShowFilter(s => !s)}>Filter</h2>
                {[Difficulty, Language, TextSymbols].map((options, index) => (
                    <div key={index}>
                        <h3>{options._Name}</h3>
                        <OptionList options={options}/>
                    </div>
                ))}
            </StyledFilterMenu>
            }
        </StyledStatsPage>
    )
}

const StyledFilterMenu = styled.div`
    position: fixed;
    top: 10;
    left: 0;
    max-width: 300px;
    height: 80vh;
    overflow-y: scroll;
    background-color: ${props => props.theme.colors.background};
    padding:20px;
    border-radius: 0px  10px 10px 0px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
`

const StyledStatsPage = styled.div`
${getAlignment}
display: flex;
flex-direction: column;
margin: 0 10%;
max-width: 800px;
gap: 20px;
font-size: 1.2em;
color: ${props => props.theme.colors.primary};
font-family: ${props => props.theme.fonts.primary};


@media (max-width: 800px) {
    width: 90%;
    margin: 0 5%;
    p {
        grid-column: 1 / span 2;
    }
}

.filterButton {
    font-size: 1em;
    padding: 5px;
    color: ${props => props.theme.colors.background};
    background-color: ${props => props.theme.colors.primary};
    border-radius: 5px;
    cursor: pointer;
    width: fit-content;
}


.header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.globalTable {
    margin-bottom: 40px;
}

.globalTable {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    overflow-x: scroll;

    span {
        text-align: center;
        padding: 5px;
        border-bottom: 1px solid ${props => props.theme.colors.primary};
        font-family: ${props => props.theme.fonts.primary};
        font-size: 1em;
        font-weight: bold;
        cursor: pointer;
    }

    .active {
        color: ${props => props.theme.colors.highlight};
    }

    .userField {
        display: flex;
        align-items: center;
        justify-content: flex-start;        
        img {
            height: 30px;
            width: 30px;
            border-radius: 50%;
        }
    
    }
}

.chartContainer {
    flex: 1;
    min-height: 300px;
}

`

export const StyleScoreList = styled.div`
display: flex;
flex-direction: row;
gap: 10px;
flex-wrap: wrap;
div {
    flex: 1;
    text-align: center;
    height: 50px;
    min-width: 200px;
    border: 1px solid black;
    border-radius: 10px;
    height: fit-content;

    p {
        font-family: ${props => props.theme.fonts.primary};
        font-size: 1.5em;
        font-weight: bold;
    }
}
`;

export const StyledOptionList = styled.div`
display: flex;
flex-wrap: wrap;
gap: 10px;
grid-column: 1 / span 2;

@media (max-width: ${props => props.theme.screens.mobile}) {
    grid-column: 1 / span 2;
}

word-break: break-word;
`;

export default StatsPage;