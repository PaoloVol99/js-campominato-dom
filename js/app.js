
const gridElement = document.querySelector('.grid')
let sidelength = 10
let cellNumber = sidelength ** 2


let playElement = document.querySelector('.play')
let clicked = false

playElement.addEventListener('click', function() {

    if (clicked = true) {
        gridElement.innerHTML = ''
    }

    for (let i = 0; i < cellNumber; i++) {
        let num = i + 1
        const cell = `<div class="cell" style="width: calc(100% / ${sidelength});">${num}</div>`
        gridElement.innerHTML += cell
    }
    // gridElement.classList.add('grid-show')
    // playElement.classList.add('display-none')
    let cellElement = document.querySelectorAll('.cell')
    console.log(typeof cellElement, cellElement)
    
    for (let i = 0; i < cellElement.length; i++) {
        cellElement[i].addEventListener('click', function() {
            console.log(i + 1)
            cellElement[i].classList.add('clicked')
        })
    }
    playElement.innerHTML = 'RESTART'
    clicked = true
})
    



