import { state } from "../state.js"
export function showMenu(type) {
    state.pauseMenu.style.display = 'none'
    state.winMenu.style.display = 'none'
    state.loseMenu.style.display = 'none'
    
    if (type === 'pause') state.pauseMenu.style.display = 'block'
    if (type === 'win') state.winMenu.style.display = 'block'
    if (type === 'lose') state.loseMenu.style.display = 'block'
}