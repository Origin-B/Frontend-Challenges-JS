const input = document.querySelectorAll('input[type="text"]');

const dayInp = document.querySelector('input[placeholder="DD"]');
const monthInp = document.querySelector('input[placeholder="MM"]');
const yearInp = document.querySelector('input[placeholder="YYYY"]');

const dayWarn = document.querySelector('.day');
const monthWarn = document.querySelector('.month');
const yearWarn = document.querySelector('.year');

const showBtn = document.getElementById('generate');

const showDays = document.getElementById('show-days');
const showMonths = document.getElementById('show-months');
const showYears = document.getElementById('show-years');

const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth() + 1;
const todayDay = today.getDate();

const age = JSON.parse(localStorage.getItem('age'));

function declareError(e) {
  e.classList.add('error'); 
  e.parentElement.classList.add('error');
  document.querySelector(`.${e.getAttribute('name')}`).style.display = 'block'
}

function removeError(e) {
  e.classList.remove('error');
  e.parentElement.classList.remove('error')
  document.querySelector(`.${e.getAttribute('name')}`).style.display = 'none'
}

function checkInputValue(birthD,birthM,birthY){
  let valid = true
  const dayNum = new Date(todayYear, birthM, 0).getDate()
  input.forEach( e => {
    if(e.value === ''){ 
      document.querySelector(`.${e.getAttribute('name')}`).textContent = `This field is required`
      declareError(e);
      valid = false;
    }else if(! /^\d+$/.test(e.value)){
      document.querySelector(`.${e.getAttribute('name')}`).textContent = `It must be a number`
      declareError(e);
      valid = false;
    }else if(/^[0]+$/.test(e.value)){
      document.querySelector(`.${e.getAttribute('name')}`).textContent = `It must be a valid number`
      declareError(e);
      valid = false;
    }else if (e === dayInp && (/^\d{1,2}$/.test(dayInp.value) == false || birthD > dayNum)){
      dayWarn.textContent = `It must be a valid day`
      declareError(e)
      valid = false;
    }else if (e === monthInp && (/^\d{1,2}$/.test(monthInp.value) == false || birthM > 12)){
      monthWarn.textContent = `It must be a valid month`
      declareError(e)
      valid = false;
    }else if (e === yearInp && (/^\d{4}$/.test(yearInp.value) == false || birthY > todayYear)){
      yearWarn.textContent = `It must be a valid year`
      declareError(e)
      valid = false;
    }else{
      removeError(e)
    }
  })
  if ( valid === false){
    input.forEach(e => {e.classList.add('error'); e.parentElement.classList.add('error')})
    return valid
  }else{
    return valid
  }
}

function calcAge(years,months,days) {
  if(days < 0){
  months--;
  days += new Date(todayYear, todayMonth - 1, 0).getDate()
}
if(months < 0){
  years--;
  months += 12;
}
showYears.textContent = `${years}`
showMonths.textContent = `${months}`
showDays.textContent = `${days}`
}
showBtn.addEventListener('click',() => {
  if(/^\d$/.test(dayInp.value))  dayInp.value = `0${dayInp.value}`
  if(/^\d$/.test(monthInp.value))  monthInp.value = `0${monthInp.value}`
  const birthD = +dayInp.value;
  const birthM = +monthInp.value;
  const birthY = +yearInp.value;
  let years  = todayYear  - birthY;
  let months = todayMonth - birthM;
  let days   = todayDay   - birthD;
  if(checkInputValue(birthD,birthM,birthY)){ calcAge(years,months,days) }else return;
  localStorage.setItem('age', JSON.stringify({
    dayInp: dayInp.value,
    monthInp: monthInp.value,
    yearInp: yearInp.value
  }))
})

dayInp.addEventListener('keyup',() => {
  if(dayInp.value.length === 2){
    dayInp.blur();
    monthInp.focus();
  }
})
monthInp.addEventListener('keyup',() =>{
  if(monthInp.value.length === 2){
    monthInp.blur();
    yearInp.focus();
  }
})
yearInp.addEventListener('keyup',() =>{
  if(yearInp.value.length === 4){
    yearInp.blur();
  }
})

if(age !== null){
  dayInp.value = age.dayInp
  monthInp.value = age.monthInp
  yearInp.value = age.yearInp
  
  const birthD = +dayInp.value;
  const birthM = +monthInp.value;
  const birthY = +yearInp.value;
  let years  = todayYear  - birthY;
  let months = todayMonth - birthM;
  let days   = todayDay   - birthD;
  calcAge(years, months, days)
}
