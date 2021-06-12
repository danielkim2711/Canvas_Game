const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 600;

let num = 180;
let intvl;

let score = 0;

let startSound = new Audio('sound/start.wav');
let happySound = new Audio('sound/happy.wav');
let unHappySound = new Audio('sound/unhappy.wav');
let finishSound = new Audio('sound/finish.wav');

let isStart = false;

let pressed = false;

const character = new Image();
character.src = "img/ironman.png";
const background = new Image();
background.src = "img/beach.png";

const keys = [];

const player = {
    x: 500,
    y: 400,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 3,
    moving: false,
};

const worms = [
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 0,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 0,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 0,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 0,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 0,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 0,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 0,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 0,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 0,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 0,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 0,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 0,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 0,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 0,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 0,
        delay: 0
    }
];

function drawWorm(worm) {
    if (worm.delay <= 0) {
        ctx.beginPath();
        var grd = ctx.createRadialGradient(worm.x + worm.radius, worm.y + worm.radius, 5, worm.x + worm.radius, worm.y + worm.radius, 10);
        grd.addColorStop(0, "white");
        grd.addColorStop(1, "rgb(250, 200, 120)");
        ctx.arc(worm.x + worm.radius, worm.y + worm.radius, worm.radius, Math.PI, 0);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
}

function moveWorm() {
    for (var i = 0; i < worms.length; i++) {
        switch (worms[i].lc) {
            case 1:
                worms[i].radius = 10;
                worms[i].x += worms[i].dx;
                worms[i].y += worms[i].dy;
                worms[i].time = num;
                worms[i].lc = 2;
                break;
            case 2:
                worms[i].x += worms[i].dx;
                worms[i].y += worms[i].dy;
                worms[i].radius += 0.05;

                if (worms[i].time - num > 5) {
                    worms[i].lc = 3;
                    worms[i].time = num;
                }
                break;
            case 3:
                worms[i].x += worms[i].dx;
                worms[i].y += worms[i].dy;
                worms[i].radius -= 0.05;

                if (worms[i].radius < 10) {
                    worms[i].radius = 10;
                }

                if (worms[i].time - num > 5) {
                    reset(worms[i]);
                }
                break;
            case 4:
                worms[i].delay--;

                if (worms[i].delay <= 0) {
                    worms[i].lc = 1;
                }
            default:
                break;
        }
    }
}

function drawCharacter(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function setVolume25() {
    startSound.volume = 0.25;
    happySound.volume = 0.25;
    unHappySound.volume = 0.25;
    finishSound.volume = 0.25;
}

function setVolume50() {
    startSound.volume = 0.5;
    happySound.volume = 0.5;
    unHappySound.volume = 0.5;
    finishSound.volume = 0.5;
}

function setVolume75() {
    startSound.volume = 0.75;
    happySound.volume = 0.75;
    unHappySound.volume = 0.75;
    finishSound.volume = 0.75;
}

function setVolume100() {
    startSound.volume = 1;
    happySound.volume = 1;
    unHappySound.volume = 1;
    finishSound.volume = 1;
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 250, 40);
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText("Score: " + score, 10, 25);
    ctx.fillText("Time Left: ", 120, 25);
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText("Volume: " + (startSound.volume * 100) + "%", 870, 590);
    timeLeft();
}

function timeLeft() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(num, 210, 25);

    if (num === 0) {
        gameOver();
    }
}

function gameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    isStart = false;
    clearInterval(intvl);
    finishSound.play();
    num = '0';
    replayBtn();
}

function replayBtn() {
    ctx.fillStyle = 'rgb(250, 200, 120)';
    ctx.fillRect(10, 10, 980, 580);
    ctx.fillStyle = '#fff';
    ctx.fillRect(410, 470, 200, 70);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(410, 470, 200, 70);
    ctx.font = '50px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText("Congratulations!", 300, 270);
    ctx.font = '30px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText("Your Score is " + score, 330, 330);
    ctx.font = '50px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText("Restart", 430, 520);
}

function setTimeOneMin() {
    if (!isStart) {
        num = 60;
        score = 0;
        start();
    }
}

function setTimeTwoMin() {
    if (!isStart) {
        num = 120;
        score = 0;
        start();
    }
}

function setTimeFourMin() {
    if (!isStart) {
        num = 240;
        score = 0;
        start();
    }
}

function setTimeFiveMin() {
    if (!isStart) {
        num = 300;
        score = 0;
        start();
    }
}

