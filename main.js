'use strict'

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

function init(){
  addItem('carrot', 'img/carrot.png', 5);
  addItem('bug', 'img/bug.png', 5);
}

function addItem(className, imgPath, count){
for(let i = 0; i < count; i++){
  const items = document.createElement('img');
  items.setAttribute('class', className);
  items.setAttribute('src', imgPath);
  field.appendChild(items);
  const x = randomNumber(fieldRect.width - 80);
  const y = randomNumber(fieldRect.height - 80);
  items.style.position = 'absolute';
  items.style.left = `${x}px`;
  items.style.top = `${y}px`;
}
}
function randomNumber(max){
  return Math.floor(Math.random() * max);
}
init();