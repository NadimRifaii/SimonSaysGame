const levelTitle = document.querySelector('#level-title')
const buttons = document.querySelectorAll('.btn')
const overlay = document.querySelector('.overlay')
let mouseEventsDisabled = true
let orderArray = []
let level = 1
let currentIndex = 0
let userCanClick = false;

function addEventListenersToDocument() {
  document.addEventListener('mousedown', (event) => {
    if (mouseEventsDisabled) {
      event.preventDefault()
      alert('Please press a keyboard key before')
    }
  })
  document.addEventListener('keydown', (event) => {
    mouseEventsDisabled = false
    if (level == 1) {
      simonPress(level)
      level = changeLevel(level)
    }
  })
}
function addEventListenersToButtons() {
  buttons.forEach(button => {
    button.addEventListener('click', clickHandler)
  })
}
function playSound(id) {
  const audio = document.querySelector(`#${id}-sound`)
  audio.play()
}
let clickHandler = (event) => {
  playSound(event.target.classList[1])
  toggleClass(event.target, 'pressed')
  if (event.isTrusted && userCanClick) {
    playerPress(event.target.classList[1], currentIndex)
  }
}
function toggleClass(element, clas) {
  element.classList.add(clas);
  setTimeout(() => {
    element.classList.remove(clas)
  }, 200)
}
function simonPress(level) {
  userCanClick = false;
  orderArray = []
  for (let i = 0; i < level; i++) {
    const randomIndex = getRandomIndex()
    setTimeout(() => {
      buttons[randomIndex].click()
    }, 1000 * i)
    orderArray.push(buttons[randomIndex].classList[1])
  }
  setTimeout(() => {
    userCanClick = true;
    overlay.classList.remove('active')
  }, 1000 * level);
  console.log(orderArray)
}
function playerPress(buttonColor) {
  if (currentIndex == orderArray.length - 1 && orderArray[currentIndex] == buttonColor) {
    overlay.classList.add('active')
    nextLevel()
    return
  }
  else if (currentIndex == orderArray.length || orderArray[currentIndex] != buttonColor) {
    overlay.classList.add('active')
    stopGame()
    toggleClass(document.body, 'game-over')
    return
  }
  currentIndex++
}
function stopGame() {
  currentIndex = 0
  level = 1
  levelTitle.innerText = 'Game over , press any key to restart'
  playSound('wrong')
}
function nextLevel() {
  currentIndex = 0
  level = changeLevel(level)
  setTimeout(() => {
    simonPress(level - 1)
  }, 2000)
}
function getRandomIndex() {
  return Math.floor(Math.random() * 3)
}


function changeLevel(level) {
  levelTitle.innerText = `level ${level}`
  level++
  return level
}
addEventListenersToDocument()
addEventListenersToButtons()
