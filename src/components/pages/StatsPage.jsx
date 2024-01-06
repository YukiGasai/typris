import React, { useEffect, useState } from "react";
import LineChart from "../LineChart";
import styled from "styled-components"; 
import { settings, settingsLoaded, user } from "../../helper/gameSignals";
import { backendUrl } from "../../helper/backendUrl";
import { Difficulty, Language, StatsFilter, StatsSort, TextSymbols } from "../../helper/settingsObjects";
import { StyledOption, getAlignment } from "./SettingsPage";
import { toast } from "react-toastify";
import UserDisplay from "../UserDisplay";
import LoadingContainer from "../LoadingContainer";
import { useDebounce } from 'use-debounce';

const OptionList = ({options}) => {
    return (
        <StyledOptionList>
            {Object.entries(options).filter(([key]) => !key.startsWith("_")).map(([key, value]) => (
                <StyledOption 
                    key={value} 
                    onClick={() => {
                        const optionValue = options._Key + "_" + value;
                        const filterList = settings.value[StatsFilter._Key] ?? [];
                        
                        if(filterList?.includes(optionValue)) {
                            settings.value = {
                                ...settings.value,
                                [StatsFilter._Key]: filterList.filter((val) => val !== optionValue),
                            }
                        } else {
                            settings.value = {
                                ...settings.value,
                                [StatsFilter._Key]: [...filterList ?? [], optionValue],
                            }
                        }
                    }}
                    className={settings.value[StatsFilter._Key]?.includes(options._Key + "_" + value) ? "active" : ""}
                >{key}</StyledOption>
            ))}
        </StyledOptionList>
    )
}

const getSortAndFilter = () => {
    let sortAndFilter = "?";

    const lists = {}
    const filterList = settings.value[StatsFilter._Key] ?? [];
    for (const filter of filterList) {
        const [key, value] = filter.split("_");
        if(!lists[key]) {
            lists[key] = [];
        }
        lists[key].push(value);
    }

    Object.entries(lists).forEach(([key, value]) => {
        if(value.length > 0) {
            sortAndFilter += `${key}=${value.join(",")}&`;
        }
    })

    if(settings.value[StatsSort._Key]) {
        console.log(settings.value[StatsSort._Key])
        const sortList = settings.value[StatsSort._Key] ?? [];
        if(sortList instanceof Array) {
            if(sortList?.length > 0) {
                sortAndFilter += `sort=${sortList.join(",")}&`;
            }
        } else {
            sortAndFilter += `sort=${sortList}&`;
            settings.value = {
                ...settings.value,
                [StatsSort._Key]: [sortList],
            }
        }
    }

    if(sortAndFilter.endsWith("&")) {
        return sortAndFilter.slice(0, -1);
    } else {
        return sortAndFilter;
    }
}

const StatsPage = () => {

    const [results, setResults] = useState(null);
    const [personalHighScores, setPersonalHighScores] = useState(null);
    const [loadingResults, setLoadingResults] = useState(false);
    const [highScores, setHighScores] = useState(null); 
    const [loadingGlobalHighScores, setLoadingGlobalHighScores] = useState(false);

    const [showFilter, setShowFilter] = useState(false);
    const [showCompare, setShowCompare] = useState(false);
    const [nameSearch, setNameSearch] = useState('');
    const [bufferedNameSearch] = useDebounce(nameSearch, 750);
    const [nameList, setNameList] = useState([]);
    const [loadingNames, setLoadingNames] = useState(false);
    
    const [compareUser, setCompareUser] = useState(null);
    const [compareResults, setCompareResults] = useState([]);
    const [loadingCompare, setLoadingCompare] = useState(false);
    const [compareHighScores, setCompareHighScores] = useState(null);

    useEffect(() => {
        if(!bufferedNameSearch) {
            setNameList([]);
            return;
        };
        const getNames = async () => {
            setLoadingNames(true);
            try {
                const data = await fetch(`${backendUrl()}/api/user?name=${bufferedNameSearch}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const names = await data.json();
                setNameList(names);
                setLoadingNames(false);
            } catch(e) {
                toast.error("Could not load names");
                console.log(e);
            }
        }
        getNames();
    }, [bufferedNameSearch])


    useEffect(() => {
        if(settingsLoaded.value === false) return;

        const getGlobalHighScores = async () => {
            setLoadingGlobalHighScores(true);

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
                setLoadingGlobalHighScores(false);
            }catch(e) {
                toast.error("Could not load global high scores");
                console.log(e);
            }
        }
        getGlobalHighScores();

    }, [settings.value[StatsFilter._Key], settings.value[StatsSort._Key]])

    useEffect(() => {
        if(settingsLoaded.value === false) return;

        const getResults = async () => {
            if(user.value) {
                setLoadingResults(true);
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
                    setLoadingResults(false);
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
            
            };
        getResults();
    }, [settings.value[StatsFilter._Key]])


    useEffect(() => {
        if(settingsLoaded.value === false) return;
        if(!compareUser) return;
        
        const getCompareResults = async () => {
            setLoadingCompare(true);
            try {
        console.log(compareUser)

                const data = await fetch(`${backendUrl()}/api/result/${getSortAndFilter()}&id=${compareUser._id}`, {
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
    }, [compareUser, settings.value[StatsFilter._Key], settings.value[StatsSort._Key]])


    const toggleSort = (sort) => {
        if(settings.value[StatsSort._Key]?.includes(sort)) {
            settings.value = {
                ...settings.value,
                [StatsSort._Key]: settings.value[StatsSort._Key].filter((val) => val !== sort),
            }
        } else {
            settings.value = {
                ...settings.value,
                [StatsSort._Key]: [...settings.value[StatsSort._Key] ?? [], sort],
            }
        }
    }

    const getClass = (sort) => {
        const sortList = settings.value[StatsSort._Key];
        if(sortList?.includes(sort)) {
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

            <div>
                <div className="header">
                    <h2>Global High Scores</h2>
                    <span className="filterButton" onClick={()=>setShowFilter(s=>!s)}>Filter</span>
                </div>
                {loadingGlobalHighScores ? <LoadingContainer /> : <>
                {highScores &&
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
                }
                </>}
            </div>
   
            <div>
                <div className="header">
                    <h2>Personal Stats</h2>
                    <span className="filterButton" onClick={()=>setShowCompare(s=>!s)}>Compare</span>
                </div>
                    {loadingResults ? <LoadingContainer /> : <>
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
                    </>}

                    {loadingCompare ? <LoadingContainer /> : <>
                    {compareHighScores && <>
                    <span>High Scores: <UserDisplay user={compareUser} click={() => {setCompareUser(""); setCompareResults([]); setCompareHighScores(null)}}/></span>
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
                   }</>}

            </div>
    

            {loadingResults ? <LoadingContainer /> : <>
            {results ? <>
            <div className="chartContainer">
                <LineChart chartData={getOwnChartData()} />
            </div>    
                {compareResults.length > 0 && compareUser && <>
                    <div className="chartContainer">
                    <LineChart chartData={getCompareChartData()} />
                    </div>    
                    <div className="chartContainer">
                    <LineChart chartData={getCombinedChartData()} />
                    </div>    
                </>
                }

            </>
            : <p className="warning">No attempt history yet</p>
            }
            </>}

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
                    <input placeholder="Search for name" type="text" onChange={(e) => {setNameSearch(e.target.value)}} value={nameSearch ?? ""}/>
                    <div className="userList">
                        {loadingNames ? <LoadingContainer /> : nameList.map((name, index) => (
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
width: 800px;
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
    width: 100%;
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