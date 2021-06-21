export default class popup{
  constructor(){
    this.popUp = document.querySelector('.pop-up--hide');
    this.popUpText = document.querySelector('.pop-up__message');
    this.popUpRefresh = document.querySelector('.pop-up__refresh');
    this.popUpRefresh.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListen(onClick){
      this.onClick = onClick;
  }
    
  showwithText(text){
    this.popUpText.innerText = text;
    this.popUp.classList.remove('pop-up--hide');
  }

  hide(){
    this.popUp.classList.add('pop-up--hide');
  }
}