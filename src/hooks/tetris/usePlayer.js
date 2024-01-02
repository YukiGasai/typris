import { useCallback, useState } from "react";
import { TETROMINOS, randomTetromino } from "../../helper/tetris/tetrominos";
import { STAGE_WIDTH, checkCollision } from "../../helper/tetris/gameHelpers";
import { settings } from "../../helper/gameSignals";
import { SoundEffect, SoundVolume } from "../../helper/settingsObjects";
import rotateSound from "../../assets/sounds/rotate.wav";
import useSound from 'use-sound'

export const usePlayer = () => {

    const [playRotateSound] = useSound(rotateSound, {
        volume: settings.value[SoundVolume._Key] * 0.05
    })

    const [lastRotate, setLastRotate] = useState(Date.now());

    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const rotate = (tetromino, dir) => {

        if(Date.now() - lastRotate < 100) {
            return tetromino;
        }  
        setLastRotate(Date.now());
        if(settings.value[SoundEffect._Key].includes(SoundEffect.Rotate)) {
            playRotateSound();
        }

        // Make the rows to become cols (transpose)
        const rotatedTetromino = tetromino.map((_, index) =>
            tetromino.map(col => col[index]),
        );
        // Reverse each row to get a rotated tetromino
        if (dir > 0) {
            return rotatedTetromino.map(row => row.reverse());
        }
        return rotatedTetromino.reverse();
    };

    const playerRotate = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        }

        setPlayer(clonedPlayer);
    };

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x + x), y: (prev.pos.y + y) },
            collided,
        }))
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false,
        })
    }, []);




    return [player, updatePlayerPos, resetPlayer, playerRotate];
}