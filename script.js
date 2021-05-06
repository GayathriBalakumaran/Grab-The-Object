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
var speed = 20;
var side = 50;
var over = true;

// random ball
var yellowX = 1100;
var yellowY = 300;
var radius1 = 30;
var ScoreRandom = 0;

var Syellowx = 0;
var Syellowy = 0;
var sqr = 25;
var move = 0.9;

//small square
var smallX = 0;
var smallY = 0;
var target = 25;
var counttime = 30;
var sound = new Audio('mixkit-small-crowd-clapping-3035.wav');
var sound1 = new Audio('mixkit-unlock-game-notification-253.wav');
var sound2 = new Audio('mixkit-arcade-retro-changing-tab-206.wav');
var sound3 = new Audio('mixkit-game-notification-wave-alarm-987.wav');

var dangerX = [-100, 70, 250, 490, 690, 950, -80, 1100];
var dangerY = [0, 375, 0, 375, 0, 375, 0, 0];

var danwidth = 40;
var danheight = 200;
function drawRect(dangerX, dangerY, danwidth, danheight) {
    //draw rectangle
    ctx.fillStyle = "blue";
    ctx.fillRect(dangerX, dangerY, danwidth, danheight);
}

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
        yellowX -= speed;
    }
    if (key === 87) {// yellow up
        yellowY -= speed;
    }
    if (key === 88) {// yellow down
        yellowY += speed;
    }
    if (key === 68) {//yellow right
        yellowX += speed;
    }
};

function starting() {
    // Reduce the countdown timer ever two second
    setcount = setInterval(function () { counttime--; }, 2000);
    // Put the target at a random 
    targetDisplay();
    yellowDisplay();
    // Kick off the Animation loop
    Animation();
}

//display red suare random
function targetDisplay() {
    smallX = Math.round(Math.random() * innerWidth - target);
    smallY = Math.round(Math.random() * innerHeight - target);
}

//display yellow square random
function yellowDisplay() {
    Syellowx = Math.round(Math.random() * innerWidth - target);
    Syellowy = Math.round(Math.random() * innerHeight - target);
}

function gameOver() {
    //countttime stop;
    clearInterval(setcount);
    sound.play();
    //display game over 
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = "white";
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("Red score is:" + Score, innerWidth / 2, innerHeight / 2);
    ctx.font = '24x Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('yellow Score is: ' + ScoreRandom, 648, (innerHeight / 2) + 50);
    ctx.font = "20px Arial";
    ctx.fillStyle = "aqua"
    ctx.fillText("Do you want to continue press (F5)", 670, (innerHeight / 2) + 98);
    ctx.fillStyle = "white";
    ctx.font = '45px Arial';
    ctx.fillText("Game Over!!", 648, (innerHeight / 2) - 55);
}
var touch = false;

