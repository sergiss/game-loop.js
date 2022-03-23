import GameLoop from "./game-loop.js";

const WIDTH = 640;
const HEIGHT = 480;
const PI2 = Math.PI * 2;

const balls = [];
const n = 500;

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

canvas.width = WIDTH;
canvas.height = HEIGHT;

const loop = new GameLoop({
    create: () => { // optional
        // create balls
        for (let i = 0; i < n; ++i) {
            balls[i] = {
                x: Math.random() * WIDTH,
                y: Math.random() * HEIGHT,
                radius: Math.random() * 10 + 5,
                dirX: Math.random() > 0.5 ? 1 : -1,
                dirY: Math.random() > 0.5 ? 1 : -1,
                speed: Math.random() * 5 + 1,
                color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
            }
        }
    },
    update: () => {

        // update balls
        for (let i = 0; i < n; ++i) {
            const ball = balls[i];
            ball.x += ball.dirX * ball.speed;
            ball.y += ball.dirY * ball.speed;
            if(ball.x < 0) {
                ball.x = 0;
                ball.dirX = -ball.dirX;
            } else if(ball.x > WIDTH) {
                ball.x = WIDTH;
                ball.dirX = -ball.dirX;
            }
            if(ball.y < 0) {
                ball.y = 0;
                ball.dirY = -ball.dirY;
            } else if(ball.y > HEIGHT) {
                ball.y = HEIGHT;
                ball.dirY = -ball.dirY;
            }
        }

    },
    render: () => {

        // clear screen
        ctx.fillStyle = "#FFF";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // render balls
        for (let i = 0; i < n; ++i) {
            const ball = balls[i];
            ctx.fillStyle = ball.color;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, PI2);
            ctx.fill();
        }

    },
    dispose: () => { // optional

    }
}, 60);

loop.start();