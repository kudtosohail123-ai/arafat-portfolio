const c = document.getElementById("c");
const x2d = c.getContext("2d");

c.width = innerWidth;
c.height = innerHeight;

let x = c.width/2;
let baseY = c.height/2 - 60;
let y = baseY;

let dir = 0;        
let vy = 0;
let step = 0;

const S = 1.6;
const g = 1.2;

function walk(d){ dir = d; }
function stopWalk(){ dir = 0; }

function jump(){
    if(y === baseY) vy = -22;
}

function line(x1,y1,x2,y2){
    x2d.beginPath();
    x2d.moveTo(x1,y1);
    x2d.lineTo(x2,y2);
    x2d.stroke();
}

function circle(x,y,r){
    x2d.beginPath();
    x2d.arc(x,y,r,0,Math.PI*2);
    x2d.fill();
}

function draw(){
    x2d.clearRect(0,0,c.width,c.height);

    step += 0.15;
    x += dir * 3;

    y += vy;
    vy += g;
    if(y > baseY){ y = baseY; vy = 0 }

    x2d.lineWidth = 8;
    x2d.strokeStyle = "#f1c40f";
    x2d.fillStyle = "#f9e79f";

    circle(x, y-80*S, 24*S);

    line(x, y-45*S, x, y+40*S);

    line(x, y-20*S, x-45*S, y + Math.sin(step)*20);
    line(x, y-20*S, x+45*S, y - Math.sin(step)*20);

    line(x, y+40*S, x-35*S, y+95*S + Math.sin(step)*25);
    line(x, y+40*S, x+35*S, y+95*S - Math.sin(step)*25);

    requestAnimationFrame(draw);
}

draw();