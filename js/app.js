
const gridElement = document.querySelector('.grid')
let playElement = document.querySelector('.play')
const difficultyElement = document.getElementById('difficulty')
let sidelength = 10
console.log(difficultyElement.value)
let cellTotal = sidelength ** 2
let points = document.querySelector('.points')
let pointText = document.querySelector('.point-text')
let pointcounter = 0
let gameOver = false
let gameOverText = document.getElementById('game-over')
let bombs = []

// INIZIO GIOCO

playElement.addEventListener('click', function(){
    gridElement.innerHTML = ''
    points.innerHTML = '0'
    gameOverText.style.display = 'none'
    pointcounter = 0
    gameOver = false
    pointText.style.display = 'block'
    bombs = []

    
    switch (difficultyElement.value) {
        case '10': 
            sidelength = 10
        break;
        case '9':
            sidelength = 9
        break;
        case '7':
                sidelength = 7
        break;
    }
            
    cellTotal = sidelength ** 2
    // GENERAZIONE BOMBE
        
    while (bombs.length < 16) {
        const bomb = Math.floor(Math.random() * cellTotal + 1)
        if (!bombs.includes(bomb)) {
            bombs.push(bomb)
        }
        console.log('numero generato', bomb, bombs)
    }
    
    
    for (let i = 0; i < cellTotal; i++) {
        let num = i + 1
        const cell = `<div class="cell" style="width: calc(100% / ${sidelength});">${num}</div>`
        gridElement.innerHTML += cell
    }
    
    let cellElement = document.querySelectorAll('.cell')
    console.log(typeof cellElement, cellElement)
    
    for (let i = 0; i < cellElement.length; i++) {
        cellElement[i].addEventListener('click', cellClick)
    }
    playElement.innerHTML = 'RESTART'
    
    // FINE GIOCO
            
}) 

// FUNCTIONS

function cellClick(event) {
    console.log(event)
    console.log(gameOver)
    let cellNumber = this.innerHTML
    let cellElement = document.querySelectorAll('.cell')
    if (bombs.includes(parseInt(cellNumber))) {
        this.classList.add('bomb')
        this.innerHTML = `<i class="fa-solid fa-bomb"></i>`
        gameOver = true
    } else {
        pointcounter++
        this.classList.add('clicked')
        points.innerHTML = 100 * pointcounter
    }
    this.removeEventListener('click', cellClick)
    if (gameOver === true) {
        for (let i = 0; i < cellElement.length; i++) {
            cellElement[i].removeEventListener('click', cellClick)
            if (bombs.includes(parseInt(cellElement[i].innerHTML))) {
                cellElement[i].classList.add('bomb')
                cellElement[i].innerHTML = `<i class="fa-solid fa-bomb"></i>`
            }
        }
        gameOverText.style.display = 'block'
    }
}



