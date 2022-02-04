
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

function toggleText(button_id) 
{
   var el = document.getElementById(button_id);
   if (el.firstChild.data == "Palabras") 
   {
       el.firstChild.data = "Unlock";
       var newDiv = document.createElement("div");
       var newContent = document.createTextNode("Hola!¿Qué tal?");
       newDiv.appendChild(newContent); //añade texto al div creado.
       document.body.insertBefore(newContent,el);
   }
   else 
   {
     el.firstChild.data = "Palabras";
   }
}

//keep track of clicks on Palabras string
var clicks = 0;

function onClick() {
  clicks += 1;
  console.log(clicks);
  if (clicks % 2 === 0) {
    toggleText("clicks");
  }
  //document.getElementById("clicks").innerHTML = clicks;
};
