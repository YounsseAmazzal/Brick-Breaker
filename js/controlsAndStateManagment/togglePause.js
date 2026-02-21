import { state } from "../state.js";
import { startGame } from "./startGame.js";
import { showMenu } from "./Menu.js";
export function togglePause() {
    if (state.gameState === 'playing') {
        state.gameState = 'pause'
        showMenu('pause')
        if(state.bgMusic) state.bgMusic.pause();
    } else if (state.gameState === 'pause') {
        startGame()
    }
}