import clickSoundTypeWriter from '../../assets/sounds/typewriter.wav'
import clickSoundOsu from '../../assets/sounds/osu.wav'
import errorSound from '../../assets/sounds/error.wav'
import { settings } from '../gameSignals'
import { TypingSound } from '../settingsObjects'

export const getClickSound = () => {
    switch (settings.value[TypingSound._Key]) {
        case TypingSound.Typewriter:
            return clickSoundTypeWriter
        case TypingSound.Osu:
            return clickSoundOsu
        default:
            return new Audio()
    }
}

export const getErrorSound = () => {
    return errorSound
}