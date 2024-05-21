const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
const canvasSize = {
    width: canvas.width,
    height: canvas.height,
};

let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let direction = null;

document.addEventListener('keydown', setDirection);

function setDirection(event) {
    if (event.keyCode == 37 && direction != 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode == 38 && direction != 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode == 39 && direction != 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode == 40 && direction != 'UP') {
        direction = 'DOWN';
    }
}

let food = {
    x: Math.floor(Math.random() * (canvasSize.width / box)) * box,
    y: Math.floor(Math.random() * (canvasSize.height / box)) * box,
};

let score = 0;

function draw() {
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? '#ffffff' : '#00ff00';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = '#ff0000';
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == 'LEFT') snakeX -= box;
    if (direction == 'UP') snakeY -= box;
    if (direction == 'RIGHT') snakeX += box;
    if (direction == 'DOWN') snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        document.getElementById('score').innerText = 'Score: ' + score;
        food = {
            x: Math.floor(Math.random() * (canvasSize.width / box)) * box,
            y: Math.floor(Math.random() * (canvasSize.height / box)) * box,
        };
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    if (snakeX < 0 || snakeX >= canvasSize.width || snakeY < 0 || snakeY >= canvasSize.height || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

let game = setInterval(draw, 100);
