 // inisial
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score')
    const livesDisplay = document.querySelector('#lives')
    const timerDisplay = document.querySelector('#count')
    const pauseMenu = document.querySelector('#pauseMenu')
    const winMenu = document.querySelector('#winMenu')
    const loseMenu = document.querySelector('#loseMenu')
    const gameContainer = document.getElementById('game-container')
    const bgMusic = document.getElementById('bgMusic')
    bgMusic.volume = 0.3

    const boardWidth = 560
    const boardHeight = 300
    
    // Ball
    const ballDiameter = 20
    const ballStart = [270, 40]
    let ballCurrentPosition = [...ballStart]
    let xDirection = -2
    let yDirection = 2

    // User
    const userStart = [230, 10]
    let userCurrentPosition = [...userStart]
    const userWidth = 100
    const userHeight = 20

    // Blocks
    const blockWidth = 100
    const blockHeight = 20

    // State
    let gameState = 'initial'
    let lastKeyPress = ''
    let score = 0
    let lives = 3
    let timer = 0
    let timerInterval = null
    // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const audioCtx=new AudioContext()

    function playSound(type) {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        const now = audioCtx.currentTime;

        if (type === 'paddle') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'block') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'wall') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, now);
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.05);
        } else if (type === 'win') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(500, now);
            osc.frequency.setValueAtTime(600, now + 0.1);
            osc.frequency.setValueAtTime(1000, now + 0.2);
            gainNode.gain.setValueAtTime(0.1, now);
            gainNode.gain.linearRampToValueAtTime(0, now + 0.6);
            osc.start(now);
            osc.stop(now + 0.6);
        } else if (type === 'lose') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.5);
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.linearRampToValueAtTime(0, now + 0.5);
            osc.start(now);
            osc.stop(now + 0.5);
        }
    }

    function scaleGame() {
        const width= window.innerWidth
        const height =window.innerHeight
        const gameBasewidth=650
        const gameBaseheight=600
        let scale=Math.min(width/gameBasewidth,height/gameBaseheight)
        scale=scale*0,95
        gameContainer.style.transform=`scale ${scale}`
    }

    class Block {
        constructor(xAxis, yAxis) {
            this.bottomLeft = [xAxis, yAxis]
            this.active = true
            this.element = null
        }
    }

    let blocks = []

    function initBlocks() {
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
            grid.appendChild(block)
            blockData.element = block
        })
    }

    function generateRandomColor() {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)]
        return color
    }

    //  DRAWING 
    const user = document.createElement("div")
    user.classList.add("user")
    grid.appendChild(user)

    const ball = document.createElement("div")
    ball.classList.add("ball")
    grid.appendChild(ball)

    function drawUser() {
        user.style.transform = `translate(${userCurrentPosition[0]}px, -${userCurrentPosition[1]}px)`
    }
    function drawBall() {
        ball.style.transform = `translate(${ballCurrentPosition[0]}px, -${ballCurrentPosition[1]}px)`
    }

    function startTimer() {
        if (timerInterval) clearInterval(timerInterval)
        timerInterval = setInterval(() => {
            if (gameState === 'playing') {
                timer++
                timerDisplay.innerHTML = "Timer: " + timer + "s"
            }
        }, 1000)
    }

    function checkForCollisions() {
        const ballLeft = ballCurrentPosition[0]
        const ballRight = ballCurrentPosition[0] + ballDiameter
        const ballBottom = ballCurrentPosition[1]
        const ballTop = ballCurrentPosition[1] + ballDiameter

        // Blocks
        for (let i = 0; i < blocks.length; i++) {
            if (!blocks[i].active) continue
            const b = blocks[i]
            if (ballTop > b.bottomLeft[1] && ballBottom < b.bottomLeft[1] + blockHeight &&
                ballRight > b.bottomLeft[0] && ballLeft < b.bottomLeft[0] + blockWidth) {
                
                b.active = false
                b.element.classList.add('removed')
                b.element.classList.remove('block')
                changeDirection('block')
                score++
                scoreDisplay.innerHTML = "Score: " + score
                playSound('block') 

                if (blocks.every(b => !b.active)) {
                    gameState = 'win'
                    showMenu('win')
                    playSound('win') 
                    bgMusic.pause();
                    bgMusic.currentTime=0
                }
                return
            }
        }

        // Walls
        if (ballCurrentPosition[1] >= (boardHeight - ballDiameter)) {
            changeDirection("ceiling")
            playSound('wall') 
        } else if (ballCurrentPosition[0] <= 0 || ballCurrentPosition[0] >= (boardWidth - ballDiameter)) {
            changeDirection("wall")
            playSound('wall')
        } else if (ballCurrentPosition[1] <= 0) {
            lives--
            livesDisplay.innerHTML = "Lives: " + lives
            playSound('lose') 
            if (lives === 0) {
                gameState = 'lose'
                showMenu('lose')
                bgMusic.pause();
            } else {
                resetBall()
            }
        }

        // Paddle
        if (ballBottom <= (userCurrentPosition[1] + userHeight) && 
            ballBottom >= userCurrentPosition[1] &&
            ballRight >= userCurrentPosition[0] && 
            ballLeft <= (userCurrentPosition[0] + userWidth)) {
             changeDirection("userTop")
             playSound('paddle') // SOUND
        }
    }

    function changeDirection(type) {
        if (type === "wall") xDirection *= -1
        if (type === "ceiling") yDirection = -2
        if (type === "block") yDirection *= -1
        if (type === "userTop") yDirection = 2
    }

    function resetBall() {
        ballCurrentPosition = [...ballStart]
        userCurrentPosition = [...userStart]
        xDirection = -2
        yDirection = 2
        drawUser()
        drawBall()
        gameState = 'initial'
    }

    function fullRestart() {
        score = 0
        lives = 3
        timer = 0
        gameState = 'initial'
        scoreDisplay.innerHTML = "Score: 0"
        livesDisplay.innerHTML = "Lives: 3"
        timerDisplay.innerHTML = "Timer: 0s"
        ballCurrentPosition = [...ballStart]
        userCurrentPosition = [...userStart]
        initBlocks()
        drawUser()
        drawBall()
        showMenu('none')
        startTimer()
    }

    function showMenu(type) {
        pauseMenu.style.display = 'none'
        winMenu.style.display = 'none'
        loseMenu.style.display = 'none'
        if (type === 'pause') pauseMenu.style.display = 'block'
        if (type === 'win') winMenu.style.display = 'block'

        if (type === 'lose') loseMenu.style.display = 'block'
    }

    function updateGameState() {
        if (gameState === 'playing') {
            ballCurrentPosition[0] += xDirection
            ballCurrentPosition[1] += yDirection
            checkForCollisions()

            if (lastKeyPress === 'left' && userCurrentPosition[0] > 0) {
                userCurrentPosition[0] -= 6
            }
            if (lastKeyPress === 'right' && userCurrentPosition[0] < (boardWidth - userWidth)) {
                userCurrentPosition[0] += 6
            }
            drawBall()
            drawUser()
        }
    }

    // CONTROLS 
    document.addEventListener('keydown', e => {
        if(e.key === 'ArrowLeft') lastKeyPress = 'left'
        if(e.key === 'ArrowRight') lastKeyPress = 'right'
        
        if (e.key === 's' || e.key === 'S') {
            // Enable Audio on User Interaction
            if (audioCtx.state === 'suspended') audioCtx.resume();

            if (gameState === 'initial' || gameState === 'pause') {
                gameState = 'playing'
                showMenu('none')
                if (!timerInterval) startTimer()
                    bgMusic.play(); 
            }
        }
        if (e.key === 'p' || e.key === 'P') {
            if (gameState === 'playing') {
                gameState = 'pause'
                showMenu('pause')
                bgMusic.pause();
            }
        }
        if (e.key === 'r' || e.key === 'R') {
            fullRestart()
            bgMusic.pause();
        bgMusic.currentTime = 0;

        }
    })

    document.addEventListener('keyup', e => {
        if ((e.key === 'ArrowLeft' && lastKeyPress === 'left') || 
            (e.key === 'ArrowRight' && lastKeyPress === 'right')) {
            lastKeyPress = ''
        }
    })

    // init logic
    window.addEventListener('resize', scaleGame);
    window.addEventListener('load', scaleGame);
    initBlocks()
    drawUser()
    drawBall()
    startTimer()

    function loop() {
        updateGameState()
        requestAnimationFrame(loop)
    }
    loop()