import { initBlocks } from "../blocksAndit'scolours.js"
import {resetBall} from "./resetBall.js"
import { state } from "../state.js"
import {showMenu} from "./Menu.js"
import {startTimer} from "../Timer.js"
export const keys = {
    ArrowRight: false,
    ArrowLeft: false
}

export function fullRestart() {
    state.score = 0
    state.lives = 3
    state.timer = 0
    state.gameState = 'initial'
    state.scoreDisplay.innerHTML = "Score: 0"
    state.livesDisplay.innerHTML = "Lives: 3"
    state.timerDisplay.innerHTML = "Timer: 0s"
    
    keys.ArrowLeft = false
    keys.ArrowRight = false

    initBlocks()
    resetBall() 
    showMenu('none')
    if (state.timerInterval) clearInterval(state.timerInterval)
    startTimer()
    if(state.bgMusic) { state.bgMusic.pause(); state.bgMusic.currentTime = 0; }
}