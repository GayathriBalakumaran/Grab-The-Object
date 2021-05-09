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
var yellowballX = 1100;
var yellowballY = 300;
var radius1 = 30;
var ScoreRandom = 0;

var sqryellowx = 0;
var Syellowbally = 0;
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
var sound4 = new Audio('mixkit-arcade-mechanical-bling-210.wav');//rectangle hit the ball

var dangerX = [-100, 70, 250, 490, 690, 950, -80, 1100];
var dangerY = [0, 375, 0, 375, 0, 375, 0, 0];

var danwidth = 40;
var danheight = 200;
function drawRect(dangerX, dangerY, danwidth, danheight) {
    //draw rectangle
    ctx.fillStyle = "blue";
    ctx.fillRect(dangerX, dangerY, danwidth, danheight);
}

//move red the Ball
document.addEventListener("keydown", (e) => {
    var key=e.key;
    if (key === "ArrowDown") { //red DOWN
        y += speed;
    }
    if (key === "ArrowUp") { // red UP
        y -= speed;
    }
    if (key === "ArrowLeft") { // red LEFT
        x -= speed;
    }
    if (key === "ArrowRight") { // red RIGHT
        x += speed;
    }
});

//move yellow the Ball
document.addEventListener("keypress", (e) => {
    var key=e.key;
    if (key === "a") {// yellow left
        yellowballX -= speed;
    }
    if (key === "w") {// yellow up
        yellowballY -= speed;
    }
    if (key === "x") {// yellow down
        yellowballY += speed;
    }
    if (key === "d") {//yellow right
        yellowballX += speed;
    }
});

function starting() {
    // Reduce the countdown timer ever two second
    setcount = setInterval(function () { counttime--; }, 2000);
    // Put the target at a random 
    redtargetDisplay();
    yellowtargetDisplay();
    // Kick off the animation loop
    animation();
}

//display red suare random
function redtargetDisplay() {
    smallX = Math.round(Math.random() * innerWidth - target);
    smallY = Math.round(Math.random() * innerHeight - target);
}

//display yellow square random
function yellowtargetDisplay() {
    sqryellowx = Math.round(Math.random() * innerWidth - target);
    Syellowbally = Math.round(Math.random() * innerHeight - target);
}

function gameOver() {
    //countttime stop;
    clearInterval(setcount);
    sound.play();
    //display game over 
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.font = '37px Arial';
    ctx.textAlign = 'center';
    if (Score > ScoreRandom) {
        ctx.fillStyle = "Red";
        ctx.fillText("Red  Won  The  Match", 640, 160);
    }
    else if (Score < ScoreRandom) {
        ctx.fillStyle = "yellow";
        ctx.fillText("Yellow  Won  The  Match", 640, 160);
    }
    else {
        ctx.fillStyle = "#7fff00";
        ctx.fillText("Match  Draw'-'", 643, 160);
    }
    ctx.fillStyle = "white";
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("Red score is:" + Score, innerWidth / 2, innerHeight / 2);
    ctx.font = '24x Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Yellow Score is: ' + ScoreRandom, 648, (innerHeight / 2) + 50);
    ctx.font = "20px Arial";
    ctx.fillStyle = "aqua"
    ctx.fillText("Do you want to continue press (F5)", 670, (innerHeight / 2) + 98);
    ctx.fillStyle = "white";
    ctx.font = '45px Arial';
    ctx.fillText("Game Over!!", 648, (innerHeight / 2) - 55);
}

