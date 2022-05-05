let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
const HEIGHT = c.height;
const dv = document.createElement("div");
dv.classList.add("gameOver");
dv.innerHTML = 
`<div>
<h1>GAME OVER</h1>
<h4 class="center">Click to START</h4>
</div>`
dv.addEventListener('click',restart)
let bird = {
  x: 20,
  y: 20,
};

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}
let score = 0;
let imge = document.getElementById('pics')
let rect1 = new Rectangle(100, HEIGHT);
let rect2 = new Rectangle(100, HEIGHT);
let rectPosX=c.width,rectPosY = randomNumber(); 
var interval1,interval2;
interval1 = setInterval(drawChar, 10);
interval2 = setInterval(() => {
    if(bird.y<HEIGHT-20 && bird.y>0){
        bird.y++;
    }
    if(rectPosX>-150){
        rectPosX--;
    }else{
        rectPosX = c.width
        rectPosY = randomNumber();
    }
    },10)

function randomNumber() {
  return Math.floor(Math.random() * (c.height - 350) + 250);
} 
function drawOb() {
  ctx.beginPath();
  ctx.rect(rectPosX, rectPosY, rect1.width, rect1.height);
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(rectPosX, rectPosY - HEIGHT - 150, rect2.width, rect2.height);
  ctx.stroke();
}

function drawChar() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.drawImage(imge,80,80,500,400,bird.x-20,bird.y-20,40,40)
  drawOb();
  if((bird.x + 20 >= rectPosX && bird.x <= rectPosX+100)&& (bird.y+20 > rectPosY || bird.y-20 < rectPosY-150)){
      clearInterval(interval1)
      clearInterval(interval2)
      document.body.appendChild(dv)
  }else{
      if(bird.x == rectPosX+100){
          score +=10;
          document.getElementById("score").innerText = score;
      }
  }
}

window.addEventListener("keypress", (event) => {
  if (event.keyCode === 32) {
    if (bird.y > 30) {
      bird.y -= 30;
    }
  }
});
function restart(){
    dv.remove()
interval1 = setInterval(drawChar, 10);
interval2 = setInterval(() => {
    if(bird.y<HEIGHT-20 && bird.y>0){
        bird.y++;
    }
    if(rectPosX>-150){
        rectPosX--;
    }else{
        rectPosX = c.width
        rectPosY = randomNumber();
    }
    },10)
    bird.y = HEIGHT/2
    score = 0;document.getElementById("score").innerText = score;
    rectPosX=c.width, rectPosY = randomNumber();
}
