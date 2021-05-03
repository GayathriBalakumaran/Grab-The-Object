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
var over = true;

// random ball
var yellowX = 1100;
var yellowY = 300;
var radius1 = 30;
var ScoreRandom = 0;

var Syellowx = 500;
var Syellowy = 90;
var sqr = 25;

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
    // Kick off the Animation loop
    Animation();
}

function targetDisplay() {
    smallX = Math.round(Math.random() * innerWidth - target);
    smallY = Math.round(Math.random() * innerHeight - target);
}
function yellowDisplay(){
    Syellowx=Math.round(Math.random() * innerWidth - target);
    Syellowy = Math.round(Math.random() * innerHeight - target);    
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
    ctx.font = '24x Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('yellow Score is: ' + ScoreRandom, 648, (innerHeight / 2) + 50);
    ctx.font = "20px Arial";
    ctx.fillStyle = "green"
    ctx.fillText("Do you want to continue press (F5)", 670, (innerHeight / 2) + 98);
    ctx.fillStyle = "#000000";
    ctx.font = '45px Arial';
    ctx.fillText("Game Over!!", 648, (innerHeight / 2) - 55);
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
    if (yellowX > innerWidth - radius1 || yellowX < radius1) {
        rx = -rx;
    }
    if (yellowY > innerHeight - radius1 || yellowY < radius1) {
        rx = -rx;
    }
    yellowX = rx;
    yellowY = ry;
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
    if (((yellowX > x && yellowX < (x + side)) || ((yellowX + target) > x && yellowX < (x + side))) && ((yellowY > y && yellowY < (y + side)) || ((yellowY + target) > y && yellowY < (y + side)))) {
        sound3.play();
        over = false;
    }

    //hit the yellow square
    if (((Syellowx > x && Syellowx < (x + side)) || ((Syellowx + sqr) > x && Syellowx < (x + side))) && ((Syellowy > y && Syellowy < (y + side)) || ((Syellowy + sqr) > y && Syellowy < (y + side)))) {
       Score=Score+2;
       sound1.play();
       yellowDisplay();
    }
    if (((Syellowx > yellowX && Syellowx < (yellowX + side)) || ((Syellowx + sqr) > yellowX && Syellowx < (yellowX + side))) && ((Syellowy > yellowY && Syellowy < (yellowY + side)) || ((Syellowy + sqr) > yellowY && Syellowy < (yellowY + side)))) {
        sound2.play();
        ScoreRandom=ScoreRandom+1;
        radius1=radius1+5;
        yellowDisplay();
    }

    //ball
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
    ctx.fillStyle = "black";
    ctx.font = '34px Arial';
    ctx.fillText('Goal Red: ' + Score, 100, 54);
    ctx.fillText('Goal Yellow:' + ScoreRandom, 990, 54);
    ctx.fillText('Time count: ' + counttime, 490, 54);
    ctx.font = '11px Arial'
    ctx.fillText('up:W   down:X   left:A   right:D', 1000, 70);
    ctx.fillText('use Arrow key to move redball', 100, 70)
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