//red ball is dashing targets(square), moving rectangle and yellow ball
function redBallhits() {
    // red ball hit the target
    if (((smallX > x && smallX < (x + side)) || ((smallX + target) > x && smallX < (x + side))) && ((smallY > y && smallY < (y + side)) || ((smallY + target) > y && smallY < (y + side)))) {
        // make the target
        redtargetDisplay();
        sound1.play();
        radius = radius + 5;
        //Score increasing.
        Score++;
    }
    //redball hits the yellowsquare
    if (((sqryellowx > x && sqryellowx < (x + side)) || ((sqryellowx + sqr) > x && sqryellowx < (x + side))) && ((Syellowbally > y && Syellowbally < (y + side)) || ((Syellowbally + sqr) > y && Syellowbally < (y + side)))) {
        Score = Score + 2;
        sound1.play();
        yellowtargetDisplay();
    }
    //yellow ball and red ball collision
    if (((yellowballX > x && yellowballX < (x + side)) || ((yellowballX + target) > x && yellowballX < (x + side))) && ((yellowballY > y && yellowballY < (y + side)) || ((yellowballY + target) > y && yellowballY < (y + side)))) {
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
            sound4.play();
            if (Score < 2) {//when red ball Score for red is lesser than five the Score become 0
                Score = 0;
            }
            else {//when red ball Score is greater than five the Score of red will be decrese by 5
                Score = Score - 2;
            }
        }
    }
}
//yellow ball is dashing targets(square), moving rectangle and red ball
function yellowBallhits() {
    //yello ball hits the red Square
    if (((smallX > yellowballX && smallX < (yellowballX + side)) || ((smallX + target) > yellowballX && smallX < (yellowballX + side))) && ((smallY > yellowballY && smallY < (yellowballY + side)) || ((smallY + target) > yellowballY && smallY < (yellowballY + side)))) {
        sound2.play();
        redtargetDisplay();
        ScoreRandom = ScoreRandom + 2;
    }

    //yellow ball hit the yellow Square
    if (((sqryellowx > yellowballX && sqryellowx < (yellowballX + side)) || ((sqryellowx + sqr) > yellowballX && sqryellowx < (yellowballX + side))) && ((Syellowbally > yellowballY && Syellowbally < (yellowballY + side)) || ((Syellowbally + sqr) > yellowballY && Syellowbally < (yellowballY + side)))) {
        sound2.play();
        ScoreRandom = ScoreRandom + 1;
        radius1 = radius1 + 5;
        yellowtargetDisplay();

    }
    for (i in dangerX) {
        //yellow ball collition with rectangle
        if (((dangerX[i] > yellowballX && dangerX[i] < (yellowballX + side)) || ((dangerX[i] + danwidth) > yellowballX && dangerX[i] < (yellowballX + side))) && ((dangerY[i] > yellowballY && dangerY[i] < (yellowballY + side)) || ((dangerY[i] + danheight) > yellowballY && dangerY[i] < (yellowballY + side)))) {
            yellowballX = 1100;
            yellowballY = 300;
            radius1 = 30;
            sound4.play();
            if (ScoreRandom < 2) {//when yellow ball Score is lesser than five the Score is 0
                ScoreRandom = 0;
            }
            else {//when the yellow ball Score is greater than five the Score will be decrese by 5 
                ScoreRandom = ScoreRandom - 2;
            }
        }
    }
}
//red ball and yellow ball within the bound
function boundary() {
    // red ball within the bounds 
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
    //yellow ball within the bound
    if (yellowballY + side > innerHeight) {
        yellowballY = innerHeight - side;
    }
    if (yellowballY < 0) {
        yellowballY = 0;
    }
    if (yellowballX < 0) {
        yellowballX = 0;
    }
    if (yellowballX + side > innerWidth) {
        yellowballX = innerWidth - side;
    }
}

//move the
function movingRectangle() {
    //call the rectangle function 
    drawRect(dangerX[0], dangerY[0], danwidth, danheight);
    drawRect(dangerX[1], dangerY[1], danwidth, danheight);
    drawRect(dangerX[2], dangerY[2], danwidth, danheight);
    drawRect(dangerX[3], dangerY[3], danwidth, danheight);
    drawRect(dangerX[4], dangerY[4], danwidth, danheight);
    drawRect(dangerX[5], dangerY[5], danwidth, danheight);
    drawRect(dangerX[6], dangerY[6], danwidth, danheight);
    drawRect(dangerX[7], dangerY[7], danwidth, danheight);

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

}
//dispaly the score and timecount
function scorecard() {
    // display the square and countdown
    ctx.fillStyle = "white";
    ctx.font = '34px Arial';
    ctx.fillText('Goal Red: ' + Score, 85, 95);
    ctx.fillText('Goal Yellow:' + ScoreRandom, 995, 95);
    ctx.fillText('Time count: ' + counttime, 495, 85);
    ctx.font = '11px Arial'
    ctx.fillText('up:W   down:X   left:A   right:D', 999, 105);
    ctx.fillText('use Arrow key to move redball', 99, 107);
}
function animation() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    //ball will be inside of the boundary till game is comes to end.
    boundary();
    //move the rectangles to left to right
    for (z in dangerX) {
        dangerX[z] = dangerX[z] + move;
    }
    redBallhits();//red ball is dashing targets(square), moving rectangle and yellow ball
    yellowBallhits();//yellow ball is dashing targets(square), moving rectangle and red ball
    movingRectangle();//move the rectangle right to left side
    
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
    ctx.arc(yellowballX, yellowballY, radius1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    //danger square
    ctx.fillStyle = "yellow";
    ctx.fillRect(sqryellowx, Syellowbally, sqr, sqr);
    scorecard();//display the score and timecount
    if (!over) {
        gameOver();
    }
    if (counttime <= 0) {
        gameOver();
    }
    else {
        window.requestAnimationFrame(animation);
    }
}
//start game
starting();
