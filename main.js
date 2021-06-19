'use strict';
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const start = document.querySelector('.game__button');
const timer = document.querySelector('.game__timer');
const score = document.querySelector('.game__score');

let started = false; //게임의 상태를 기억하는 변수 설정
let Cscore = 0;
let ctimer = undefined;

start.addEventListener('click', () => {
  if(started){
    stopGame();
  }else{
    startGame();
  }
  started = !started;//started가 false이면 true를 입력해주는 기능
});

function startGame(){
  init();
  showTimerAndScore();
  showStopBtn();
}

function stopGame(){ 

}

function showTimerAndScore(){
  timer.style.visibility = 'visible';
  score.style.visibility = 'visible';
  printNumbers(10, 0);
}

function showStopBtn(){
  const icon = start.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');

}

function init(){
  field.innerHTML = '';
  addItem('carrot', 'img/carrot.png', CARROT_COUNT);
  addItem('bug', 'img/bug.png', BUG_COUNT);
  currentScore(CARROT_COUNT);
}

function currentScore(num){
  score.innerHTML = `${num}`;
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
function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    timer.innerHTML = `${current < 10 ? `0${current}` : current}:00`;
    if (current == to) {
      clearInterval(timerId);
    }
    current--;
  }, 1000);
}