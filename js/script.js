const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 600;


let num = 180;
let intvl;

let score = 0;

let startSound = new Audio('../sound/start.ogg');
let happySound = new Audio('../sound/happy.wav');
let unhappySound = new Audio('../sound/unhappy.wav');
let finishSound = new Audio('../sound/finish.wav');

let isStart = false;

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
    isColliding: false
};

let worms = [
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 1,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 1,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 1,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 1,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 1,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 1,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 1,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 1,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 1,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 1,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 1,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 1,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 1,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 1,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 1,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 1,
        delay: 0
    },
    {
        x: 0,
        y: 0,
        radius: 10,
        dx: 1,
        dy: 1,
        lc: 1,
        time: 1,
        delay: 0
    }
];

function drawWorm(worm) {
    if (worm.delay <= 0) {
        ctx.beginPath();
        ctx.arc(worm.x + worm.radius, worm.y + worm.radius, worm.radius, Math.PI, 0);
        ctx.fillStyle = 'rgb(250, 200, 120)';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
}

function moveWorm() {
    for (var i = 0; i < worms.length; i++) {
        switch (worms[i].lc) {
            case 1:
                worms[i].x += worms[i].dx;
                worms[i].y += worms[i].dy;
                worms[i].time = num;
                worms[i].lc = 2;
                //console.log("Life Cycle One")
                break;
            case 2:
                worms[i].x += worms[i].dx;
                worms[i].y += worms[i].dy;
                worms[i].radius += 0.05;

                if (worms[i].time - num > 5) {
                    worms[i].lc = 3;
                    worms[i].time = num;
                    //console.log("Life Cycle Two");
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
                //console.log("Life Cycle 4", worms[i].delay);

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

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 250, 40);
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText("Score: " + score, 10, 25);
    ctx.fillText("Time Left: ", 120, 25);
    timeLeft();
}

function timeLeft() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(num, 210, 25);

    if (num === 0) {
        clearInterval(intvl);
        alert("Game Over");
        finishSound.play();
        num = "0";
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

canvas.addEventListener('mousedown', function (e) {
    if (!isStart) {
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

        // Catch
    } else if (keys[32]) {
        if (checkObjectCollisions()) {
            console.log("success");
            happySound.play();
            score += 1;
        }
        // } else if (!checkObjectCollisions()) {
        //     console.log("failed");
        //     unhappySound.play();
        // }
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
        var isCol = rectIntersect(
            character.x,
            character.y,
            character.width,
            character.height,
            worms[i].x,
            worms[i].y,
            worms[i].width,
            worms[i].height
        );
    }
    if (isCol) {
        reset(worms[i]);
        console.log("collision1");
    }
}

// for (var i = 0; i < this.squares.length; i++) {
//     if (object !== this.squares[i]) {
//         var isCol = this.rectIntersect(
//             object.x,
//             object.y,
//             object.width,
//             object.height,
//             this.squares[i].x,
//             this.squares[i].y,
//             this.squares[i].width,
//             this.squares[i].height
//         );
//         object.isColliding = isCol;
//         if (isCol) {
//             (this.squares[i]).isColliding = isCol;
//             break;
//         }
//     }
// }

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
        return false;
    }
    return true;
}

for (var i = 0; i < worms.length; i++) {
    reset(worms[i]);
}

function animate() {
    checkCollisions();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawCharacter(character, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
    moveWorm();
    for (var i = 0; i < worms.length; i++) {
        drawWorm(worms[i]);
    }
    drawScore();
    movePlayer();
    handlePlayerFrame();
    requestAnimationFrame(animate);
}

function startBtn() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(430, 250, 150, 100);
    ctx.fill();
    ctx.font = '50px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText("Start", 450, 320);
    ctx.fill();
}

function pause() {
    ctx.font = '50px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText("Pause", 150, 320);
    ctx.fill();
}

function start() {
    isStart = true;
    intvl = setInterval(function () { timeLeft(num--); }, 1000);
    startSound.play();
    animate();
}

startBtn();

// function checkObjectCollisions(object, index) {
//     // check parameter square against all other squares
//     for (var i = 0; i < this.squares.length; i++) {
//         if (object !== this.squares[i]) {
//             var isCol = this.rectIntersect(
//                 object.x,
//                 object.y,
//                 object.width,
//                 object.height,
//                 this.squares[i].x,
//                 this.squares[i].y,
//                 this.squares[i].width,
//                 this.squares[i].height
//             );
//             object.isColliding = isCol;
//             if (isCol) {
//                 (this.squares[i]).isColliding = isCol;
//                 break;
//             }
//         }
//     }
// }


// class GameObject {
//     constructor(context, x, y, vx, vy, width, height) {
//         this.context = context;
//         this.x = x;
//         this.y = y;
//         this.vx = vx;
//         this.vy = vy;
//         this.width = width;
//         this.height = height;

//         this.isColliding = false;

//         this.draw = this.draw.bind(this);
//         this.update = this.update.bind(this);
//         this.getRight = this.getRight.bind(this);
//         this.getBottom = this.getBottom.bind(this);
//         this.setVelocity = this.setVelocity.bind(this);
//         this.offsetVelocity = this.offsetVelocity.bind(this);
//     }
//     getRight() {
//         return (this.x + this.width);
//     }

//     getBottom() {
//         return (this.y + this.height);
//     }

//     draw(context) { };
//     update(secondsPassed) { };
// }

// class Square extends GameObject {
//     constructor(context, x, y, vx, vy, width, height) {
//         super(context, x, y, vx, vy);

//         // Set default width and height
//         this.width = width;
//         this.height = height;

//         this.draw = this.draw.bind(this);
//         this.update = this.update.bind(this);
//         this.setVelocity = this.setVelocity.bind(this);
//         this.offsetVelocity = this.offsetVelocity.bind(this);
//     }

//     draw(ctx) {
//         super.draw(ctx);
//         // Draw a simple square
//         ctx.fillStyle = this.isColliding ? '#ff8080' : '#0099b0';
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }

//     update(secondsPassed) {
//         super.update(secondsPassed);
//         // Move with set velocity
//         this.x += this.vx * secondsPassed;
//         this.y += this.vy * secondsPassed;
//         //console.log(this.x + ", " + this.y);
//     }

//     setVelocity(vx, vy) {
//         this.vx = vx;
//         this.vy = vy;
//     }

//     offsetVelocity(vx, vy) {
//         this.vx += vx;
//         this.vy += vy;
//     }
// }

// class GameEngine {

//     constructor(canvas, window) {
//         this.canvas = canvas;
//         this.context = this.canvas.getContext('2d');
//         this.window = window;

//         this.secondsPassed = 0;
//         this.oldTimeStamp = 0;
//         this.fps = 0;

//         this.squaresize = 100;
//         this.squares = new Array();

//         this.gameLoop = this.gameLoop.bind(this);
//         this.update = this.update.bind(this);
//         this.draw = this.draw.bind(this);
//         this.doMouseDown = this.doMouseDown.bind(this);
//         this.doKeyDown = this.doKeyDown.bind(this);
//         this.checkCollisions = this.checkCollisions.bind(this);
//         this.checkWallCollisions = this.checkWallCollisions.bind(this);
//         this.checkObjectCollisions = this.checkObjectCollisions.bind(this);
//         this.rectIntersect = this.rectIntersect.bind(this);
//         this.getX = this.getX.bind(this);
//         this.getY = this.getY.bind(this);
//         this.getRandomInRange = this.getRandomInRange.bind(this);

//         var temp = this;
//         this.canvas.addEventListener("mousedown", function (e) { temp.doMouseDown(e) }, false);
//         this.canvas.addEventListener("keydown", function (e) { temp.doKeyDown(e) }, false);

//         this.window.requestAnimationFrame(this.gameLoop);
//     }

//     gameLoop(timeStamp) {

//         // Calculate the number of seconds passed since the last frame
//         this.secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
//         this.oldTimeStamp = timeStamp;

//         // Calculate fps
//         this.fps = Math.round(1 / this.secondsPassed);
//         this.update(this.secondsPassed);
//         // Perform the drawing operation
//         this.draw();

//         // The loop function has reached it's end. Request a new frame
//         this.window.requestAnimationFrame(this.gameLoop);
//     }

//     update(secondsPassed) {
//         this.checkCollisions();
//         for (var i = 0; i < this.squares.length; i++) {
//             (this.squares[i]).update(secondsPassed);
//         }
//     }

//     draw() {
//         this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

//         for (var i = 0; i < this.squares.length; i++) {
//             this.squares[i].draw(this.context);
//         }

//         // Draw FPS counter to the screen
//         this.context.fillStyle = 'white';
//         this.context.fillRect(0, 0, 120, 50);
//         this.context.font = '25px Arial';
//         this.context.fillStyle = 'black';
//         this.context.fillText("FPS: " + this.fps, 10, 30);
//         /////////////////////////////////
//     }

//     doMouseDown(event) {
//         console.log(this);
//         switch (event.button) {
//             case 0:
//                 var rect = this.canvas.getBoundingClientRect();
//                 this.squares.push(
//                     new Square(
//                         null,
//                         this.getX(event),
//                         this.getY(event),
//                         this.getRandomInRange(-50, 50),
//                         this.getRandomInRange(-50, 50),
//                         this.squaresize,
//                         this.squaresize
//                     )
//                 )
//                 console.log(this.squares);
//                 break;

//             default:
//                 break;
//         }
//     }

//     doKeyDown(event) {
//         switch (event.key) {
//             case "ArrowUp":
//                 // call method for up action
//                 break;
//             case "ArrowDown":
//                 // call method for down action
//                 break;
//             default:
//                 // default action, fallback
//                 break;
//         }
//     }

//     checkCollisions() {
//         for (var i = 0; i < this.squares.length; i++) {
//             // for each square, check the wall overlaps
//             this.checkWallCollisions(this.squares[i]);
//             // for each square, check for overlaps with other squares
//             this.checkObjectCollisions(this.squares[i], i);
//         }

//     }

//     checkWallCollisions(object) {
//         // check right and left wall overlap
//         if (object.getRight() >= this.canvas.clientWidth) {
//             object.vx = -object.vx;
//             object.x = this.canvas.clientWidth - object.width - 1;
//         }
//         else if (object.x <= 0) {
//             object.vx = -object.vx;
//             object.x = 1;
//         }

//         // check bottom and top wall overlap
//         if (object.getBottom() >= this.canvas.clientHeight) {
//             object.vy = -object.vy;
//             object.y = this.canvas.clientHeight - object.height - 1;;
//         }
//         else if (object.y <= 0) {
//             object.vy = -object.vy;
//             object.y = 1;
//         }
//     }

//     checkObjectCollisions(object, index) {
//         // check parameter square against all other squares
//         for (var i = 0; i < this.squares.length; i++) {
//             if (object !== this.squares[i]) {
//                 var isCol = this.rectIntersect(
//                     object.x,
//                     object.y,
//                     object.width,
//                     object.height,
//                     this.squares[i].x,
//                     this.squares[i].y,
//                     this.squares[i].width,
//                     this.squares[i].height
//                 );
//                 object.isColliding = isCol;
//                 if (isCol) {
//                     (this.squares[i]).isColliding = isCol;
//                     break;
//                 }
//             }
//         }
//     }

//     rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
//         // Check x and y for overlap
//         if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
//             return false;
//         }
//         return true;
//     }

//     getX(event) {
//         var rect = this.canvas.getBoundingClientRect();
//         return event.clientX - rect.left;
//     }

//     getY(event) {
//         var rect = this.canvas.getBoundingClientRect();
//         return event.clientY - rect.top;
//     }

//     getRandomInRange(min, max) {
//         return Math.random() * (Math.abs(min) + max) + min;
//     }
// }