'use strict'
const MINE = '$';
//const CELL_WITH_NEGS;
//const CELL_WITHOUT_NEGS;
var gBoard = {
    cell: {
        minesAroundCount: 0,
        isShown: true,
        isMine: false,
        isMarked: true
    }
}
var minesArray = [];
minesArray.push({ i: 0, j: 2 });
minesArray.push({ i: 2, j: 1 });

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gSize;

// runs the game.
function init() {
    buildBoard(4);
}

// creates the board game
function buildBoard(size) {
    gSize = size;
    var mat = [];
    for (var i = 0; i < size; i++) {
        mat.push([]);
        for (var j = 0; j < size; j++) {
            mat[i][j] = {};
            mat[i][j].buttonHtml = '<button class="emptyButton"></div>';
            mat[i][j].cellObject = {
                minesAroundCount: 0,
                isShown: true,
                isMine: false,
                isMarked: true
            }
            for (var index = 0; index < minesArray.length; index++) {
                var mine = minesArray[index];
                if (mine.i == i && mine.j == j) {
                    mat[i][j].cellObject.isMine = true;
                }
            }
        }
    }

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            setCellNumber(mat, mat[i][j].cellObject, i, j);
        }
    }
    renderBoard(mat, ".boardContainer")
}
// Count mines around every board cell and set the cell's minesAroundCount.
function setMinesNegsCount(board) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].cellObj.isMine) {
                minesAroundCount++;
            }
        }
    }
}

// The same thing as setMinesNegsCount ??
function setCellNumber(mat, cellObject, i, j) {
    var negs = getAllNegs({ i: i, j: j });
    var counter = 0;
    for (var index = 0; index < negs.length; index++) {
        var position = negs[index];
        var cellObj = mat[position.i][position.j].cellObject;
        if (cellObj.isMine) {
            counter++;
        }
    }
    return counter;

}

function cellClicked(elCell, i, j) {

}

function cellMarked(elCell) {

}

function checkGameOver() {

}

function expandShown(board, elCell, i, j) {


}

function setEmptyCelll(location) {
    var emptyCell = document.querySelector(`.cell${location.i}-${location.j}`);
    emptyCell.innerHTML = '';
}

function getAllNegs(pos) {
    var negs = [];

    for (var i = pos.i - 1; i <= pos.i + 1 && i < 8; i++) {
        if (i < 0) continue;
        for (var j = pos.j - 1; j <= pos.j + 1 && j < 8; j++) {
            if (j < 0 || (i === pos.i && j === pos.j)) continue;
            negs.push({ i, j });
        }
    }

    return negs;
}

function getEmptyCells() {
    var emptyCells = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === FOOD || gBoard[i][j] === EMPTY) {
                emptyCells.push({ i: i, j: j });
            }
        }
    }
    return emptyCells;
}