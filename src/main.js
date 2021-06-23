'use strict';

import popup from './popup.js';
import Field from './field.js';
import * as Sound from './sound.js';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_SEC = 5;

const gameFinishBanner = new popup();
gameFinishBanner.setClickListen(() => {
  startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item){
  if(!started){
    return;
  }
  if (item === 'carrot'){
    carrotScore++;
    updateScore();
    if(score === CARROT_COUNT){
      finishGame(true);x
    }
  }else if(item === 'bug'){
    finishGame(false);
  }
}

const start = document.querySelector('.game__button');
const timer = document.querySelector('.game__timer');
const score = document.querySelector('.game__score');

const icon = start.querySelector('.fa-play');
let carrotScore = 0;
let started = false; //게임의 상태를 기억하는 변수 설정
let timerId = undefined;

start.addEventListener('click', () => {
  if(started){
    stopGame();
  }else{
    startGame();
  }//started가 false이면 true를 입력해주는 기능
});

function startGame(){
  started = true;
  init();
  showTimerAndScore();
  showStopBtn();
  Sound.playBackground();
}

function stopGame(){ 
  started = false;
  stopGameTimer();
  gameFinishBanner.hide();
  Sound.playAlert();
  gameFinishBanner.showwithText('Replay?');
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

function init(){
  gameField.gameInit();
  currentScore(CARROT_COUNT);
}

function currentScore(num){
  score.innerHTML = `${num}`;
}

function finishGame(win){
  started = false;
  if(win){
    Sound.playWin();
  }else{
    Sound.playBackground();
  }
  gameFinishBanner.hide();
  stopGameTimer();
  Sound.stopBackground();
  gameFinishBanner.showwithText(win? "You Win" : "You Lost");
}

function updateScore(){
  score.innerText = CARROT_COUNT - carrotScore;
}

function printNumbers(from) {
  updateTimer(from);
  timerId = setInterval(function() {
    if (from == 0) {
      clearInterval(timerId);
      finishGame(CARROT_COUNT === carrotScore);
      return;
    }
    updateTimer(--from);
  }, 1000);
}

function stopGameTimer(){
  clearInterval(timerId);
  timer.innerText = '00:00';
}

function updateTimer(time){
  const minutes = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  timer.innerText = `${minutes < 10 ? `0${minutes}` : minutes}:${sec < 10 ? `0${sec}` : sec}`;
}