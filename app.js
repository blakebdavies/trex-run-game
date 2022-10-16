document.addEventListener('DOMContentLoaded', () => {
    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')
    const body = document.querySelector('body')
    const alert = document.getElementById('alert')
    let isJumping = false
    let gravity = 0.9
    let isGameOver = false

    function control(e) {
        if (e.keyCode === 32) {
            if (!isJumping) {
                isJumping = true
                jump()
            }
        }
    }
    // requires two parameters to for event listener to work - event, and function when event is triggered
    document.addEventListener('keyup', control)

    let position = 0
    function jump() {
        let count = 0
        let timerId = setInterval(function () {
            // move down
            if (count === 15) {
                //stop the up functionality from running
                clearInterval(timerId);
                let downTimerId = setInterval(function () {
                    if (count === 0) {
                        //stop once the position is 0
                        clearInterval(downTimerId);
                        isJumping = false;
                    }
                    position -= 5
                    count--
                    position = position * gravity
                    dino.style.bottom = position + 'px'
                }, 20)
            }
            //move up
            position +=30
            count++
            position = position * gravity
            dino.style.bottom = position + 'px'
        },20)
    }

    function generateObstacles() {
        //getting a number between 0 and 4000 ms at random
        let randomTime = Math.random() * 4000
        let obstaclePosition = 1000
        const obstacle = document.createElement('div')
        if (!isGameOver) obstacle.classList.add('obstacle')
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px'

        //setInterval and clearInterval to move obstacle incrementally
        let timerId = setInterval(function() {
            if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                clearInterval(timerId)
                alert.innerHTML = 'Game Over 🦖'
                isGameOver = true;
                //remove all children
                body.removeChild(body.firstChild)
                while (grid.firstChild) {
                    grid.removeChild(grid.lastChild)
                }
            }
            obstaclePosition -=10
            obstacle.style.left = obstaclePosition + 'px'
        },20)
        if (!isGameOver) setTimeout(generateObstacles, randomTime)
    }
    generateObstacles()
});
