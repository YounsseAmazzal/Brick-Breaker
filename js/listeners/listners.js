import {startGame} from "../controlsAndStateManagment/startGame.js"
import {togglePause} from "../controlsAndStateManagment/togglePause.js"
import { fullRestart } from "../controlsAndStateManagment/fullRestart.js"
import { state } from "../state.js"
import {scaleGame} from "../scaling.js"
// --- Event Listeners ---
import { keys } from "../controlsAndStateManagment/fullRestart.js"
export function  Listeners(){
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') keys.ArrowLeft = true
    if (e.key === 'ArrowRight') keys.ArrowRight = true

    if (e.key.toLowerCase() === 's') startGame()
    if (e.key.toLowerCase() === 'p') togglePause()
    if (e.key.toLowerCase() === 'r') fullRestart()
})

document.addEventListener('keyup', e => {
    if (e.key === 'ArrowLeft') keys.ArrowLeft = false
    if (e.key === 'ArrowRight') keys.ArrowRight = false
})

// Button Listeners 
if(state.btnContinue) state.btnContinue.addEventListener('click', startGame)
if(state.btnRestart) state.btnRestart.addEventListener('click', fullRestart)
if(state.btnRestartWin) state.btnRestartWin.addEventListener('click', fullRestart)
if(state.btnRestartLose) state.btnRestartLose.addEventListener('click', fullRestart)

// Init
window.addEventListener('resize', scaleGame)
window.addEventListener('load', scaleGame)
}
