'use strict';

import popup from './popup.js';
import Game from './game.js';


const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_SEC = 5;

const gameFunction = new Game(CARROT_COUNT, BUG_COUNT, GAME_SEC);
gameFunction.setGameStopListener((reason) =>{
  let message;
  switch (reason){
    case 'cancel':
      message = 'Replay?';
      break;
    case 'win':
      message = 'You Win';
    break;
    case 'lose':
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
