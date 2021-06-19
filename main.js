'use strict';
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_SEC = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const start = document.querySelector('.game__button');
const timer = document.querySelector('.game__timer');
const score = document.querySelector('.game__score');

const popUp = document.querySelector('.pop-up--hide');
const popUpText = popUp.querySelector('.pop-up__message');
const popUpRefresh = popUp.querySelector('.pop-up__refresh');

const icon = start.querySelector('.fa-play');

let started = false; //게임의 상태를 기억하는 변수 설정
let timerId = undefined;

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
  stopGameTimer();
  hideGameButton();
  showPopUp('Replay?');
}

function showTimerAndScore(){
  timer.style.visibility = 'visible';
  score.style.visibility = 'visible';
  printNumbers(GAME_SEC);
}

function showStopBtn(){
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function hideGameButton(){
  start.style.visibility = 'hidden';
}

function showPopUp(text){
  popUp.style.innerText = text;
  popUp.style.display = 'block';
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

function printNumbers(from) {
  updateTimer(from);
  timerId = setInterval(function() {
    if (from == 0) {
      clearInterval(timerId);
      return;
    }
    updateTimer(--from);
  }, 1000);
}

function stopGameTimer(){
  clearInterval(timerId);
  timer.innerHTML = '00:00';
}

function updateTimer(time){
  const minutes = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  timer.innerHTML = `${minutes < 10 ? `0${minutes}` : minutes}:${sec < 10 ? `0${sec}` : sec}`;
}