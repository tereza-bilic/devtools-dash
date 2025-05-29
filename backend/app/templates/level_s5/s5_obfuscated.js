window.potentialSecret = '';
window.fullSecret = '';
let current_index = 0;
const alphabet = 'ABCDEF123456789'

const combinations = [];
for (let i = 0; i < alphabet.length; i++) {
  for (let j = 0; j < alphabet.length; j++) {
      combinations.push(alphabet[i] + alphabet[j]);
  }
}

setInterval(() => {
  window.potentialSecret = combinations[current_index];
  current_index = (current_index + 1) % combinations.length;
  if (window.potentialSecret === "B2") {
    fullSecret = "{{ level_session.finish_secret }}";
    return;
  }
  fullSecret = new Array(6).fill(null).map(() => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
}, 50); // Update every 50 ms


