var canvas = document.getElementById("game");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

let Score = 0;
var x = 55;
var y = 300;
radius = 30;
startAngle = 0;
endAngle = Math.PI * 2;
var speed = 15;
var side = 50;

//small square
var smallX = 0;
var smallY = 0;
var target = 25;
var counttime = 50;
var setcount = null;
var down = false;
var up = false;
var right = false;
var left = false;




//move the Ball
window.onkeydown = function (event) {
    var key = event.keyCode;
    if (key === 40) { // DOWN
        y += speed;
    }
    if (key === 38) { // UP
        y -= speed;
    }
    if (key === 37) { // LEFT
        x -= speed;
    }
    if (key === 39) { // RIGHT
        x += speed;
    }
};

function starting() {
    // Reduce the countdown timer ever second
    setcount = setInterval(function () { counttime--; }, 1000)
    // Put the target at a random 
    targetDisplay();
    // Kick off the Animation loop
    Animation();
}
function range(a, b, c) {
    return (a > b && a < c);
}
function targetDisplay() {
    smallX = Math.round(Math.random() * innerWidth - target);
    smallY = Math.round(Math.random() * innerHeight - target);
}


function gameOver() {
    //countttime stop;
    clearInterval(setcount);
    //display game over 
    remove();
    ctx.fillStyle = "#000000";
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText("your score is:" + Score, innerWidth / 2, innerHeight / 2);
    ctx.font = "50px Arial";
    ctx.fillStyle = "#000000"
    ctx.fillText("Thank You!", 645, (innerHeight / 2) + 78);
    ctx.font = "20px Arial";
    ctx.fillStyle = "green"
    ctx.fillText("Do you want to continue press (F5)", 645, (innerHeight / 2) + 118);
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
    if ((range(smallX, x, x + side) || range(smallX + target, x, x + side)) && ((range(smallY, y, y + side) || range(smallY + target, y, y + side)))){
            // make the target
            targetDisplay();
            radius = radius + 5;
            //Score increasing.
            Score++;
        }
    
    //hit the danger square
    if (counttime % 5 === 0) {
        //danger square
        var dangerX = 100;
        var dangerY = 80;
        var sqr = 25;
        if((range(dangerX, x, x + side) || range(dangerX + sqr, x, x + sqr)) && ((range(dangerY, y, y + side) || range(dangerY + sqr, x, x + sqr)))) {
                alert("ball touch the danger!");
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

    //danger square
    ctx.fillStyle = "green";
    ctx.fillRect(dangerX, dangerY, sqr, sqr);

    // display the sqare and countdown
    ctx.fillStyle = "black";
    ctx.font = '34px Arial';
    ctx.fillText('Goal: ' + Score, 30, 34);
    ctx.fillText('Time count: ' + counttime, 30, 74);
    if (counttime <= 0) {
        gameOver();
    }
    else {
        window.requestAnimationFrame(Animation);
    }
}
starting();