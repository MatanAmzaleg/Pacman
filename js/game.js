'use strict'

const WALL = '#'
const FOOD = '◾'
const EMPTY = ' '
const SPECIALFOOD = '🥩'
const CHERRY = '🍒'

const WALL_IMG = '<img src="img/wall.png">'
var GHOST_IMG = '<img src="img/ghost.png">'
var BLUE_GHOST_IMG = '<img src="img/blue-ghost.png">'

var gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gFoodOnBoard
var gCherryInterval

function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)

    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gFoodOnBoard = getFoodOnBoard(gBoard)
    gCherryInterval = setInterval(addCherry, 5000)
}

function buildBoard() {
    const SIZE = 17
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 2 && i > 2 && i < 8) || (j === 14 && i > 2 && i < 8) || (j === 8 && i > 4 && i < SIZE - 4) ||
                (j === 2 && i > 9 && i < SIZE - 2) ||
                (j === 14 && i > 9 && i < SIZE - 2) ||
                (j === 14 && i > 9 && i < SIZE - 2) ||
                (j > 8 && i === 2 && j < 13)||
                (j > 3 && i === 14 && j < 8)||
                (j > 3 && i === 2 && j < 8)||
                (j > 8 && i === 14 && j < 13)||
                (j === 5 && i > 5 && i < 9)||
                (j === 11 && i > 8 && i < 12)) {
                board[i][j] = WALL_IMG
            }
        }
    }
    board[1][1] = board[1][15] = board[15][15] = board[15][1] = SPECIALFOOD
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    clearInterval(gCherryInterval)
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
}

function playAgain() {
    console.log('hello')

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)

    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    gFoodOnBoard = -1
    gGame.score = 0
}

function getFoodOnBoard(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === FOOD) gFoodOnBoard++
            if (board[i][j] === SPECIALFOOD) gFoodOnBoard += 10
        }
    }
    return gFoodOnBoard
}

function checkVictory() {
    var foodLeft = isFoodLeft()
    console.log(foodLeft);
    if (!foodLeft) {
        console.log(gFoodOnBoard);
        var elModal = document.querySelector('.modal')
        elModal.style.display = 'block'
        var elModalH2 = document.querySelector('.modal h1')
        elModalH2.innerText = 'Victory!'
        gameOver()
    }
}

function addCherry() {
    var emptyPos = getEmptyPos()
    gBoard[emptyPos.i][emptyPos.j] = CHERRY
    renderCell(emptyPos, CHERRY)
}

function getEmptyPos() {
    var emptyPoses = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            if (cell === EMPTY) {
                var pos = { i: i, j: j }
                emptyPoses.push(pos)
            }
        }
    }
    var randIdx = getRandomIntInclusive(0, emptyPoses.length)
    return emptyPoses[randIdx]
}

function isFoodLeft() {
    var foodLeft = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            if (cell === CHERRY || cell === FOOD || cell === SPECIALFOOD) foodLeft++
        }
    }
    if (foodLeft > 0) return true
    else return false

}