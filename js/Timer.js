import { state } from "./state.js"
// --- Timer ---
export function startTimer() {
    if (state.timerInterval) clearInterval(state.timerInterval)
    state.timerInterval = setInterval(() => {
        if (state.gameState === 'playing') {
            state.timer++
            state.timerDisplay.innerHTML = "Timer: " + state.timer + "s"
        }
    }, 1000)
}
