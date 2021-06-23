'use strict';

const carrotSound = new Audio('sound/carrot_pull.mp3');

export default class Field{
  constructor(carrotCount, bugCount){
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector('.game__field');
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  setClickListener(onItemClick){
    this.onItemClick = onItemClick;
  }

  addItem(className, imgPath, count){
    for(let i = 0; i < count; i++){
      const items = document.createElement('img');
      items.setAttribute('class', className);
      items.setAttribute('src', imgPath);
      this.field.appendChild(items);
      const x = randomNumber(this.fieldRect.width - 80);
      const y = randomNumber(this.fieldRect.height - 80);
      items.style.position = 'absolute';
      items.style.left = `${x}px`;
      items.style.top = `${y}px`;
    }
  }

  gameInit(){
    this.field.innerHTML = '';
    this.addItem('carrot', 'img/carrot.png', this.carrotCount);
    this.addItem('bug', 'img/bug.png', this.bugCount);
  }

  onClick = (event) =>{
    const target = event.target;
    if (target.matches('.carrot')){
      playSound(carrotSound);
      target.remove();
      this.onItemClick && this.onItemClick('carrot');
    }else if(target.matches('.bug')){
      this.onItemClick && this.onItemClick('bug');
    }
  }
}

function playSound(sound){
  sound.play();
}

function randomNumber(max){
  return Math.floor(Math.random() * max);
}