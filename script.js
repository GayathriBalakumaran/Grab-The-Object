var canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

let Score = 0;
var x = 55;
var y = 300;
var radius = 30;
var startAngle = 0;
var endAngle = Math.PI * 2;
var speed = 15;
var side = 50;

// random ball
var randomx = 1100;
var randomy = 300;
var radius1 = 30;
var ScoreRandom = 0;

//small square
var smallX = 0;
var smallY = 0;
var target = 25;
var counttime = 30;
var sound = new Audio('mixkit-small-crowd-clapping-3035.wav');
var sound1 = new Audio('mixkit-unlock-game-notification-253.wav');
var sound2 = new Audio('mixkit-arcade-retro-changing-tab-206.wav');
var sound3 = new Audio('mixkit-game-notification-wave-alarm-987.wav')

//move the Ball
window.onkeydown = function (event) {
    var key = event.keyCode;
    if (key === 40) { //red DOWN
        y += speed;
    }
    if (key === 38) { // red UP
        y -= speed;
    }
    if (key === 37) { // red LEFT
        x -= speed;
    }
    if (key === 39) { // red RIGHT
        x += speed;
    }
    if (key === 65) {// yellow left
        randomx -= speed;
    }
    if (key === 87) {// yellow up
        randomy -= speed;
    }
    if (key === 88) {// yellow down
        randomy += speed;
    }
    if (key === 68) {//yellow right
        randomx += speed;
    }

};

function starting() {
    // Reduce the countdown timer ever two second
    setcount = setInterval(function () { counttime--; }, 2000);
    // Put the target at a random 
    targetDisplay();
    // Kick off the Animation loop
    Animation();
}

function targetDisplay() {
    smallX = Math.round(Math.random() * innerWidth - target);
    smallY = Math.round(Math.random() * innerHeight - target);
}

function gameOver() {
    //countttime stop;
    clearInterval(setcount);
    sound.play();
    //display game over 
    remove();
    ctx.fillStyle = "#000000";
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("Red score is:" + Score, innerWidth / 2, innerHeight / 2);
    ctx.font='24x Arial';
    ctx.fillStyle='black';
    ctx.fillText('yellow Score is: '+ScoreRandom,648,(innerHeight/2)+50);
    ctx.font = "20px Arial";
    ctx.fillStyle = "green"
    ctx.fillText("Do you want to continue press (F5)", 679, (innerHeight / 2) + 98);
}
//clear the canvas 
function remove() {
    var multicolor = ctx.createLinearGradient(0, 0, innerWidth, 0);
    multicolor.addColorStop("0", "#D16BA5");
    multicolor.addColorStop("0.5", "#86A8E7");
    multicolor.addColorStop("1.0", "#5FFBF1");
    ctx.fillStyle = multicolor;
    ctx.fillRect(0, 0, innerWidth, innerHeight);
}
function random() {
    remove();
    if (randomx > innerWidth - radius1 || randomx < radius1) {
        rx = -rx;
    }
    if (randomy > innerHeight - radius1 || randomy < radius1) {
        rx = -rx;
    }
    randomx = rx;
    randomy = ry;
}

function Animation() {
    remove();
    // ball within the bounds 
    if (y + side > innerHeight) {
        y = innerHeight - side;
    }
    if (y < 0) {
        y = 0;
    }
    if (x < 0) {
        x = 0;
    }
    if (x + side > innerWidth) {
        x = innerWidth - side;
    }
    // hit the target
    if (((smallX > x && smallX < (x + side)) || ((smallX + target) > x && smallX < (x + side))) && ((smallY > y && smallY < (y + side)) || ((smallY + target) > y && smallY < (y + side)))) {
        // make the target
        targetDisplay();
        sound1.play();
        radius = radius + 5;
        //Score increasing.
        Score++;
    }
    if (((smallX > randomx && smallX < (randomx + side)) || ((smallX + target) > randomx && smallX < (randomx + side))) && ((smallY > randomy && smallY < (randomy + side)) || ((smallY + target) > randomy && smallY < (randomy + side)))) {
        radius1 = radius + 5;
        sound2.play();
        targetDisplay();
        ScoreRandom = ScoreRandom + 1;
    }
    // if(((randomx>x && randomX<(x+side)) || ((randomx+target)>x && randomx<(x+side))) && ((randomy>y && randomy<(y+side)) || ))
    if (((randomx > x && randomx < (x + side)) || ((randomx + target) > x && randomx < (x + side))) && ((randomy > y && randomy < (y + side)) || ((randomy + target) > y && randomy < (y + side)))) {
        sound3.play();
        alert("game over");
        gameOver();
    }
    //hit the danger square
    if (counttime % 5 === 0) {
        //danger square
        var dangerX = 500;
        var dangerY = 90;
        var sqr = 25;
        if (((dangerX > x && dangerX < (x + side)) || ((dangerX + sqr) > x && dangerX < (x + side))) && ((dangerY > y && dangerY < (y + side)) || ((dangerY + sqr) > y && dangerY < (y + side)))) {
            alert("red ball touch the danger!");
            gameOver();
        }
        if (((dangerX > randomx && dangerX < (randomx + side)) || ((dangerX + sqr) > x && dangerX < (randomx + side))) && ((dangerY > randomy && dangerY < (randomy + side)) || ((dangerY + sqr) > y && dangerY < (randomy + side)))) {
            alert("yellow ball touch the danger!");
            gameOver();
        }
    }
    //ball
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fill();
    ctx.stroke();

    //small square
    ctx.fillStyle = "black";
    ctx.fillRect(smallX, smallY, target, target);

    //random ball
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(randomx, randomy, radius1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    //danger square
    ctx.fillStyle = "green";
    ctx.fillRect(dangerX, dangerY, sqr, sqr);

    // display the sqare and countdown
    ctx.fillStyle = "black";
    ctx.font = '34px Arial';
    ctx.fillText('Goal Red: ' + Score, 30, 54);
    ctx.fillText('Goal Yellow:' + ScoreRandom, 990, 54);
    ctx.fillText('Time count: ' + counttime, 490, 54);
    if (counttime <= 0) {
        gameOver();
    }
    else {
        window.requestAnimationFrame(Animation);
    }

}

starting();