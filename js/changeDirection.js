import { state } from "./state.js"
export function changeDirection(type) {
    if (type === "wall") state.xDirection *= -1
    if (type === "ceiling") state.yDirection = -2
    if (type === "block") state.yDirection *= -1
    if (type === "userTop") state.yDirection = 2 
}