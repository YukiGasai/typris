import { useEffect, useState } from "react";
import LineChart from "../LineChart";
import styled from "styled-components"; 

const StatsPage = () => {

    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        
        const stats = JSON.parse(localStorage.getItem("attempts")) ?? [];

        setChartData({
            labels: stats.map((stat, index) => index + 1),
            datasets: [
                {
                    label: "Score",
                    data: stats.map(stat => stat.score),
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderWidth: 4
                },
                {
                    label: "Rows",
                    data: stats.map(stat => stat.rows),
                    backgroundColor: "rgba(153, 102, 255, 0.6)",
                    borderWidth: 4
                },
                {
                    label: "Level",
                    data: stats.map(stat => stat.level),
                    backgroundColor: "rgba(255, 159, 64, 0.6)",
                    borderWidth: 4
                },
                {
                    label: "Error Rows",
                    data: stats.map(stat => stat.errorRowCount),
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                    borderWidth: 4
                },
                {
                    label: "Error Percentage",
                    data: stats.map(stat => stat.wrongLetters / (stat.correctLetters + stat.wrongLetters) * 100),
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderWidth: 4
                }
            ]
        })

        

    }, [])

    return (
        <StyledStatsPage>
            {chartData ?
            <LineChart chartData={chartData} />
            : <p>Loading...</p>
            }
        </StyledStatsPage>
    )
}

const StyledStatsPage = styled.div`
    display: flex;
    flex-direction: column;

    margin: 10px 10%;
`;

export default StatsPage;