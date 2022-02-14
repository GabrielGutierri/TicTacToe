const XClass = 'x';
const CircleClass = 'circle';
const WINNINGCOMBO = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const board = document.querySelector('.container');
const tictactoe = document.querySelectorAll('.cell');
const winningTextMessage = document.querySelector('.ending-message');
const winningSection = document.querySelector('.ending-layout');
const restartButton = document.querySelector('.ending-button');
let circle;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circle = false;
    tictactoe.forEach((cell) =>{
        cell.classList.remove(XClass);
        cell.classList.remove(CircleClass);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    })
    setBoardHover();
    winningSection.classList.remove('show');
}


function handleClick(e) {
    const cell = e.target;
    const current = circle ? CircleClass : XClass;
    placeMark(cell, current);
    if (checkWin(current)) {
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        swapTurns();
    setBoardHover();
    }
    
}

function isDraw(){
    return [...tictactoe].every(cell => {
        return cell.classList.contains(XClass) || cell.classList.contains(CircleClass);
    })
}

function endGame(draw){
    if(draw){
        winningTextMessage.innerHTML = "Draw!";
    }
    else{
        winningTextMessage.innerText = `${circle? "O's" : "X's"} Wins!`;
    }
    winningSection.classList.add('show');
}


function placeMark(cell, current) {
    cell.classList.add(current);
}

function swapTurns() {
    circle = !circle;
}

function setBoardHover() {
    board.classList.remove(XClass);
    board.classList.remove(CircleClass);

    if (circle)
        board.classList.add(CircleClass);
    else
        board.classList.add(XClass);

}

function checkWin(current) {
    return WINNINGCOMBO.some(combination => {
        return combination.every(index => {
            return tictactoe[index].classList.contains(current);
        })
    });
}