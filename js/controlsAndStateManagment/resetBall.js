import { state } from "../state.js"
import { drawBall,drawUser } from "../UserAndBall.js"
export function resetBall() {
    state.ballCurrentPosition = [...state.ballStart]
    state.userCurrentPosition = [...state.userStart] 
    state.xDirection = -2
    state.yDirection = 2
    state.gameState = 'initial'
    drawBall()
    drawUser()
}