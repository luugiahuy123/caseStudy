let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let running = false;

let ball = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: 20,
    dy: 20,
    radius: 50,
};

function drawBall() {
    let gradient = context.createLinearGradient(ball.x, ball.y - ball.radius, ball.x, ball.y + ball.radius);
    gradient.addColorStop(0, '#33ccff');
    gradient.addColorStop(1, '#ff99cc');

    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = gradient;
    context.fill();
    context.closePath();
}

function updateBallPosition() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
    }
}

function run() {
    if (!running) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    updateBallPosition();
    requestAnimationFrame(run);
}

canvas.addEventListener('click', function (event) {
    let distX = Math.abs(ball.x - event.clientX);
    let distY = Math.abs(ball.y - event.clientY);
    if (distX < ball.radius && distY < ball.radius) {
        alert('Hit!');
        running = false;
    }
});

document.getElementById('start').addEventListener('click', function () {
    running = true;
    run();
    let audio = Math.random();
    if (audio < 0.25) {
        audio = 'audio2';
    } else if (audio < 0.5) {
        audio = 'audio3';
    } else if (audio < 0.75) {
        audio = 'audio4';
    } else {
        audio = 'audio5';
    }
    document.getElementById(audio).play();
});
document.getElementById('increaseSpeed').addEventListener('click', function () {
    ball.dx *= 1.2;
    ball.dy *= 1.2;
});
document.getElementById('increaseSize').addEventListener('click', function () {
    ball.radius *= 1.2;
});
document.getElementById('downSpeed').addEventListener('click', function () {
    ball.dx /= 1.2;
    ball.dy /= 1.2;
});
document.getElementById('downSize').addEventListener('click', function () {
    ball.radius /= 1.2;
});