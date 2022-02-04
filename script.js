function drawGraph(){
const arrow = arrowCreate({
  from: document.getElementById('maquina'),
  to: {
      node:document.getElementById('info'),
      translation: [-4.5, -0],
    },
});

const arrow2 = arrowCreate({
  from: document.getElementById('info'),
  to: {
      node:document.getElementById('carne'),
      translation: [-0,-0.5],
    },
});

const arrow3 = arrowCreate({
  from: document.getElementById('carne'),
  to: {
      node:document.getElementById('maquina'),
      translation: [1,0.55],
    },
});

document.body.appendChild(arrow.node);
document.body.appendChild(arrow2.node);
document.body.appendChild(arrow3.node);}
/*
  - arrow.node is HTMLElement
  - arrow.timer is idInterval from setInterval()
    REMEMBER about clearInterval(node.timer) after unmount
*/
function llenar() {
  var targetElement = document.getElementById("texto");
  targetElement.className = "animate";
}

navigator.mediaDevices.getUserMedia({
    video: {
      width:     window.innerWidth,
      height:    window.innerHeight,
      frameRate: 30
    }
  }
).then(function(stream) {
  let video = document.querySelector('video');
  video.srcObject = stream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
}).catch(function(err) {
  // deal with an error (such as no webcam)
});

let video = document.querySelector('video');

var canvas = document.querySelector('canvas');
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');
//context.drawImage(video, 0, 0, canvas.width, canvas.height);


var PIXEL_FILLED = 0;
var PIXEL_EMPTY  = 255;
var PIXEL_SIZE = 1;
  function pixelate(image, canvas, context, pixelSize) {
    let wScaled, hScaled, scale;
  
    scale = 1/pixelSize;
    wScaled = canvas.width*scale;
    hScaled = canvas.height*scale;
    //console.log(scale,wScaled,hScaled); 
    context.drawImage(image, 0, 0, wScaled, hScaled);
    context.mozImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    context.drawImage(canvas, 0, 0, wScaled, hScaled, 0, 0, canvas.width, canvas.height);
  };
  function removeFill (context, width, height, pixelSize) {
    let unfillPixel, data, dataRef, image, neighbourIndices;

    image = context.getImageData(0, 0, width, height);

    data = image.data;

    dataRef = data.slice();

    for (let i = 0; i < dataRef.length; i = i+4) {
      if(dataRef[i] < PIXEL_FILLED+50 && dataRef[i] > PIXEL_FILLED-50) {

        unfillPixel = true;

        neighbourIndices = [
          (i - 4*pixelSize),
          (i + 4*pixelSize),
          (i - 4*width*pixelSize),
          (i + 4*width*pixelSize)
        ];

        for (let p = 0; p < neighbourIndices.length; p++) {
          if ((neighbourIndices[p] < 0) || (neighbourIndices[p] >= dataRef.length)){
            continue;
          }

          if (dataRef[neighbourIndices[p]] == PIXEL_EMPTY) {
            unfillPixel = false;
            break;
          }
        }

        if(unfillPixel) {
          data[i] = data[i+1] = data[i+2] = PIXEL_EMPTY;
        }
      }
    }
    image.data = data;

    context.putImageData(image, 0, 0);
  }

  function draw(video, canvas, context, frameRate) {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    pixelate(video, canvas, context,PIXEL_SIZE);
    removeFill(context, window.innerWidth, window.innerHeight,20);
    setTimeout(draw, 1/frameRate, video, canvas, context, frameRate);
  };
  // video 'play' event listener
  video.addEventListener('play', function() {
    //context.drawImage(this, 0, 0, canvas.width, canvas.height);
    draw(video,canvas,context,30);
  }, false);



document.onmousemove = (e) => {PIXEL_SIZE += 1 ; PIXEL_FILLED=context.getImageData(e.clientX, e.clientY,1,1).data[0];}
document.body.onclick = (e) => {PIXEL_SIZE = 1; PIXEL_FILLED=0;}
document.body.ontouchmove = (e) => {PIXEL_SIZE += 1 ; PIXEL_FILLED=context.getImageData(e.clientX, e.clientY,1,1).data[0];} 
document.body.ontouchend = (e) => {PIXEL_SIZE = 1; PIXEL_FILLED=0;}