function Animation() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
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

    //move the rectangles to left to right
    for (z in dangerX) {
        dangerX[z] = dangerX[z] + move;
    }

    //rectangle will be restart left to right. 
    if (dangerX[5] > canvas.width) {
        dangerX[0] = -100;
        dangerX[1] = 70;
        dangerX[2] = 250;
        dangerX[3] = 490;
        dangerX[4] = 690;
        dangerX[5] = 950;
        dangerX[6] = -80;
        dangerX[7] = 1100;

    }

    //yellow ball within the bound
    if (yellowY + side > innerHeight) {
        yellowY = innerHeight - side;
    }
    if (yellowY < 0) {
        yellowY = 0;
    }
    if (yellowX < 0) {
        yellowX = 0;
    }
    if (yellowX + side > innerWidth) {
        yellowX = innerWidth - side;
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
    if (((smallX > yellowX && smallX < (yellowX + side)) || ((smallX + target) > yellowX && smallX < (yellowX + side))) && ((smallY > yellowY && smallY < (yellowY + side)) || ((smallY + target) > yellowY && smallY < (yellowY + side)))) {
        sound2.play();
        targetDisplay();
        ScoreRandom = ScoreRandom + 2;
    }
    //hit the yellow square and red Square
    if (((Syellowx > x && Syellowx < (x + side)) || ((Syellowx + sqr) > x && Syellowx < (x + side))) && ((Syellowy > y && Syellowy < (y + side)) || ((Syellowy + sqr) > y && Syellowy < (y + side)))) {
        Score = Score + 2;
        sound1.play();
        yellowDisplay();
    }
    //yellow ball hit the yellow Square
    if (((Syellowx > yellowX && Syellowx < (yellowX + side)) || ((Syellowx + sqr) > yellowX && Syellowx < (yellowX + side))) && ((Syellowy > yellowY && Syellowy < (yellowY + side)) || ((Syellowy + sqr) > yellowY && Syellowy < (yellowY + side)))) {
        sound2.play();
        ScoreRandom = ScoreRandom + 1;
        radius1 = radius1 + 5;
        yellowDisplay();

    }
    //yellow ball hit the red ball
    if (((yellowX > x && yellowX < (x + side)) || ((yellowX + target) > x && yellowX < (x + side))) && ((yellowY > y && yellowY < (y + side)) || ((yellowY + target) > y && yellowY < (y + side)))) {
        sound3.play();
        over = false;
    }
    //dangerRectangle collision
    for (i in dangerX) {
        //red ball collision with retangle..
        if (((dangerX[i] > x && dangerX[i] < (x + side)) || ((dangerX[i] + danwidth) > x && dangerX[i] < (x + side))) && ((dangerY[i] > y && dangerY[i] < (y + side)) || ((dangerY[i] + danheight) > y && dangerY[i] < (y + side)))) {
            x = 55;
            y = 300;
            radius = 30;
            if (Score < 2) {//when red ball Score for red is lesser than five the Score become 0
                Score = 0;
            }
            else {//when red ball Score is greater than five the Score of red will be decrese by 5
                Score = Score - 2;
            }
        }
        //yellow ball collition with rectangle
        if (((dangerX[i] > yellowX && dangerX[i] < (yellowX + side)) || ((dangerX[i] + danwidth) > yellowX && dangerX[i] < (yellowX + side))) && ((dangerY[i] > yellowY && dangerY[i] < (yellowY + side)) || ((dangerY[i] + danheight) > yellowY && dangerY[i] < (yellowY + side)))) {
            yellowX = 1100;
            yellowY = 300;
            radius = 30;
            touch = true;
            if (ScoreRandom < 2) {//when yellow ball Score is lesser than five the Score is 0
                ScoreRandom = 0;
            }
            else {//when the yellow ball Score is greater than five the Score will be decrese by 5 
                ScoreRandom = ScoreRandom - 2;
            }
        }
    }
    //call the rectangle function 
    drawRect(dangerX[0], dangerY[0], danwidth, danheight);
    drawRect(dangerX[1], dangerY[1], danwidth, danheight);
    drawRect(dangerX[2], dangerY[2], danwidth, danheight);
    drawRect(dangerX[3], dangerY[3], danwidth, danheight);
    drawRect(dangerX[4], dangerY[4], danwidth, danheight);
    drawRect(dangerX[5], dangerY[5], danwidth, danheight);
    drawRect(dangerX[6], dangerY[6], danwidth, danheight);
    drawRect(dangerX[7], dangerY[7], danwidth, danheight);

    //draw a red ball
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fill();
    ctx.stroke();

    //small red square
    ctx.fillStyle = "red";
    ctx.fillRect(smallX, smallY, target, target);

    //random ball
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(yellowX, yellowY, radius1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    //danger square
    ctx.fillStyle = "yellow";
    ctx.fillRect(Syellowx, Syellowy, sqr, sqr);

    // display the sqare and countdown
    ctx.fillStyle = "white";
    ctx.font = '34px Arial';
    ctx.fillText('Goal Red: ' + Score, 85, 95);
    ctx.fillText('Goal Yellow:' + ScoreRandom, 995, 95);
    ctx.fillText('Time count: ' + counttime, 495, 85);
    ctx.font = '11px Arial'
    ctx.fillText('up:W   down:X   left:A   right:D', 999, 105);
    ctx.fillText('use Arrow key to move redball', 99, 107);
    if (!over) {
        gameOver();
    }
    if (counttime <= 0) {
        gameOver();
    }
    else {
        window.requestAnimationFrame(Animation);
    }
}
starting();
