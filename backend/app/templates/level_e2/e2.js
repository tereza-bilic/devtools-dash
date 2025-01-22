const box2 = document.getElementById('box2');

const box3 = document.getElementById('box3');

let box4 = null;
setInterval(() => {
  if (box2.matches('.box2:hover')) {
    if (box4 !== null) {
      return;
    }
    box3.innerHTML = `<div id="box4" class="box4">box4</div>`;
    box4 = document.getElementById('box4');
    box4.addEventListener('mouseover', () => {
      box4.innerHTML = '{{level_session.finish_secret}}'
    });

    box4.addEventListener('mouseout', () => {
        box4.innerHTML = 'last box'
    });
  } else {
    if (box4 === null) {
      return;
    }
    box3.innerHTML = 'box3';
    box4 = null;

  }
}, 50);

