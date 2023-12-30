import { useEffect, useState } from "react";
import { createStage } from "../../helper/tetris/gameHelpers";
import { errorRowCount } from "../../helper/gameSignals";

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
setRowsCleared(0);

        const sweepRows = newStage => {
            let rowsDeleted = 0;
            const sweepedStage = newStage.reduce((ack, row) => {
                if (row.findIndex(cell => cell[0] === 0 || cell[0] === "error") === -1) {
                    rowsDeleted++;
                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return ack;
                }
                ack.push(row);
                
                return ack;
            }, [])
            
            setRowsCleared(rowsDeleted);
            return sweepedStage;
        }

        const updateStage = prevStage => {
            // First flush the stage
            const newStage = prevStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );

            // Then draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            });
            if (player.collided) {
                resetPlayer();
                return sweepRows(newStage);
            }

            for (let i = 0; i < errorRowCount.value; i++) {
                newStage[newStage.length - 1 - i] = new Array(newStage[0].length).fill(['error', 'error']);
            }

            return newStage;
        }
        setStage(prev => updateStage(prev));

    }, [player, resetPlayer]);



    return [stage, setStage, rowsCleared];
}