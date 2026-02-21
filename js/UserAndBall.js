import{state} from "./state.js"

// --- Create User and Ball ---
const user = document.createElement("div")
user.classList.add("user")
state.grid.appendChild(user)

const ball = document.createElement("div")
ball.classList.add("ball")
state.grid.appendChild(ball)

export function drawUser() {
    user.style.transform = `translate(${state.userCurrentPosition[0]}px, -${state.userCurrentPosition[1]}px)`
}
export function drawBall() {
    ball.style.transform = `translate(${state.ballCurrentPosition[0]}px, -${state.ballCurrentPosition[1]}px)`
}