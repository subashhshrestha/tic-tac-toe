clickMap = {
    first: 0,
    second: 1,
    third: 2,
    four: 3,
    five: 4,
    six: 5,
    seven: 6,
    eight: 7,
    nine: 8
}

renderMap = {
    0: 'first',
    1: 'second',
    2: 'third',
    3: 'four',
    4: 'five',
    5: 'six',
    6: 'seven',
    7: 'eight',
    8: 'nine'
}

let boardArr = ['', '', '', '', '', '', '', '', '']
let p1 = '';
let p2 = '';
let result = ''

let startbutton = document.getElementById('start');
let restartbutton = document.getElementById('restart');
let playground = document.querySelector('.playground-container');
let startContainer = document.querySelector('#start')
let restartContainer = document.querySelector('#end')
let turnText = document.querySelector('#turn');
restartContainer.style.display = 'none'
startbutton.addEventListener("click", function () {
    p1 = document.getElementById('p1').value;
    p2 = document.getElementById('p2').value;
    if (!p1) {
        p1 = "Player 1"
    }
    if (!p2) {
        p2 = "Player 2"
    }
    startContainer.style.display = "none"
    start()
})
restartbutton.addEventListener("click", function () {
    restartContainer.style.display = "none"
    turnText.style.display = 'block'
    start()
})

function start() {
    boardArr = ['', '', '', '', '', '', '', '', ''];
    render();
    playground.style.display = 'block';
    restartContainer.style.display = 'none'
    enableAllDiv()
    turnText.innerHTML = p1 + " turn!!"
}

function clicked(event) {
    turn = checkTurn();
    turnText.innerHTML = (turn === 'X' ? p2 : p1) + " turn!!"
    boardArr[clickMap[event]] = turn;
    document.getElementById(event).style.pointerEvents = 'none'
    render()
    if (turn === checkWinner(turn)) {
        result = turn;
        disableAllDiv()
        playground.style.display = 'none'
        restartContainer.style.display = 'block'
        turnText.style.display = 'none'
        let resultText = document.querySelector('#result')
        resultText.innerHTML = (turn === 'X' ? p1 : p2) + " Win";

    } else if (checkDraw()) {
        result = 'draw'
        playground.style.display = 'none'
        restartContainer.style.display = 'block'
        turnText.style.display = 'none'
        let resultText = document.querySelector('#result')
        resultText.innerHTML = 'draw'
    }
    // checkTurn()
}

function render() {
    console.log(boardArr)
    for (let [index, val] of boardArr.entries()) {
        document.getElementById(renderMap[index]).innerHTML = val;
    }
}

function checkTurn() {
    let countX = 0;
    let countO = 0;
    for (let [index, val] of boardArr.entries()) {
        x = document.getElementById(renderMap[index]).innerHTML;
        if (x === 'X') {
            countX += 1
        } else if (x === 'O') {
            countO += 1
        }
    }
    if (countX === countO) {
        return 'X';
    } else {
        return 'O';
    }
}

function checkWinner(x) {
    if (boardArr[0] === boardArr[1] && boardArr[0] === boardArr[2] && boardArr[0] === x) {
        return x;
    } else if (boardArr[0] === boardArr[4] && boardArr[0] === boardArr[8] && boardArr[0] === x) {
        return x;
    } else if (boardArr[0] === boardArr[3] && boardArr[0] === boardArr[6] && boardArr[0] === x) {
        return x;
    } else if (boardArr[1] === boardArr[4] && boardArr[1] === boardArr[7] && boardArr[1] === x) {
        return x;
    } else if (boardArr[2] === boardArr[5] && boardArr[2] === boardArr[8] && boardArr[2] === x) {
        return x;
    } else if (boardArr[2] === boardArr[4] && boardArr[2] === boardArr[6] && boardArr[2] === x) {
        return x;
    } else if (boardArr[3] === boardArr[4] && boardArr[0] === boardArr[3] && boardArr[3] === x) {
        return x;
    } else if (boardArr[6] === boardArr[7] && boardArr[6] === boardArr[8] && boardArr[6] === x) {
        return x;
    }
}

function checkDraw() {
    draw = true;
    for (let x of boardArr) {
        if (!x) {
            draw = false;
            break
        }
    }
    return draw;
}

function disableAllDiv() {
    for (let [index, val] of boardArr.entries()) {
        document.getElementById(renderMap[index]).style.pointerEvents = 'none'
    }
}
function enableAllDiv() {
    for (let [index, val] of boardArr.entries()) {
        document.getElementById(renderMap[index]).style.pointerEvents = 'auto'
    }
}