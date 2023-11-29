let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let ball = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: 10,
    dy: 10,
    radius: 50,
};
function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = "#43d313";
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
    }
});
