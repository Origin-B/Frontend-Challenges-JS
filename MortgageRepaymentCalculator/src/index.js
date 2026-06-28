// £
const form = document.querySelector("form");
const clearAll = document.getElementById("clear-all");
const mortgageAmount = document.getElementById("mortgage-amount");
const mortgageTerm = document.getElementById("mortgage-term");
const interestRate = document.getElementById("interest-rate");
const showResults = document.getElementById("show-results");
const calcBtn = document.getElementById("calc-repay");
let monthlyRepay = document.getElementById("monthly-repay");
let totalRepay = document.getElementById("total-repay");

let mortgageObj = {
  amount: "",
  term: "",
  rate: "",
  type: "",
  calc: function () {
    let p = this.amount;
    let n = this.term * 12;
    let r = this.rate / 1200;
    let mRepay, tRepay;

    if (this.type === "interest-only") {
      mRepay = p * r;
      tRepay = mRepay * n;

      monthlyRepay.textContent = `£${mRepay.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
      totalRepay.textContent = `£${tRepay.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    } else if (this.type === "repayment") {
      mRepay = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      tRepay = mRepay * n;

      monthlyRepay.textContent = `£${mRepay.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
      totalRepay.textContent = `£${tRepay.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    } else return;
  },
};

function check() {
  let isValid = true;

  for (const k in mortgageObj) {
    if (k === "calc") continue;

    let v = mortgageObj[k];

    let warn = document.getElementById(`${k}-warn`);
    let warnParent = warn.closest(".group");
    let warnText;

    if (k === "type") {
      warnText = v === "" ? "This felid is required" : "";

      if (warnText === "") {
        warnParent.classList.remove("warn");
      } else {
        isValid = false;
        warn.textContent = warnText;
        warnParent.classList.add("warn");
      }
      continue;
    }

    warnText =
      v === ""
        ? "This felid is required"
        : v === "0"
          ? "It must be a valid number"
          : isNaN(v)
            ? "It must be a number"
            : "";

    if (warnText === "") {
      warnParent.classList.remove("warn");

      if (k === "amount") mortgageObj.amount = Number.parseFloat(v);
      if (k === "term") mortgageObj.term = Number.parseInt(v);
      if (k === "rate") mortgageObj.rate = Number.parseFloat(v);
    } else {
      mortgageObj[k] = "";
      isValid = false;
      warn.textContent = warnText;
      warnParent.classList.add("warn");
    }
  }
  return isValid;
}
form.addEventListener("change", (e) => {
  let target = e.target;
  let pureValue = target.value.replace(/,/g, "");
  if (target.name === "mortgage-type") mortgageObj.type = pureValue;
  if (target === mortgageTerm) mortgageObj.term = pureValue;
  if (target === interestRate) mortgageObj.rate = pureValue;
  if (target === mortgageAmount) mortgageObj.amount = pureValue;
});

clearAll.addEventListener("click", (_) => location.reload());

calcBtn.addEventListener("click", (_) => {
  let isValid = check();
  if (isValid) {
    mortgageObj.calc();
    mortgageAmount.value = Number.parseFloat(mortgageObj.amount).toLocaleString(
      "en-GB",
    );
    showResults.classList.add("active");
  } else {
    showResults.classList.remove("active");
  }
});
