const box2 = document.getElementById('box2');
const boxes = document.getElementById('boxes');

let box3 = null;
setInterval(() => {
  if (box2.matches('.box2:hover')) {
    if (box3 !== null) {
      return;
    }

    box3 = document.createElement('div');
    box3.className = 'box3';
    box3.innerHTML = 'Hover me for real';
    boxes.appendChild(box3);

    box3.addEventListener('mouseover', () => {
      box3.innerHTML = '{{level_session.finish_secret}}'
    });

    box3.addEventListener('mouseout', () => {
        box3.innerHTML = 'Hover me for real'
    });
  } else {
    if (box3 === null) {
      return;
    }

    boxes.removeChild(box3);
    box3 = null;
  }
}, 50);

