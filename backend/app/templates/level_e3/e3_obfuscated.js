// Select the element
const element = document.querySelector('#finish');
let isSet = false;

setInterval(() => {
  if (element.getAttribute('aria-labelledby') === '2 1 4 3' && !isSet) {
    element.innerHTML = '{{level_session.finish_secret}}';
    isSet = true;
  }}, 0);
