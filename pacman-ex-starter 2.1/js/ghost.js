'use strict'

const GHOST = '&#9781;'

var gDeadGhosts = []
var gGhosts = []
var gIntervalGhosts

function createGhost(board) {
    const ghost = {
        location: {
            i: 8,
            j: 8
        },
        currCellContent: FOOD
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST_IMG
}
console.log(gGhosts[0]);

function createGhosts(board) {
    gGhosts = []
    for(var i = 0; i < 6; i++){
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 700)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {

    const moveDiff = getMoveDiff();
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    
    if (nextCell === WALL_IMG) return
    if (nextCell === GHOST) return
    if(gPacman.isSuper){
        if(nextCell === PACMAN){
            gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
            renderCell(gPacman.location, EMPTY)
            gPacman.location = nextLocation
            gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
            renderCell(gPacman.location, PACMAN)
            var ghostIdx = gGhosts.indexOf(ghost)
            var deadGhost = gGhosts.splice(ghostIdx,1)
            gDeadGhosts.push(deadGhost)
            
        }
    } 
    else if (nextCell === PACMAN) {
        var elModal = document.querySelector('.modal')
        elModal.style.display = 'block'
        gameOver()
        return
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // DOM
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0,  j: 1  }
        case 2: return { i: 1,  j: 0  }
        case 3: return { i: 0,  j: -1 }
        case 4: return { i: -1, j: 0  }
    }
}

function getGhostHTML(ghost) {
    return `<span>${GHOST_IMG}</span>`
}

function renderGhosts(){
    gPacman.isSuper = false
    for(var i = 0 ; i < gDeadGhosts.length ; i++){
        var ghost = gDeadGhosts.splice(i, 1)[0]
        ghost.location = {i:8 , j:8}
        gGhosts.push(ghost)
        renderCell(ghost.location, GHOST_IMG)
    }
    GHOST_IMG = '<img src="img/ghost.png">'
}