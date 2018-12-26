let mousePos = {x:0,y:0};
window.addEventListener('mousemove', function(evt) {
  mousePos = {
    x: evt.clientX,
    y: evt.clientY
  };
});
const easingFunctions = {
  // no easing, no acceleration
  linear: function (t) { return t },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t*t },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t*(2-t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  // accelerating from zero velocity 
  easeInCubic: function (t) { return t*t*t },
  // decelerating to zero velocity 
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  // acceleration until halfway, then deceleration 
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  // accelerating from zero velocity 
  easeInQuart: function (t) { return t*t*t*t },
  // decelerating to zero velocity 
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  // acceleration until halfway, then deceleration 
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}
const map = function(num,inStart,inEnd,outStart,outEnd) {
  let output = num-inStart;
  output = output/(inEnd-inStart);
  output = output*(outEnd-outStart);
  output = output+outStart;
  return output;
}
const lerp = function(v0, v1, t) {
    return v0*(1-t)+v1*t;
}
const distSq  = function(x1,y1,x2,y2) {
  return Math.abs(Math.pow(x2-x1,2) + Math.pow(y2-y1,2))
}

class CanvasController {
  start() {
    this.playStatus = true;
    this.draw();
  }
  stop() {
    this.playStatus = false;
  }
  draw() {
    if(this.playStatus) {
      this.render(this.renderContext);
    }
    window.requestAnimationFrame(() =>{this.draw()});
  }
  constructor(element, render, init, renderContext) {
      this.element = element;
      this.render = render;
      this.renderContext = renderContext;
      this.playStatus = true;
    init(this.renderContext);
  }
}

let a = document.getElementById('a');
let b = document.getElementById('b');
let c = document.getElementById('c');

let aCtx = a.getContext('2d');
let bCtx = b.getContext('2d');
let cCtx = c.getContext('2d');

function init(ctx) {
  ctx.strokeStyle="#aa3333";
  ctx.lineCap="round";
  ctx.lineWidth=4;
}

function crossRender(ctx) {
  ctx.clearRect(0, 0, 32, 32);
  let size = Math.sin(Number(new Date())/100);
  let col = Math.sin(Number(new Date())/100);
  // ctx.strokeStyle = 'hsl('+ 360*Math.random() +',100%,50%)';
  size = (size+1)/2;
  // size = easingFunctions.easeInOutQuad(size);
  size = map(size,0,1,22,26);
  let small = 16 - (size/2);
  let big = 16 + (size/2);
  
  ctx.beginPath();
  ctx.moveTo(small,small);
  ctx.lineTo(big,big);
  ctx.moveTo(small,big);
  ctx.lineTo(big,small);
  ctx.stroke();
}

function rainbowRender(ctx) {
  ctx.clearRect(0, 0, 32, 32);
  let size = 24;
  ctx.strokeStyle = 'hsl('+ (new Date()/10)%360 +',100%,50%)';
  let small = 16 - (size/2);
  let big = 16 + (size/2);
  
  ctx.beginPath();
  ctx.moveTo(small,small);
  ctx.lineTo(big,big);
  ctx.moveTo(small,big);
  ctx.lineTo(big,small);
  ctx.stroke();
}

function circleRender(ctx) {
  ctx.clearRect(0, 0, 32, 32);
  let size = Math.sin(Number(new Date())/100);
  let col = Math.sin(Number(new Date())/100);
  // ctx.strokeStyle = 'hsl('+ 360*Math.random() +',100%,50%)';
  size = (size+1)/2;
  // size = easingFunctions.easeInOutQuad(size);
  if(this.element.classList.contains("hover")) {
    size = 0.5;
  }
  size = map(size,0,1,22,26);
  let small = 16 - (size/2);
  let big = 16 + (size/2);
  
  ctx.beginPath();
  ctx.arc(16,16,size/2,0,2*Math.PI);
  ctx.stroke();
}


function greyRender(ctx) {
  ctx.beginPath();
  ctx.fillStyle = 'hsl('+ 1/(distSq(mousePos.x, mousePos.y,90,90)/100000) +',100%,50%)';
  // ctx.fillStyle = "#333333";
  ctx.rect(0,0,32,32);
  ctx.fill();
}


let aCanvasController = new CanvasController(a,crossRender,init,aCtx);
let bCanvasController = new CanvasController(b,rainbowRender,init,bCtx);
let cCanvasController = new CanvasController(c,greyRender,init,cCtx);
aCanvasController.start();
bCanvasController.start();
cCanvasController.start();

c.addEventListener("mouseover", function(event) {
  cCanvasController.stop();
});
c.addEventListener("mouseout", function(event) {
  cCanvasController.start();
});



