const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 600;

const keys = [];
const worms = [];

const player = {
    x: 500,
    y: 400,
    width: 40,
    height: 56,
    frameX: 0,
    frameY: 0,
    speed: 5,
    moving: false
};

const worm = {
    x: 200,
    y: 300,
    radius: 15,
    dx: 3,
    dy: 2
};

const character = new Image();
character.src = "img/hulk.png";
const background = new Image();
background.src = "img/beach.png";

function drawCharacter(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function drawWorm() {
    ctx.beginPath();
    ctx.arc(worm.x, worm.y, worm.radius, Math.PI, 0);
    ctx.fillStyle = 'rgb(250, 200, 120)';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 250, 40);
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText("Score: ", 10, 25);
    ctx.fillText("Time Left: ", 120, 25);
}

let num = 180;
let intvl = setInterval(function () { timeLeft(num--); }, 1000);

function timeLeft() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(num, 210, 25);
    if (num == 0) {
        clearInterval(intvl);
    }
}

window.addEventListener('keydown', function (e) {
    keys[e.keyCode] = true;
    player.moving = true;
});

window.addEventListener('keyup', function (e) {
    delete keys[e.keyCode];
    player.moving = false;
});

function movePlayer() {
    // Move Left
    if (keys[37] && player.x > 0 || keys[65] && player.x > 0) {
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;

        // Move Up
    } else if (keys[38] && player.y > 250 || keys[87] && player.y > 250) {
        player.y -= player.speed;
        player.frameY = 3;
        player.moving = true;

        // Move Right
    } else if (keys[39] && player.x < canvas.width - player.width || keys[68] && player.x < canvas.width - player.width) {
        player.x += player.speed;
        player.frameY = 2;
        player.moving = true;

        // Move Down
    } else if (keys[40] && player.y < canvas.height - player.height || keys[83] && player.y < canvas.height - player.height) {
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
    }
}

function moveWorm() {
    worm.x += worm.dx;
    worm.y += worm.dy;

    if (worm.x + worm.radius > canvas.width || worm.x - worm.radius < 0) {
        worm.dx *= -1;
    } else if (worm.y + worm.radius > canvas.height || worm.y - worm.radius < 250) {
        worm.dy *= -1;
    }
}

function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) {
        player.frameX++;
    } else player.frameX = 0;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawCharacter(character, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
    drawWorm();
    drawScore();
    movePlayer();
    moveWorm();
    handlePlayerFrame();
    requestAnimationFrame(animate);
}

animate();