// create class x
const xClass = 'x'

// mcreate class circle
const circleClass = 'circle'

// create winning data
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// create turn variable
let circleTurn

// take the board id
const board = document.getElementById('board')

// take the winning message id
const winningMessageElement = document.getElementById('winningMessage')

// take the id restart button
const restartButton = document.getElementById('restartButton')

// accessing data-winning-message-cell
const winningMessageTextElement = document.querySelector('[data-winning-message-cell]')

// inserts all cells into the cellElements variable
const cellElements = document.querySelectorAll('[data-cell')

// start the game
startGame()

// make the restart button run
restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false

  // make a cell can only be clicked 1 time
  cellElements.forEach(cell => {
    cell.classList.remove(xClass)
    cell.classList.remove(circleClass)
    cell.addEventListener('click', handleClick, { once: true })
  })

  // displays turn when cell is hovered
  setBoardHoverClass()

  // delete the show class on the board
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  // place mark
  const cell = e.target
  const currentClass = circleTurn ? circleClass : xClass
  placeMark(cell, currentClass)

  // check for win
  if (checkWin(currentClass)) {
    endGame(false)

    // check for draw
  } else if(isDraw()) {
    endGame(true)
  } else {
    // switch turns
    swapTurns()
    
    // board hover
    setBoardHoverClass()
  }

}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

// create a turn shift
function swapTurns() {
  circleTurn = !circleTurn
}

// hover board function
function setBoardHoverClass() {
  board.classList.remove(xClass)
  board.classList.remove(circleClass)

  if (circleTurn) {
    board.classList.add(circleClass)
  } else {
    board.classList.add(xClass)
  }
}

// function performs a win check
function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

// function game is complete
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!"
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }

  winningMessageElement.classList.add('show')
}

// function when the game is draw
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
  })
}