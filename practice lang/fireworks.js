const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.heigth = window.innerHeight;

class Firework {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.color = color;
        this.createParticles();
    }
    createParticles(){
        for(let i=0; i<50; i++){
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: (Math.random()-0.5)*6,
                vy: (Math.random()-0.5)*6,
                alpha: 1,
                size: Math.random()*3+1
            });
        }
    }

update() {
    this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
    });
    this.particles = this.particles.filter(p => p.alpha>0);
}
    draw(ctx){
        this.particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            ctx.fillStyle = `rgba(${this.color.r}.${this.color.g},${this.color.g},${p.alpha})`;
            ctx.fill();
        });
    }
}

const fireworks = [];

function randomColor(){
    return {
        r: Math.floor(Math.random()*255),
        g: Math.floor(Math.random()*255),
        b: Math.floor(Math.random()*255)
    };
}

function animate(){
    ctx.fillStyle = 'rgba(1,2,14,0.2)';
    ctx.fillRect(0,0,canvas.width,canvas.heigth);

    if(Math.random()<0.05){
        fireworks.push(new Firework(Math.random()*canvas.width, Math.random()*canvas.heigth/2,randomColor()));
    }
    
    fireworks.forEach(f => {
        f.update();
        f.draw(ctx);
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.heigth = window.innerHeight;

});

const text = "happy New Year 2026";
const newYearText = document.getElementById("newYearText");
let index = 0;

function typeLetter(){
    if(index < text.length){
        newYearText.textContent += text[index];
        index++;
        setTimeout(typeLetter, 150);
    }
}

typeLetter();