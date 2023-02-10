
const gridElement = document.querySelector('.grid')
let sidelength = 10
let cellNumber = sidelength ** 2


let playElement = document.querySelector('.play')
let clicked = false

playElement.addEventListener('click', playClick) 




// FUNCTIONS

function cellClick() {
    console.log(this.innerHTML)
    this.classList.add('clicked')
    this.removeEventListener('click', cellClick)
}

function playClick() {
    if (clicked = true) {
        gridElement.innerHTML = ''
    }

    for (let i = 0; i < cellNumber; i++) {
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
    clicked = true

    console.log(this)

}



