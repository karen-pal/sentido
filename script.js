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
