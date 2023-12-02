let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let running = false;
let score = 0;

let balls = [{
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: 10,
    dy: 10,
    radius: 100,
}];

function drawBall(ball) {
    let gradient = context.createLinearGradient(ball.x, ball.y - ball.radius, ball.x, ball.y + ball.radius);
    gradient.addColorStop(0, '#33ccff');
    gradient.addColorStop(1, '#ff99cc');

    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = gradient;
    context.fill();
    context.closePath();
}

function updateBallPosition(ball) {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
    }
}