window.addEventListener('keydown', function (e) {
    if (e.keyCode == 32 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40
        || e.keyCode == 65 || e.keyCode == 87 || e.keyCode == 68 || e.keyCode == 83) {
        keys[e.keyCode] = true;
        player.moving = true;
    }

    if (!pressed) {
        pressed = true;
        catchWorms();
    }
});

window.addEventListener('keyup', function (e) {
    pressed = false;
    delete keys[e.keyCode];
    player.moving = false;
});

canvas.addEventListener('mousedown', function (e) {
    if (!isStart) {
        num = 180;
        score = 0;
        start();
    }
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

function catchWorms() {
    if (keys[32]) {
        checkObjectCollisions()
        player.frameY = 3;
        player.moving = true;
    }
}

function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) {
        player.frameX++;
    } else player.frameX = 0;
}

function getRandomInRange(min, max) {
    return Math.random() * (max - Math.abs(min)) + min;
}

function reset(worm) {
    worm.x = getRandomInRange(200, 800);
    worm.y = getRandomInRange(300, 400);
    worm.dx = getRandomInRange(0, 4) - 2;
    worm.dy = getRandomInRange(0, 4) - 2;
    worm.delay = getRandomInRange(20, 100);
    worm.lc = 4;
}

function checkCollisions() {
    for (var i = 0; i < worms.length; i++) {
        checkWallCollisions(i);
    }
}

function checkWallCollisions(i) {
    if (worms[i].x + worms[i].radius > canvas.width || worms[i].x - worms[i].radius < 0) {
        worms[i].dx *= -1;
        worms[i].x += worms[i].dx;
    } else if (worms[i].y + worms[i].radius > canvas.height || worms[i].y - worms[i].radius < 250) {
        worms[i].dy *= -1;
        worms[i].y += worms[i].dy;
    }
}

function checkObjectCollisions() {
    for (var i = 0; i < worms.length; i++) {
        var isCol = intersact(
            player.x,
            player.y,
            player.width,
            player.height,
            worms[i].x,
            worms[i].y,
            worms[i].radius
        );
        //console.log(isCol);
        if (isCol) {
            reset(worms[i]);
            unHappySound.pause();
            unHappySound.currentTime = 0;
            happySound.load();
            happySound.play();
            score++;
            break;
        } else {
            unHappySound.play();
        }
    }
}

function intersact(x1, y1, w1, h1, x2, y2, r) {
    var distX = Math.abs(x2 - x1 - w1 / 2);
    var distY = Math.abs(y2 - y1 - h1 / 2);

    if (distX > (w1 / 2 + r) || distY > (h1 / 2 + r)) {
        return false;
    } else if (distX <= (w1 / 2 || distY <= (h1 / 2))) {
        return true;
    }

    var dx = distX - w1 / 2;
    var dy = distY - h1 / 2;
    return (dx * dx + dy * dy <= (r * r));
}

for (var i = 0; i < worms.length; i++) {
    reset(worms[i]);
}

function gameLoop() {
    if (isStart) {
        checkCollisions();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        drawCharacter(character, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
        moveWorm();
        movePlayer();
        for (var i = 0; i < worms.length; i++) {
            drawWorm(worms[i]);
        }
        drawScore();
        handlePlayerFrame();
        requestAnimationFrame(gameLoop);
    }
    else {
        return;
    }
}

function startBtn() {
    ctx.fillStyle = 'rgb(250, 200, 120)';
    ctx.fillRect(10, 10, 980, 580);
    ctx.fillStyle = '#fff';
    ctx.fillRect(430, 470, 150, 70);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(430, 470, 150, 70);
    ctx.font = '40px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText("How to play:", 100, 200);
    ctx.font = '18px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText("Press W, A, S, D or Arrow keys to move, press SPACE to catch the worms.", 100, 250);
    ctx.fillText("To successfully catch a worm, you should get close enough to a worm and press SPACE to catch.", 100, 270);
    ctx.fillText("By default, the game time is set to three minutes, but you can change it by pressing one of the time buttons.", 100, 310);
    ctx.fillText("The game automatically starts when you press it so you don't need to worry!", 100, 330);
    ctx.font = '50px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText("Good Luck!", 370, 410);
    ctx.font = '50px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText("Start", 450, 520);
}

function start() {
    isStart = true;
    intvl = setInterval(function () {
        timeLeft(num--);
    }, 1000);
    startSound.play();
    gameLoop();
}

startBtn();