
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
        cellElement[i].addEventListener('contextmenu', cellRightClick)
        cellElement[i].setAttribute("num", i + 1)
        cellElement[i].addEventListener('click', cellClick)
        cellElement[i].style.color = "white"
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
    if (bombs.includes(parseInt(this.getAttribute("num")))) {
        this.classList.add('bomb')
        this.innerHTML = `<i class="fa-solid fa-bomb"></i>`
        gameOver = true
    } else {
        pointcounter++
        this.classList.add('clicked')
        points.innerHTML = 100 * pointcounter

        let firstRow = []
        let firstColumn = []
        let lastRow = []
        let lastColumn = []
        let number = parseInt(this.getAttribute("num"))
        this.innerHTML = 0

        for (let i = 1; i < cellTotal + 1; i++) {
            if (i === 1) {
                firstColumn.push(i)
                firstRow.push(i)
            } else if (i === sidelength * sidelength) {
                lastColumn.push(i)
                lastRow.push(i)
            } else if ((i - 1) % sidelength === 0 && i > sidelength * (sidelength - 1)) {
                firstColumn.push(i)
                lastRow.push(i)
            } else if (i === sidelength) {
                firstRow.push(i)
                lastColumn.push(i)
            } else if(i <= sidelength) {
                firstRow.push(i)
            } else if (i > sidelength * (sidelength - 1)) {
                lastRow.push(i) 
            } else if (i % sidelength === 0) {
                lastColumn.push(i) 
            } else if ((i - 1) % sidelength === 0) {
                firstColumn.push(i) 
            }
        }
        console.log(firstRow, firstColumn, lastRow, lastColumn)
        console.log('sidelength:', sidelength)

        if  ((!firstRow.includes(number) &&
            !lastRow.includes(number) &&
            !firstColumn.includes(number) &&
            !lastColumn.includes(number)) &&
            (bombs.includes(number - (sidelength - 1)) ||
            bombs.includes(number - (sidelength)) ||
            bombs.includes(number - (sidelength + 1)) ||
            bombs.includes(number - 1) ||
            bombs.includes(number + 1) ||
            bombs.includes(number + (sidelength - 1)) ||
            bombs.includes(number + (sidelength)) ||
            bombs.includes(number + (sidelength + 1)))) {
                console.log(number)
                this.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`
                this.style.backgroundColor = 'yellow'
                this.style.color = 'black' 
        } else if ((firstRow.includes(number) &&
            !lastRow.includes(number) &&
            !firstColumn.includes(number) &&
            !lastColumn.includes(number)) &&
            (bombs.includes(number - 1) ||
            bombs.includes(number + 1) ||
            bombs.includes(number + (sidelength - 1)) ||
            bombs.includes(number + (sidelength)) ||
            bombs.includes(number + (sidelength + 1)))) {
                this.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`
                this.style.backgroundColor = 'yellow'
                this.style.color = 'black' 
        } else if ((!firstRow.includes(number) &&
            lastRow.includes(number) &&
            !firstColumn.includes(number) &&
            !lastColumn.includes(number)) &&
            (bombs.includes(number - (sidelength - 1)) ||
            bombs.includes(number - (sidelength)) ||
            bombs.includes(number - (sidelength + 1)) ||
            bombs.includes(number - 1) ||
            bombs.includes(number + 1))) {  
                this.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`
                this.style.backgroundColor = 'yellow'
                this.style.color = 'black' 
        } else if ((!firstRow.includes(number) &&
            !lastRow.includes(number) &&
            firstColumn.includes(number) &&
            !lastColumn.includes(number)) &&
            (bombs.includes(number - (sidelength)) ||
            bombs.includes(number - (sidelength - 1)) ||
            bombs.includes(number + 1) ||
            bombs.includes(number + (sidelength)) ||
            bombs.includes(number + (sidelength + 1)))) {
                this.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`
                this.style.backgroundColor = 'yellow'
                this.style.color = 'black' 
        } else if ((!firstRow.includes(number) &&
            !lastRow.includes(number) &&
            !firstColumn.includes(number) &&
            lastColumn.includes(number)) &&
            (bombs.includes(number - (sidelength + 1)) ||
            bombs.includes(number - (sidelength)) ||
            bombs.includes(number - 1) ||
            bombs.includes(number + (sidelength - 1)) ||
            bombs.includes(number + (sidelength)))) {
                this.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`
                this.style.backgroundColor = 'yellow'
                this.style.color = 'black' 
        } else if ((firstRow.includes(number) &&
            firstColumn.includes(number)) &&
            (bombs.includes(number + 1) ||
            bombs.includes(number + (sidelength)) ||
            bombs.includes(number + (sidelength + 1)))) {
                this.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`
                this.style.backgroundColor = 'yellow'
                this.style.color = 'black' 
        } else if ((lastRow.includes(number) &&
            lastColumn.includes(number)) &&
            (bombs.includes(number - 1) ||
            bombs.includes(number - (sidelength)) ||
            bombs.includes(number - (sidelength + 1)))) {
                this.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`
                this.style.backgroundColor = 'yellow'
                this.style.color = 'black' 
        } else if ((firstRow.includes(number) &&
            lastColumn.includes(number)) &&
            (bombs.includes(number - 1) ||
            bombs.includes(number + (sidelength - 1)) ||
            bombs.includes(number + (sidelength)))) {
                this.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`
                this.style.backgroundColor = 'yellow'
                this.style.color = 'black' 
        } else if ((lastRow.includes(number) &&
            firstColumn.includes(number)) &&
            (bombs.includes(number - (sidelength)) ||
            bombs.includes(number - (sidelength - 1)) ||
            bombs.includes(number + 1))) {
                this.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`
                this.style.backgroundColor = 'yellow'
                this.style.color = 'black' 
        } else {
            this.innerHTML = `<i class="fa-solid fa-check"></i>`
            this.style.backgroundColor = 'green'        
        }
    }
    this.removeEventListener('click', cellClick)
    this.removeEventListener('contextmenu', cellRightClick)
    
    if (gameOver === true) {
        for (let i = 0; i < cellElement.length; i++) {
            cellElement[i].removeEventListener('click', cellClick)
            cellElement[i].removeEventListener('contextmenu', cellRightClick)
            if (bombs.includes(parseInt(cellElement[i].getAttribute("num")))) {
                cellElement[i].classList.add('bomb')
                cellElement[i].innerHTML = `<i class="fa-solid fa-bomb"></i>`
                if (cellElement[i].style.backgroundColor === 'orange') {
                    points.innerHTML = parseInt(points.innerHTML) + 500
                    cellElement[i].style.color = 'green'
                    cellElement[i].style.backgroundColor = 'orange'
                } 
                // } else {
                //     if (cellElement[i].style.backgroundColor === 'orange') {
                //         cellElement[i].style.backgroundColor = 'red'
                //         points.innerHTML = parseInt(points.innerHTML) - 100
                //     }
            } else {
                    if (cellElement[i].style.backgroundColor === 'orange') {
                        cellElement[i].style.backgroundColor = 'red'
                        cellElement[i].innerHTML = `<i class="fa-solid fa-xmark"></i>`
                        cellElement[i].style.color = 'white'
                        points.innerHTML = parseInt(points.innerHTML) - 500
                    }
            }
        gameOverText.style.display = 'block'
        }
    }

}

function cellRightClick(event) {
    event.preventDefault()
    this.innerHTML = `<i class="fa-solid fa-question"></i>`
    this.style.color = 'white'
    this.style.backgroundColor = 'orange'
}
