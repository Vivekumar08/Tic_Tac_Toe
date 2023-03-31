const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const PLUS_CLASS = 'plus'
const WINNING_COMBINATIONS = [
  [0,1,2],
  [1,2,3],
  [2,3,4],
  [5,6,7],
  [6,7,8],
  [7,8,9],
  [10,11,12],
  [11,12,13],
  [12,13,14],
  [15,16,17],
  [16,17,18],
  [17,18,19],
  [20,21,22],
  [21,22,23],
  [22,23,24],
  
  [0,5,10],
  [5,10,15],
  [10,15,20],
  [1,6,11],
  [6,11,16,21],
  [11,16,21],
  [2,7,12],
  [7,12,17],
  [12,17,22],
  [3,8,13],
  [8,13,18],
  [13,18,23],
  [4,9,14],
  [9,14,19],
  [14,19,24],

  [0,6,12],
  [6,12,18],
  [12,18,24],
  [4,8,12],
  [8,12,16],
  [12,16,20],

  [5,11,17],
  [11,17,23],

  [1,7,13],
  [7,13,19],
  
  [10,16,22],
  [2,8,14],

  [3,7,11],
  [7,11,15],

  [9,13,17],
  [13,17,21],

  [14,18,22],
  [2,6,10],

]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS 
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(PLUS_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else  {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}