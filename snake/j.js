let inputDir = { x: 0, y: 0 }
let speed = 5
let lastPaintTime = 0
let score=0
let snakeArr = [
    { x:13, y: 15 }
]
let board = document.getElementById('board')
let food = { x: 10, y: 15 }



function main(ctime) {
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) {
        return
    }
    lastPaintTime = ctime
    gameEngine()

}
function isCollide(snakeArr){
    for(let j=1;j<snakeArr.length;j++){
        if(snakeArr[j].x===snakeArr[0].x && snakeArr[j].y===snakeArr[0].y){
            return true
        }

    }
    if(snakeArr[0].x>=18 || snakeArr[0].y>=18 ||snakeArr[0].x<=0 ||snakeArr[0].y<=0 ){
        return true
    }
    else{
        false
    }

}
function random(){
    return ((Math.floor(Math.random()*17))+1)

}
function gameEngine() {
    if(isCollide(snakeArr)){
        inputDir={x:0,y:0}
        alert("Game over press key to start again!")
        snakeArr=[
            { x: 13, y: 15 }
        ]
        score=0
    }
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
        food={x:random(),y:random()}
        
    }
    for(let i=(snakeArr.length-2);i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]}
    }
    snakeArr[0].x+=inputDir.x
    snakeArr[0].y+=inputDir.y
    board.innerHTML = ''
    snakeArr.forEach(function (e, index) {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index === 0) {
            snakeElement.setAttribute('class', 'head')

        }
        else {
            snakeElement.setAttribute('class', 'snake')
        }

        board.appendChild(snakeElement)

    })
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.setAttribute('class', 'food')
    board.appendChild(foodElement)


}
window.requestAnimationFrame(main)
document.addEventListener('keydown', function (e) {
    inputDir = { x: 0, y: 1 }
    switch (e.key) {
        case 'ArrowLeft':
            inputDir.x=-1
            inputDir.y=0
            console.log("arrow left")
            break
        case 'ArrowRight':
            inputDir.x=1
            inputDir.y=0
            console.log("arrow right")
            break
        case 'ArrowUp':
            inputDir.x=0
            inputDir.y=-1
            console.log("arrow up")
            break
        case 'ArrowDown':
            inputDir.x=0
            inputDir.y=1
            console.log("arrow down")
            break

    }
})