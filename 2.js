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
function run() {
    if (!running) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    let ball = balls[balls.length - 1];
    drawBall(ball);
    updateBallPosition(ball);
    context.font = "30px Arial";
    context.fillText("Score: " + score, 10, 50);
    context.fillText("Speed: dx=" + ball.dx + ", dy=" + ball.dy, 10, 90);
    context.fillText("Size: " + ball.radius, 10, 130);
    requestAnimationFrame(run);
}

canvas.addEventListener('click', function (event) {
    let ball = balls[balls.length - 1];
    let distX = Math.abs(ball.x - event.clientX);
    let distY = Math.abs(ball.y - event.clientY);
    if (distX < ball.radius && distY < ball.radius) {
        score++;
        balls.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: ball.dx + 5,
            dy:  ball.dy + 5,
            radius: ball.radius - 5,
        });
    }
});

document.getElementById('start').addEventListener('click', function () {
    running = true;
    run();
    let audio = Math.random();
    if (audio < 0.3) {
        audio = 'audio2';
    } else if (audio < 0.6) {
        audio = 'audio3';
    } else {
        audio = 'audio5';
    }
    document.getElementById(audio).play();
});
