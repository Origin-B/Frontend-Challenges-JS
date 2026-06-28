
const theme = document.getElementById('theme');
const themeNumList = document.getElementById('theme-num-list');
const screen = document.getElementById('screen');
const keypad = document.getElementById('keypad');
let themeNum = 1;

let calcObj = {
  liveScreen: '',
  num1: '',
  operator: '',
  num2: '',
  result: function () {
    let num1 = +this.num1 || 0;
    let num2 = +this.num2 || 0;
    
    if (this.operator === '+') this.num1 = num1 + num2;
    else if (this.operator === '-') this.num1 = num1 - num2;
    else if (this.operator === 'x') this.num1 = num1 * num2;
    else if (this.operator === '/') this.num1 = num1 / num2;
    else this.num1 = this.num1;

    this.num1 = this.num1.toString()
    this.num2 = '';
    this.operator = '';
    this.liveScreen = `${this.num1}`;
    return this.num1;
  }
}

themeNumList.addEventListener('click', e =>{
  if(e.target.tagName === 'SPAN') {
    themeNum = e.target.closest('span').textContent;

    theme.style.transform = 
    (themeNum === '1') ? 'translateX(0px)' 
      : (themeNum === '2') ? 'translateX(22px)' 
        : 'translateX(44px)';

    document.documentElement.classList.remove('theme-1' ,'theme-2' ,'theme-3');

    document.documentElement.classList.add(`theme-${themeNum}`);
  }
})

function formatDisplay(screenText) {
  if (!screenText) return '';
  
  return screenText.split(' ').map(part => {

    if (/^[+\-/x]$/.test(part)) return part;
    
    let num = +part;
    if (!isNaN(num)) {

      if (part.endsWith('.')) {
        return num.toLocaleString() + '.';
      }
      return num.toLocaleString();
    }
    return part;

  }).join(' ');
}

function check(btnValue) {
  
  if (btnValue === '.') {

    if (calcObj.operator === '') {

      if (calcObj.num1 === '') {
        calcObj.num1 = '0.';
        calcObj.liveScreen += '0.';

      } else if (!calcObj.num1.includes('.')) {
        calcObj.num1 += '.';
        calcObj.liveScreen += '.';

      } else return;

    } else {

      if (calcObj.num2 === '') {
        calcObj.num2 = '0.';
        calcObj.liveScreen += '0.';

      } else if (!calcObj.num2.includes('.')) {
        calcObj.num2 += '.';
        calcObj.liveScreen += '.';

      } else return;

    }


  } else if (btnValue === 'del') {

    if (calcObj.liveScreen.endsWith(' ')) {
        
        calcObj.liveScreen = calcObj.liveScreen.slice(0, -3);
        calcObj.operator = '';

    } else {

        calcObj.liveScreen = calcObj.liveScreen.slice(0, -1);
        (calcObj.operator === '') ? calcObj.num1 = calcObj.num1.slice(0, -1) : calcObj.num2 = calcObj.num2.slice(0, -1);

    }

  } else if (/^\d$/.test(btnValue)) {
  
    calcObj.liveScreen += btnValue;
    (calcObj.operator === '') ? calcObj.num1 += btnValue : calcObj.num2 += btnValue
  
  } else if (/^[+\-/x]$/.test(btnValue)) {
  
    if (calcObj.operator !== '') calcObj.result();
    calcObj.liveScreen +=(/\d$/.test(calcObj.liveScreen)) ? ` ${btnValue} ` : '' ;
    calcObj.operator = btnValue

  } else if (btnValue === 'reset') {

    calcObj.liveScreen = '';
    calcObj.operator = '';
    calcObj.num1 = '';
    calcObj.num2 = '';

  } else if (btnValue === '=') {

    screen.textContent = calcObj.result();

  } else return;

}

keypad.addEventListener('click',e => {
  
  if (e.target.tagName === 'BUTTON') {

    let btnValue = e.target.textContent;
    check(btnValue);
    
    screen.textContent = formatDisplay(calcObj.liveScreen);

  }
})
