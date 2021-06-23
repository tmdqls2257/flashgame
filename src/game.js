'use strict';

import Field from './field.js';
import * as Sound from './sound.js';

export default class Game{
  constructor(carrotCount, bugCount, duration){
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.duration = duration;

    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.start = document.querySelector('.game__button');
    this.timer = document.querySelector('.game__timer');
    this.score = document.querySelector('.game__score');
  
    this.carrotScore = 0;
    this.started = false; //게임의 상태를 기억하는 변수 설정
    this.timerId = undefined;

    this.start.addEventListener('click', () => {
      if(this.started){
        this.stopGame();
      }else{
        this.startGame();
      }//started가 false이면 true를 입력해주는 기능
    });
  }

  setGameStopListener(onClick){
    this.onClick = onClick;
  }

  onItemClick = (item) => {
    if(!this.started){
      return;
    }
    if (item === 'carrot'){
      this.carrotScore++;
      this.updateScore();
      if(this.score === this.carrotCount){
        this.finishGame(true);
      }
    }else if(item === 'bug'){
      this.finishGame(false);
    }
  }

  startGame(){
    this.started = true;
    this.init();
    this.showTimerAndScore();
    this.showStopBtn();
    Sound.playBackground();
  }
  
  stopGame(){ 
    this.started = false;
    this.stopGameTimer();
    Sound.stopBackground();
    Sound.playAlert();
    this.onClick && this.onClick('cancel');
  }
  
  showTimerAndScore(){
    this.start.style.visibility = 'visible';
    this.timer.style.visibility = 'visible';
    this.score.style.visibility = 'visible';
    this.printNumbers(this.duration);
  }
  
  showStopBtn(){
    const icon = this.start.querySelector('i');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
  }

  init(){
    this.gameField.gameInit();
    this.currentScore(this.carrotCount);
  }
  
  currentScore(num){
    this.score.innerHTML = `${num}`;
  }
  
  finishGame(win){
    this.started = false;
    if(win){
      Sound.playWin();
    }else{
      Sound.playBackground();
      Sound.playAlert();
    }
    this.hideGameHeader();
    this.stopGameTimer();
    Sound.stopBackground();
    this.onClick && this.onClick(win ? "win" : "lose");
  }
  
  updateScore(){
    this.score.innerText = this.carrotCount - this.carrotScore;
  }
  
  printNumbers(from) {
    this.updateTimer(from);
    this.timerId = setInterval(() => {
      if (from == 0) {
        clearInterval(this.timerId);
        this.finishGame(this.carrotCount === this.carrotScore);
        return;
      }
      this.updateTimer(--from);
    }, 1000);
  }

  hideGameHeader(){
    this.carrotScore = 0;
    this.start.style.visibility = 'hidden';
    this.timer.style.visibility = 'hidden';
    this.score.style.visibility = 'hidden';
  }
  
  stopGameTimer(){
    clearInterval(this.timerId);
    this.timer.innerText = '00:00';
  }
  
  updateTimer(time){
    const minutes = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    this.timer.innerText = `${minutes < 10 ? `0${minutes}` : minutes}:${sec < 10 ? `0${sec}` : sec}`;
  }
}