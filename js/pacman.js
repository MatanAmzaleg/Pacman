'use strict'

const PACMAN = '😷';
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 12,
            j: 12
        },
        isSuper: false,
        degrees: 0
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    checkVictory()
    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL_IMG) return
    if (nextCell === FOOD) {
        updateScore(1)

    }
    if (nextCell === CHERRY) {
        updateScore(10)
    }
    if (nextCell === SPECIALFOOD) {
        setTimeout(renderGhosts, 5000);
        GHOST_IMG = BLUE_GHOST_IMG
        gPacman.isSuper = true
        updateScore(10)

    }
    if (gPacman.isSuper) {
        if (nextCell === GHOST) {
            for (var x = 0; x < gGhosts.length; x++) {
                if (gGhosts[x].location.i === nextLocation.i && gGhosts[x].location.j === nextLocation.j) {
                    var ghostIdx = x
                    var deadGhost = gGhosts.splice(ghostIdx, 1)[0]
                    gDeadGhosts.push(deadGhost)
                }
            }
            gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
            renderCell(gPacman.location, EMPTY)
            gPacman.location = nextLocation
            gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
            renderCell(gPacman.location, PACMAN)
        }
    }
    else if (nextCell === GHOST) {
        var elModal = document.querySelector('.modal')
        elModal.style.display = 'block'
        gameOver()
        renderCell(gPacman.location, EMPTY)
        return
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            gPacman.degrees = 180
            break;
        case 'ArrowDown':
            nextLocation.i++;
            gPacman.degrees = 0
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            gPacman.degrees = 90
            break;
        case 'ArrowRight':
            nextLocation.j++;
            gPacman.degrees = 270
            break;
        default:
            return null;
    }
    return nextLocation;
}