
import {initBlocks} from "./blocksAndit'scolours.js"
import {drawBall,drawUser} from "./UserAndBall.js"
import {startTimer} from "./Timer.js"
import {updateGameState} from "./controlsAndStateManagment/updateGameState.js"
import { Listeners } from "./listeners/listners.js"
// Listeners()
initBlocks()
drawUser()
drawBall()
startTimer()
Listeners()
// Game Loop
function loop() {
    updateGameState()
    requestAnimationFrame(loop)
}
loop()