
const gridElement = document.querySelector('.grid')
let sidelength = 10
let cellTotal = sidelength ** 2
let points = document.querySelector('.points')
let pointcounter = 0


// GENERAZIONE BOMBE
let bombs = []

while (bombs.length < 16) {
    const bomb = Math.floor(Math.random() * cellTotal + 1)
    if (!bombs.includes(bomb)) {
        bombs.push(bomb)
    }
    console.log('numero generato', bomb, bombs )
}

// INIZIO GIOCO

let playElement = document.querySelector('.play')


playElement.addEventListener('click', function(){
    gridElement.innerHTML = ''
    points.innerHTML = ''
    pointcounter = 0
    
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

}) 


// let cellElement = document.querySelectorAll('.cell')
// console.log(typeof cellElement, cellElement)

// for (let i = 0; i < cellElement.length; i++) {
//     cellElement[i].addEventListener('click', cellClick)
// }








// FUNCTIONS

function cellClick(event) {
    console.log(event)
    console.log(this.innerHTML)
    let cellNumber = this.innerHTML
    if (bombs.includes(parseInt(cellNumber))) {
        this.classList.add('bomb')
        this.innerHTML = `<i class="fa-solid fa-bomb"></i>`
    } else {
        pointcounter++
        this.classList.add('clicked')
        points.innerHTML = 100 * pointcounter
    }
    this.removeEventListener('click', cellClick)
}

// function playClick() {

    // gridElement.innerHTML = ''
    

    // for (let i = 0; i < cellNumber; i++) {
    //     let num = i + 1
    //     const cell = `<div class="cell" style="width: calc(100% / ${sidelength});">${num}</div>`
    //     gridElement.innerHTML += cell
    // }


    // let cellElement = document.querySelectorAll('.cell')
    // console.log(typeof cellElement, cellElement)
    
    // for (let i = 0; i < cellElement.length; i++) {
    //     cellElement[i].addEventListener('click', cellClick)
    // }
    // playElement.innerHTML = 'RESTART'

    // console.log(this)

// }



