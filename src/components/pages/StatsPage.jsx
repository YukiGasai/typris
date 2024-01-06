import React, { useEffect, useState } from "react";
import LineChart from "../LineChart";
import styled from "styled-components"; 
import { filterList, sortList, user } from "../../helper/gameSignals";
import { backendUrl } from "../../helper/backendUrl";
import { Difficulty, Language, TextSymbols } from "../../helper/settingsObjects";
import { StyledOption, getAlignment } from "./SettingsPage";
import { toast } from "react-toastify";
import UserDisplay from "../UserDisplay";

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
    const [loadingResults, setLoadingResults] = useState(false);

    const [personalHighScores, setPersonalHighScores] = useState(null);
    const [loadingHighScores, setLoadingHighScores] = useState(false);

    const [highScores, setHighScores] = useState(null); 
    const [loadingGlobalHighScores, setLoadingGlobalHighScores] = useState(false);
    
    const [showFilter, setShowFilter] = useState(false);
    const [showCompare, setShowCompare] = useState(false);
    const [nameSearch, setNameSearch] = useState('');
    const [nameList, setNameList] = useState([]);
    const [loadingNames, setLoadingNames] = useState(false);
    const [compareUser, setCompareUser] = useState(null);
    const [compareResults, setCompareResults] = useState([]);
    const [loadingCompare, setLoadingCompare] = useState(false);
    const [compareHighScores, setCompareHighScores] = useState(null);

    useEffect(() => {
        if(!nameSearch) return;
        const getNames = async () => {
            try {
                const data = await fetch(`${backendUrl()}/api/user?name=${nameSearch}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const names = await data.json();
                setNameList(names);
            } catch(e) {
                toast.error("Could not load names");
                console.log(e);
            }
        }
        getNames();
    }, [nameSearch])


    useEffect(() => {
        
            const getResults = async () => {

                if(user.value) {
                    try{
                        const data = await fetch(`${backendUrl()}/api/result${getSortAndFilter()}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        });
                        const stats = await data.json();
                        setResults(stats);
                    } catch(e) {
                        toast.error("Could not load result history");
                        console.log(e);
                    }
                    try {
                        const highScoresData = await fetch(`${backendUrl()}/api/result/highscore${getSortAndFilter()}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        });
                        const highScores = await highScoresData.json();
                        setPersonalHighScores(highScores);
                    } catch(e) {
                        toast.error("Could not load high scores");
                        console.log(e);
                    }
                } else {
                    const attempts = localStorage.getItem("attempts");
                    if(attempts) {
                        setResults(JSON.parse(attempts));
                    }
                    const highScores = localStorage.getItem("highScores");
                    if(highScores) {
                        setPersonalHighScores(JSON.parse(highScores));
                    }
                }
                try {
                    const globalHighScoresData = await fetch(`${backendUrl()}/api/result/highscore/all${getSortAndFilter()}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    const globalHighScores = await globalHighScoresData.json();
                    setHighScores(globalHighScores);
                }catch(e) {
                    toast.error("Could not load global high scores");
                    console.log(e);
                }
              };
            getResults();
               
    }, [filterList.value, sortList.value])


    useEffect(() => {
        if(!compareUser) return;
        setLoadingCompare(true);
        const getCompareResults = async () => {
            try {
                const data = await fetch(`${backendUrl()}/api/result/single${getSortAndFilter()}&id=${compareUser._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const stats = await data.json();
                setCompareResults(stats);

                const highScoresData = await fetch(`${backendUrl()}/api/result/highscore${getSortAndFilter()}&id=${compareUser._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const highScores = await highScoresData.json();
                setCompareHighScores(highScores);

                setLoadingCompare(false);
            } catch(e) {
                toast.error("Could not load result history");
                console.log(e);
            }
        }
        getCompareResults();
    }, [compareUser, filterList.value, sortList.value])


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



    const getCompareDataSets = (compareResults, compareUser) => [
            {
                label: `${compareUser.name} Tetris Score`,
                data: compareResults.map(stat => stat.tetrisScore),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderWidth: 4
            },
            {
                label: `${compareUser.name} Tetris Rows`,
                data: compareResults.map(stat => stat.tetrisRows),
                backgroundColor: "rgba(153, 102, 255, 0.6)",
                borderWidth: 4
            },
            {
                label: `${compareUser.name} Tetris Level`,
                data: compareResults.map(stat => Math.floor(stat.tetrisRows / 10)),
                backgroundColor: "rgba(255, 159, 64, 0.6)",
                borderWidth: 4
            },
            {
                label: `${compareUser.name} Error Rows`,
                data: compareResults.map(stat => stat.errorRowCount),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderWidth: 4
            },
            {
                label: `${compareUser.name} Error Percentage`,
                data: compareResults.map(stat => stat.wrongLetterCount / (stat.correctLetterCount + stat.wrongLetterCount) * 100),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderWidth: 4
            },
            {
                label: `${compareUser.name} Words Per Minute`,
                data: compareResults.map(stat => stat.wordsPerMinute),
                backgroundColor: "rgba(255, 206, 86, 0.6)",
                borderWidth: 4
            }]

    const getOwnDataSets = (ownResults) => [
        {
            label: "Tetris Score",
            data: ownResults.map(stat => stat.tetrisScore),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderWidth: 4
        },
        {
            label: "Tetris Rows",
            data: ownResults.map(stat => stat.tetrisRows),
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            borderWidth: 4
        },
        {
            label: "Tetris Level",
            data: ownResults.map(stat => Math.floor(stat.tetrisRows / 10)),
            backgroundColor: "rgba(255, 159, 64, 0.6)",
            borderWidth: 4
        },
        {
            label: "Error Rows",
            data: ownResults.map(stat => stat.errorRowCount),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderWidth: 4
        },
        {
            label: "Error Percentage",
            data: ownResults.map(stat => stat.wrongLetterCount / (stat.correctLetterCount + stat.wrongLetterCount) * 100),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderWidth: 4
        },
        {
            label: "Words Per Minute",
            data: ownResults.map(stat => stat.wordsPerMinute),
            backgroundColor: "rgba(255, 206, 86, 0.6)",
            borderWidth: 4
        }
    ];

    const getCombinedDataSets = (ownResults, compareResults, compareUser) => {
        let ownData = getOwnDataSets(ownResults);
        if(!compareResults.length || !compareUser) {
            return ownData;
        }
        ownData = ownData.map(data => ({
            ...data,
            label: `Your ${data.label}`
        }));

        let compareData = getCompareDataSets(compareResults, compareUser);
        return [...ownData, ...compareData];
    }


    const getOwnChartData = () => {
        return {
            labels: results.map((stat, index) => index + 1),
            datasets: getOwnDataSets(results),
        }
    }

    const getCompareChartData = () => {
        return {
            labels: compareResults.map((stat, index) => index + 1),
            datasets: getCompareDataSets(compareResults, compareUser),
        }
    }

    const getCombinedChartData = () => {
        return {
            labels: (compareResults.length > results.length ? compareResults : results).map((stat, index) => index + 1),
            datasets: getCombinedDataSets(results, compareResults, compareUser),
        }
    }
    

    return (
        <StyledStatsPage>
 
            <h1>Stats</h1>
       
            {highScores &&
            <div>
      
                <div className="header">
                <h2>Global High Scores</h2>
                <span className="filterButton" onClick={()=>setShowFilter(s=>!s)}>Filter</span>
                </div>
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
                        <UserDisplay user={scores.user} click={() => {setCompareUser(scores.user)}}/>
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
            }
            <div>
                <div className="header">
                    <h2>Stats</h2>
                    <span className="filterButton" onClick={()=>setShowCompare(s=>!s)}>Compare</span>
                </div>
                    {personalHighScores ?
                    <StyleScoreList>
                        <div>
                            <h3>Tetris Score</h3>
                            <p>{personalHighScores?.tetrisScore ?? "None"}</p>
                        </div>
                        <div>
                            <h3>Tetris Rows</h3>
                            <p>{personalHighScores?.tetrisRows ?? "None"}</p>
                        </div>
                        <div>
                            <h3>Typed Words</h3>
                            <p>{personalHighScores?.typedWords ?? "None"}</p>
                        </div>
                        <div>
                            <h3>Words per minute</h3>
                            <p>{personalHighScores?.wordsPerMinute ?? "None"}</p>
                        </div>
                    </StyleScoreList>    
                    : <p className="warning">No personal high scores yet</p>}

                    {compareHighScores && <>
                    <span>High Scores: <UserDisplay user={compareUser} click={() => setCompareUser("")}/></span>
                    <StyleScoreList>
                        <div>
                            <h3>Tetris Score</h3>
                            <p>{compareHighScores?.tetrisScore ?? "None"}</p>
                        </div>
                        <div>
                            <h3>Tetris Rows</h3>
                            <p>{compareHighScores?.tetrisRows ?? "None"}</p>
                        </div>
                        <div>
                            <h3>Typed Words</h3>
                            <p>{compareHighScores?.typedWords ?? "None"}</p>
                        </div>
                        <div>
                            <h3>Words per minute</h3>
                            <p>{compareHighScores?.wordsPerMinute ?? "None"}</p>
                        </div>
                    </StyleScoreList> 
                    </>   
                   }

            </div>
    


            {results ?
            <div className="chartContainer">
                <LineChart chartData={getOwnChartData()} />
                {compareResults.length > 0 && compareUser && <>
                    <LineChart chartData={getCompareChartData()} />
                    <LineChart chartData={getCombinedChartData()} />
                    
                </>
                }

            </div>
            : <p className="warning">No attempt history yet</p>
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

            {showCompare &&
                <StyledFilterMenu>
                    <h2 className="filterButton" onClick={() => setShowCompare(s => !s)}>Compare</h2>
                    <input placeholder="Search for name" type="text" onChange={(e) => {setNameSearch(e.target.value)}}/>
                    <div className="userList">
                        {loadingNames ? <p>Loading...</p> : nameList.map((name, index) => (
                            <UserDisplay key={index} user={name} click={() => {setCompareUser(name); setNameSearch(""); }}/>
                        ))}
                    </div>
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

    .userList {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    input {
        width: 100%;
        padding: 5px;
        border-radius: 5px;
        border: none;
        margin-bottom: 20px;
        margin-top: 10px;
        font-family: ${props => props.theme.fonts.primary};
        font-size: 1em;
    }

    &::-webkit-scrollbar {
        display: none;
        }

    -ms-overflow-style: none;
    scrollbar-width: none; 
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
    margin-bottom: 20px;
}

.warning {
    text-align: center;
    padding: 20px;
    border-radius: 10px;
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.background};
}



.globalTable {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    overflow-x: visible;
    margin-bottom: 40px;
    

    @media (max-width: 800px) {
        overflow-x: scroll;
    }


    & > span,
    & > div {
        text-align: center;
        padding: 5px 0;
        overflow: visible;
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