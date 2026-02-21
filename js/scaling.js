import { state } from "./state.js"
// --- Scaling ---
export function scaleGame() {
    const width = window.innerWidth
    const height = window.innerHeight
    const gameBasewidth = 650
    const gameBaseheight = 600
    let scale = Math.min(width / gameBasewidth, height / gameBaseheight)
    scale = scale * 0.95
    state.gameContainer.style.transform = `scale(${scale})`
}