import { state } from "./state.js"
// --- Blocks Logic ---
export let blocks = []
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.active = true
        this.element = null
    }
}
export function initBlocks() {
    document.querySelectorAll('.block').forEach(b => b.remove())
    
    blocks = [
        new Block(10, 270), new Block(120, 270), new Block(230, 270), new Block(340, 270), new Block(450, 270),
        new Block(10, 240), new Block(120, 240), new Block(230, 240), new Block(340, 240), new Block(450, 240),
        new Block(10, 210), new Block(120, 210), new Block(230, 210), new Block(340, 210), new Block(450, 210),
    ]

    blocks.forEach(blockData => {
        const block = document.createElement("div")
        block.classList.add("block")
        block.style.left = blockData.bottomLeft[0] + "px"
        block.style.bottom = blockData.bottomLeft[1] + "px"
        block.style.backgroundColor = generateRandomColor()
        state.grid.appendChild(block)
        blockData.element = block
    })
}

export function generateRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)]
    return color
}