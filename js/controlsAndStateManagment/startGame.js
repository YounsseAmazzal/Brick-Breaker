import { audioCtx } from "../sound.js";
import { state } from "../state.js";
import { startTimer } from "../Timer.js";
import {showMenu} from "./Menu.js"
export  function startGame() {
    if (audioCtx.state === 'suspended') audioCtx.resume(); 
    if (state.gameState === 'initial' || state.gameState === 'pause') {
        state.gameState = 'playing'
        showMenu('none')
        if (!state.timerInterval) startTimer()
        if(state.bgMusic) state.bgMusic.play().catch(e => console.log("User interaction needed"));
    }
}