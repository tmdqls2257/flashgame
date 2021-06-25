'use strict';

import popup from './popup.js';
import {GameBuilder, Reason } from './game.js';

const gameFunction = new GameBuilder()
.carrotCount(3)
.bugCount(3)
.gameDuration(5)
.bulid();

gameFunction.setGameStopListener((reason) =>{
  let message;
  switch (reason){
    case Reason.cancel:
      message = 'Replay?';
      break;
    case Reason.win:
      message = 'You Win';
    break;
    case Reason.lose:
      message = 'You lose';
      break;
    default:
      throw new Error('not valid reaseon');
  }
  gameFinishBanner.showwithText(message);
});

const gameFinishBanner = new popup();
gameFinishBanner.setClickListen(() => {
  gameFunction.startGame();
});
