'use strict'

const StartBtn = document.querySelector('.Timer__start');
const stopBtn = document.querySelector('Timer__stop');
const itemContainer = document.querySelector('.field');

let id =0;

function createItem(){
  for (let i=0; i<6; i++) {
    itemContainer.innerHTML +=`<div class="space">
    <img class="space__bug" src="img/bug.png" alt="space__bug" data-id=${id}>
  </div>
  <div class="space">
    <img class="space__carrot" src="img/carrot.png" alt="space__carrot" data-id=${id}>
  </div>`;
    id++;
  }
}

function randPositon(){
  createItem();
  const Carrots = itemContainer.querySelectorAll('.space__carrot');
  console.log(Carrots);
  const Bugs = itemContainer.querySelectorAll('.space__bug');

  const width = itemContainer.clientWidth;
  const height = itemContainer.clientHeight;
  Carrots.forEach((element) =>{
    const randPositonx = Math.floor(Math.random() * width);
    const randPositony = Math.floor(Math.random() * height);
    element.style.transform = `translate(${randPositonx-10}px, ${randPositony-10}px)`;
  });
  Bugs.forEach((element) =>{
    const randPositonx = Math.floor(Math.random() * width);
    const randPositony = Math.floor(Math.random() * height);
    element.style.transform = `translate(${randPositonx-10}px, ${randPositony-10}px)`;
  });
}

function lastTime(){
  let timeleft = 9;
  const downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.querySelector('.Timer__time').innerHTML = "Finished";
  } else {
    document.querySelector('.Timer__time').innerHTML = `${timeleft}:00`;
  }
  timeleft -= 1;
}, 1000);
}


StartBtn.addEventListener('click', ()=>{
  lastTime();
  randPositon();
});

stopBtn.addEventListener('click', ()=>{

});
