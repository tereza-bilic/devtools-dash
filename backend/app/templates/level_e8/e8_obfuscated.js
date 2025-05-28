// JavaScript for level e8
// Filename: e8_obfuscated.js
const completeSecret = "{{level_session.finish_secret}}";

document.addEventListener('DOMContentLoaded', function() {

  // Complete secret is the combination of both codes

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.getElementById('darkModeSecret').textContent = completeSecret.slice(0, 3);
  }

  if( window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.getElementById('lightModeSecret').textContent = completeSecret.slice(3, 6);
  }
});


window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  document.getElementById('darkModeSecret').textContent = completeSecret.slice(0, 3);
  document.getElementById('lightModeSecret').textContent = completeSecret.slice(3, 6);
  const newColorScheme = event.matches ? 'dark' : 'light';
  setTimeout(()=> {
    if (newColorScheme === 'dark') {
        document.getElementById('lightModeSecret').textContent = '';
    } else {
        document.getElementById('darkModeSecret').textContent = '';
    }
  },300);
    console.log(`Color scheme changed to: ${newColorScheme}`);
});
