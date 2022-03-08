"use strict";

const inputDate = document.querySelector("#inputDate");
const inputCVV = document.querySelector("#inputCVV");
const inputCard = document.querySelector("#inputCard");

const maskNumber = "####-####-####-####";
const maskDate = "##/##";
const maskCVV = "###";

let current = "";
let cardNumber = [];
let dateNumber = [];
let cvvNumber = [];

const handleInputValue = (e) => {
  e.preventDefault();
  console.log(e.key);
  if (e.key === "Tab") {
    return;
  }
  handleInput(maskNumber, e.key, cardNumber);
  inputCard.value = cardNumber.join("");
};

const handleSecondInput = (e) => {
  e.preventDefault();
  if (e.key === "Tab") {
    return;
  }
  handleInput(maskDate, e.key, dateNumber);
  inputDate.value = dateNumber.join("");
};

const handleThirdInput = (e) => {
  e.preventDefault();
  if (e.key === "Tab") {
    return;
  }
  handleInput(maskCVV, e.key, cvvNumber);
  inputCVV.value = cvvNumber.join("");
};

const handleInput = (mask, key, arr) => {
  let numbers = [];
  for (let i = 0; i < 10; i++) {
    numbers.push(`${i}`);
  }
  if (key === "Backspace" && arr.length > 0) {
    arr.pop();
    return;
  }
  if (numbers.includes(key) && arr.length + 1 <= mask.length) {
    if (mask[arr.length] === "-" || mask[arr.length] === "/") {
      arr.push(mask[arr.length], key);
    } else {
      arr.push(key);
    }
  }
};

inputCard.addEventListener("keydown", handleInputValue);
inputDate.addEventListener("keydown", handleSecondInput);
inputCVV.addEventListener("keydown", handleThirdInput);
