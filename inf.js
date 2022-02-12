
var canvas = document.querySelector('canvas');
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');
var distancePerPoint = .1;
var drawFPS          = 60;

var origs = document.getElementsByClassName('flecha'), length, timer;
function startDrawingPath(R,G,B){
  length = 0;
  let color ="#f60"
  for (let i=0; i<origs.length; i++) {
      let orig = origs[i]
      color = "rgb("+R.toString() + " ," + G.toString() + ",  " + B.toString()+")";
      //console.log(color)
      orig.style.stroke =color; 
      //orig.style.fill =color; 
      //console.log(color);
      timer = setInterval(increaseLength,1000/drawFPS);
  }
}

function increaseLength(){
  for (let i=0; i<origs.length; i++) {
      let orig = origs[i]
      var pathLength = orig.getTotalLength();
      length += distancePerPoint;
      orig.style.strokeDasharray = [length,pathLength].join(' ');
      //if (length >= pathLength) stopDrawingPath();
      if (length >= pathLength) clearInterval(timer);
  }
}


let myobj = document.getElementsByTagName('svg')[0].cloneNode(true);
function redrawPath(X,Y){

  let R =context.getImageData(X, Y,1,1).data[0];
  let G =context.getImageData(X, Y,1,1).data[1];
  let B = context.getImageData(X, Y,1,1).data[2];
  console.log(R,G,B);
  var a = document.getElementsByTagName('canvas')[0];   // [2] is the index of library.js
  var old = document.getElementsByTagName('svg')[0];
  old.parentNode.removeChild(old);
  document.getElementsByTagName('body')[0].insertBefore(myobj,a);
  startDrawingPath(R,G,B);


}
startDrawingPath(0,0,0);
//setTimeout(increaseLength,9600);
//

let clicks = 0;
let desc = false;
var ctx = canvas.getContext('2d');
for (var i = 0; i < 20 + clicks; i++) {
    for (var j = 0; j < 20 + clicks; j++) {
      ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ', ' +
        Math.floor(255 - 42.5 * j) + ', 0)';
      ctx.fillRect(j * 25, i * 25, 25, 25);
    }
}
//canvas.addEventListener('click', function(event) {
function grow(){
    if (desc) {
      clicks -= 10;
      if (clicks < 0) {
        desc = false;
      }
    } else {
      clicks += 10;
      if (clicks >= 30) {
        desc = true;
      }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < 20 + clicks; i++) {
        console.log(i);
      for (var j = 0; j < 20+ clicks; j++) {
        ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ', ' +
          Math.floor(255 - 42.5 * j) + ', 0)';
        ctx.fillRect(j * 25, i * 25, 25, 25);
      }
    }
}
document.body.onclick = (e) => {redrawPath(e.clientX, e.clientY);grow();}
