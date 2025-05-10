
x = document.getElementById("fix");

setInterval(() => {
  if (x === 'fixed') {
    console.error('Error :(');
  } else {
    x.innerHTML = '{{level_session.finish_secret}}';
  }
}, 1000);
