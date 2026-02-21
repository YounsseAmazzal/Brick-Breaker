import { state } from "./state.js"
import { blocks } from "./blocksAndit'scolours.js"
import {changeDirection}from "./changeDirection.js"
import {showMenu}from "./controlsAndStateManagment/Menu.js"
import {playSound} from "./sound.js"
import {resetBall} from "./controlsAndStateManagment/resetBall.js"
// --- Collision Logic ---
export function checkForCollisions() {
    const ballLeft = state.ballCurrentPosition[0]
    const ballRight = state.ballCurrentPosition[0] + state.ballDiameter
    const ballBottom = state.ballCurrentPosition[1]
    const ballTop = state.ballCurrentPosition[1] + state.ballDiameter

    for (let i = 0; i < blocks.length; i++) {
        if (!blocks[i].active) continue
        const b = blocks[i]
        
        if (ballTop > b.bottomLeft[1] && ballBottom < b.bottomLeft[1] + state.blockHeight &&
            ballRight > b.bottomLeft[0] && ballLeft < b.bottomLeft[0] + state.blockWidth) {
            
            b.active = false
            b.element.classList.remove('block')
            b.element.style.display = 'none' 
            
            changeDirection('block')
            state.score++
            state.scoreDisplay.innerHTML = "Score: " + state.score
            playSound('block') 

            if (blocks.every(b => !b.active)) {
                state.gameState = 'win'
                showMenu('win')
                playSound('win') 
                if(state.bgMusic) { state.bgMusic.pause(); state.bgMusic.currentTime=0; }
            }
            return 
        }
    }

    //  Walls Collision
    // Right or Left Wall
    if (state.ballCurrentPosition[0] >= (state.boardWidth - state.ballDiameter) || state.ballCurrentPosition[0] <= 0) {
        changeDirection("wall")
        playSound('wall')
    }
    // Ceiling
    if (state.ballCurrentPosition[1] >= (state.boardHeight - state.ballDiameter)) {
        changeDirection("ceiling")
        playSound('wall') 
    }
    // Floor (Lose Life)
    if (state.ballCurrentPosition[1] <= 0) {
        state.lives--
        state.livesDisplay.innerHTML = "Lives: " + state.lives
        playSound('lose') 
        if (state.lives === 0) {
            state.gameState = 'lose'
            showMenu('lose')
            if(state.bgMusic) state.bgMusic.pause();
        } else {
            resetBall()
        }
    }

    // Paddle Collision
    if (ballBottom <= (state.userCurrentPosition[1] + state.userHeight) && 
        ballBottom >= state.userCurrentPosition[1] &&
        ballRight >= state.userCurrentPosition[0] && 
        ballLeft <= (state.userCurrentPosition[0] + state.userWidth)) {
            
            state.ballCurrentPosition[1] = state.userCurrentPosition[1] + state.userHeight + 2;
            
            changeDirection("userTop")
            playSound('paddle')
    }
}