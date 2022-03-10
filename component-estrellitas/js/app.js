"use strict";

const raitingContainer = document.querySelector(".rating");
let currentValue = 0;
const limit = 5;

const html = Array.from(Array(limit)).map((item, i) => {
  return `<div class="item item-${i}" data-pos="${i}"></div>`;
});

raitingContainer.innerHTML = html.join("");

const itemElement = document.querySelectorAll(".item");

const handleRating = (ev) => {
  const pr = ev.currentTarget.dataset.pos;
  if(currentValue === parseInt(pr) + 1){
    return;
  }
  itemElement.forEach(it => {
    if (it.classList.contains("item-full")) {
      it.classList.remove("item-full");
    }
  })
  for (let i = 0; i <= pr; i++) {
    const square = document.querySelector(`.item-${i}`);
    if (!square.classList.contains("item-full")) {
      square.classList.add("item-full")
    }
  }
  currentValue = parseInt(pr) + 1;
};

itemElement.forEach((item) => {
  item.addEventListener("mouseover", handleRating);
});