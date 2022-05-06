let c = document.getElementById("myCanvas");
c.width = window.innerWidth/100*60
c.height = window.innerHeight/100*70
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

let pipe = []

class Rectangle {
  constructor(posX, posY, width, height) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
  }
}


class Pipe{
  constructor(topRec, botRec){
    this.top = topRec;
    this.bot = botRec;
  }
}

for(let i = 0;i < parseInt((parseInt(c.width/200+1)%2) ? c.width/200+1 : c.width/200);i++){
  let rand = randomNumber();
 let top = new Rectangle(200*i,rand,100,HEIGHT)
 let bot = new Rectangle(200*i,rand-HEIGHT-150,100,HEIGHT)
 let pipeN = new Pipe(top,bot);
 pipe.push(pipeN)
}
for(let i = 0;i < parseInt((parseInt(c.width/200+1)%2) ? c.width/200+1 : c.width/200);i++){
  console.log(pipe[i])
}
function updatePipe(i){
  pipe[i].top.posY = pipe[i].bot.posY = randomNumber();
  pipe[i].top.posX =pipe[i].bot.posX = c.width

}
let score = 0;
let imge = document.getElementById('pics')
let rectPosX=0,rectPosY = randomNumber(); 
let currentIndexOfPipe = 0
var interval1,interval2;
interval1 = setInterval(drawChar, 10);
interval2 = setInterval(() => {
    if(bird.y<HEIGHT-20 && bird.y>0){
        // bird.y++;
    }
    if(rectPosX<c.width){
        rectPosX++;
    }else{
        rectPosX = 0
    }
    },10)

function randomNumber() {
  return Math.floor(Math.random() * (c.height - 350) + 250);
} 
function drawOb() {
  for(let i of pipe){
    ctx.beginPath();
    ctx.rect(  i.bot.posX - rectPosX, i.bot.posY, 100, HEIGHT);
    ctx.stroke();
  
    ctx.beginPath();
    ctx.rect( i.top.posX - rectPosX, i.top.posY,100, HEIGHT);
    ctx.stroke();
  }
}

function drawChar() {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.drawImage(imge,80,80,500,400,bird.x-20,bird.y-20,40,40)
  drawOb();
  // if((bird.x + 20 >= rectPosX && bird.x <= rectPosX+100)&& (bird.y+20 > rectPosY || bird.y-20 < rectPosY-150)){
  //     clearInterval(interval1)
  //     clearInterval(interval2)
  //     document.body.appendChild(dv)
  // }else{
  //     if(bird.x == rectPosX+100){
  //         score +=10;
  //         document.getElementById("score").innerText = score;
  //     }
  // }
}

window.addEventListener("keypress", (event) => {
  if(event.keyCode===32){
    if (bird.y > 30) {
      bird.y -= 30;
    }
  }
});
c.addEventListener("click", (event) => {
    if (bird.y > 30) {
      bird.y -= 30;
    }
});
function restart(){
    dv.remove()
interval1 = setInterval(drawChar, 10);
interval2 = setInterval(() => {
    if(bird.y<HEIGHT-20 && bird.y>0){
        // bird.y++;
    }
    if(rectPosX>-150){
        // rectPosX--;
    }else{
        rectPosX = c.width
        rectPosY = randomNumber();
    }
    },10)
    bird.y = HEIGHT/2
    score = 0;document.getElementById("score").innerText = score;
    rectPosX=c.width, rectPosY = randomNumber();
}
