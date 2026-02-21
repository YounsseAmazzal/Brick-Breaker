
import { moveUser } from "./userMove.js"
import { state } from "../state.js"
import {checkForCollisions}from "../collisons.js"
import { drawBall } from "../UserAndBall.js"
export function updateGameState() {
    if (state.gameState === 'playing') {
        moveUser() 
        
        state.ballCurrentPosition[0] += state.xDirection
        state.ballCurrentPosition[1] += state.yDirection
        
        checkForCollisions()
        drawBall()
    }
}