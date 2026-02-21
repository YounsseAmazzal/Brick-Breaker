import { drawUser } from "../UserAndBall.js"
import {keys} from "./fullRestart.js"
import { state } from "../state.js"
export function moveUser() {
    if (keys.ArrowLeft && state.userCurrentPosition[0] > 0) {
        state.userCurrentPosition[0] -= 7
    }
    if (keys.ArrowRight && state.userCurrentPosition[0] < (state.boardWidth - state.userWidth)) {
        state.userCurrentPosition[0] += 7
    }
    drawUser()
}