const levelTitle = document.querySelector('#level-title')
const buttons = document.querySelectorAll('.btn')
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