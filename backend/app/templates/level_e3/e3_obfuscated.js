// Select the element
const element = document.querySelector('#finish');
let isSet = false;

setInterval(() => {
  if (element.getAttribute('aria-labelledby') === '1 3 2 4' && !isSet) {
    element.innerHTML = '{{level_session.finish_secret}}';
    isSet = true;
  }}, 0);
