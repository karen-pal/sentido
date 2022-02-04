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
document.body.appendChild(arrow3.node);
/*
  - arrow.node is HTMLElement
  - arrow.timer is idInterval from setInterval()
    REMEMBER about clearInterval(node.timer) after unmount
*/
function llenar() {
  var targetElement = document.getElementById("texto");
  targetElement.className = "animate";
    console.log("doing");
}
//load webcam
var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}

const processor = {};
let c1 = document.getElementById("c1");
let ctx1 = c1.getContext("2d");
function thing(video) {
    console.log(c1.width,c1.height);
    //ctx1.drawImage(video, 0, 0, c1.width, c1.height);
    //const IMGDAT = ctx1.getImageData(0, 0, c1.width, c1.height);
    //ctx1.putImageData(IMGDAT, 0, 0);
    ctx1.beginPath();
    ctx1.fillRect(20, 20, 1500, 1000);
    ctx1.stroke();
};
thing(video);

