const bill = document.getElementById("bill");
const peopleNum = document.getElementById("people-num");
const selectTipPre = document.getElementById("select-tip-pre");
const customSelectTip = document.querySelector('input[placeholder="Custom"]');
const resetBtn = document.querySelector('input[type="submit"]');
const tipSpan = document.getElementById("tip");
const totalSpan = document.getElementById("total");
const form = document.querySelector("form");
let tipPre;
let billValue;
let pNum;

selectTipPre.addEventListener("click", (e) => {
  [...selectTipPre.children]
    .filter((e) => e.classList.contains("active-select"))
    .forEach((ele) => ele.classList.remove("active-select"));
  [...selectTipPre.children]
    .filter((e) => !e.classList.contains("bg-b-Green-900"))
    .forEach((ele) => ele.classList.add("bg-b-Green-900"));
  if (e.target.tagName === "SPAN") {
    e.target.classList.remove("bg-b-Green-900");
    e.target.classList.add("active-select");
    tipPre = Number.parseInt(e.target.textContent.trim());
    customSelectTip.value = "";
    calc();
  } else return;
});

function calc() {
  billValue = Number.parseFloat(bill.value.trim());
  pNum = Number.parseInt(peopleNum.value.trim());
  let isValid = check(billValue, tipPre, pNum);

  if (isValid) {
    [...document.querySelectorAll(".warn")].forEach((ele) =>
      ele.classList.remove("warn"),
    );

    resetBtn.classList.remove("bg-b-Green-400/20");
    resetBtn.classList.add("bg-b-Green-400");

    let tip = (billValue * tipPre) / 100;
    let total = billValue / pNum + tip / pNum;

    tipSpan.textContent = `$${(tip / pNum).toFixed(2)}`;
    totalSpan.textContent = `$${total.toFixed(2)}`;
  } else {
    tipSpan.textContent = "$0.00";
    totalSpan.textContent = "$0.00";
    resetBtn.classList.add("bg-b-Green-400/20");
    resetBtn.classList.remove("bg-b-Green-400");
  }
}

function check(billValue, tipPre, pNum) {
  let isValid = true;

  if (isNaN(tipPre) || tipPre === 0) {
    isValid = false;
    let warn = document.getElementById("select-warn");
    warn.textContent = tipPre === 0 ? "Can't be Zero" : "Can't be a String";
    warn.closest("div").classList.add("warn");
  }
  if (isNaN(billValue) || billValue === 0) {
    isValid = false;
    let warn = document.getElementById("bill-warn");
    warn.textContent = billValue === 0 ? "Can't be Zero" : "Can't be a String";
    warn.closest("div").classList.add("warn");
  }
  if (isNaN(pNum) || pNum === 0) {
    isValid = false;
    let warn = document.getElementById("people-num-warn");
    warn.textContent = pNum === 0 ? "Can't be Zero" : "Can't be a String";
    warn.closest("div").classList.add("warn");
  }
  return isValid;
}

form.addEventListener("input", (e) => {
  if (e.target === customSelectTip) {
    [...document.querySelectorAll(".active-select")].forEach((ele) =>
      ele.classList.remove("active-select"),
    );
    tipPre = Number.parseFloat(e.target.value.trim());
  }
  calc();
});

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();

  e.target.classList.add("bg-b-Green-400/20");
  e.target.classList.remove("bg-b-Green-400");

  [...selectTipPre.children]
    .filter((e) => e.classList.contains("active-select"))
    .forEach((ele) => ele.classList.remove("active-select"));
  [...selectTipPre.children]
    .filter((e) => !e.classList.contains("bg-b-Green-900"))
    .forEach((ele) => ele.classList.add("bg-b-Green-900"));

  bill.value = "";
  customSelectTip.value = "";
  peopleNum.value = "";
});
