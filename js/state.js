//  DOM Elements 
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const livesDisplay = document.querySelector('#lives')
const timerDisplay = document.querySelector('#count')
const pauseMenu = document.querySelector('#pauseMenu')
const winMenu = document.querySelector('#winMenu')
const loseMenu = document.querySelector('#loseMenu')
const gameContainer = document.getElementById('game-container')
const bgMusic = document.getElementById('bgMusic')

//  Buttons Elements 
const btnContinue = document.getElementById('btnContinue')
const btnRestart = document.getElementById('btnRestart')
const btnRestartWin = document.getElementById('btnRestartWin')
const btnRestartLose = document.getElementById('btnRestartLose')

if (bgMusic) bgMusic.volume = 0.3

//  Game Constants 
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 20
const userWidth = 100
const userHeight = 20
const blockWidth = 100
const blockHeight = 20

//  Game State Variables 
let timerInterval
let xDirection = -2
let yDirection = 2
let score = 0
let lives = 3
let timer = 0
let gameState = 'initial' 

// Positions
const userStart = [230, 10]
let userCurrentPosition = [...userStart]

const ballStart = [270, 40]
let ballCurrentPosition = [...ballStart]

export let state={
grid,
scoreDisplay ,
livesDisplay ,
timerDisplay ,
pauseMenu ,
winMenu ,
loseMenu ,
gameContainer,
bgMusic,
btnContinue,
btnRestart ,
btnRestartWin ,
btnRestartLose,
boardWidth,
boardHeight,
ballDiameter,
userWidth,
userHeight,
blockWidth,
blockHeight,
timerInterval,
xDirection,
yDirection,
score,
lives,
timer,
gameState,
userStart,
userCurrentPosition,
ballStart,
ballCurrentPosition,
}