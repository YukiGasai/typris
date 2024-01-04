import { useEffect, useState } from "react";
import LineChart from "../LineChart";
import styled from "styled-components"; 
import { filterList, sortList, user } from "../../helper/gameSignals";
import { backendUrl } from "../../helper/backendUrl";
import { Difficulty, Language, TextSymbols } from "../../helper/settingsObjects";
import { StyledOption, StyledSettingsItem, StyledSettingsPage } from "./SettingsPage";

const OptionList = ({options}) => {
    return (
        <div>
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
        </div>
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
                console.log("Fetching personal results")
                const highScoresData = await fetch(`${backendUrl()}/api/result/highscore${getSortAndFilter()}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const highScores = await highScoresData.json();
                setPersonalHighScores(highScores);
                console.log("Fetching personal highscores")

                const globalHighScoresData = await fetch(`${backendUrl()}/api/result/highscore/all${getSortAndFilter()}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const globalHighScores = await globalHighScoresData.json();
                setHighScores(globalHighScores);
                console.log("Fetching global highscores")
              };
            getResults();
        } else {
            setResults(JSON.parse(localStorage.getItem("attempts")) ?? []);
        }        
    }, [filterList.value])

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

    const resultData = ['tetrisScore', 'tetrisRows', 'errorRowCount', 'correctLetterCount', 'wrongLetterCount', 'typedWords', 'wordsPerMinute']

    return (
        <StyledSettingsPage>
            <div>
                <h2>Filter</h2>
                {[Difficulty, Language, TextSymbols].map((options, index) => (
                    <div key={index}>
                        <h3>{options._Name}</h3>
                        <OptionList options={options}/>
                    </div>
                ))}
            </div>
            <StyledSettingsItem>
                <h2>Sort</h2>
                    {resultData.map((options,index) => (
                        <StyledOptionList key={index}> 
                            <StyledOption 
                                onClick={() => {
                                    if(sortList.value.includes(options)) {
                                        sortList.value = sortList.value.filter((val) => val !== options);
                                    } else {
                                        sortList.value = [...sortList.value, options];
                                    }
                                }}
                                className={sortList.value.includes(options) ? "active" : ""}
                            >
                                {options}
                            </StyledOption>

                        </StyledOptionList>
                    ))}
            </StyledSettingsItem>
            <div>
                <h2>Personal High Scores</h2>
                <span>
                    {Object.entries(personalHighScores ?? {})?.map((score, index) => (
                        <p key={index}>{score}</p>
                    ))}
                </span>
            </div>
 
                
            <div>
                <h2>Global High Scores</h2>
                <span>
                    {(highScores ?? [])?.map((scores, indexA) => 
                        <span key={indexA}>{JSON.stringify(scores.tetrisScore)}</span>

                    )}
                </span>
            </div>
            {results &&
                <LineChart chartData={getChartData(results)} />
            }
        </StyledSettingsPage>
    )
}

const StyledStatsPage = styled.div`
    display: flex;
    flex-direction: column;

    margin: 10px 10%;
`;


export const StyledOptionList = styled.div`
display: flex;
flex-wrap: wrap;
gap: 10px;
grid-column: 1 / span 2;

@media (max-width: ${props => props.theme.screens.mobile}) {
    grid-column: 1 / span 2;
}
`;

export default StatsPage;