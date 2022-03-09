"use strict";

const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const isTask = document.querySelector(".isTask");
const bAdd = document.querySelector(".bAdd");
const taskElement = document.querySelector(".tasks");
const form = document.querySelector(".js-form");
const taskName = document.querySelector(".taskName");

const handleForm = (ev) => {
  ev.preventDefault();
  if (isTask.value !== "") {
    createTask(isTask.value);
    isTask.value = "";
    renderTask();
  }
};

const createTask = (value) => {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: value,
    completed: false,
  };
  tasks.unshift(newTask);
};

const renderTask = () => {
  const html = tasks.map(task => {
    return `
    <section class="task">
    <div class="completed">${
      task.completed
        ? `<span class="done">Done</span>`
        : `<button class="start-button" data-id="${task.id}">start</button>`
    }</div>
    <div class="title">${task.title}</div>
    </section>`
  });
  taskElement.innerHTML = html.join("");
  handlebtn();
};

const handlebtn = () => {
  const startButtons = document.querySelectorAll(".start-button");

  startButtons.forEach((startButton) => {
    startButton.addEventListener("click", (ev) => {
      if (!timer) {
        const id = ev.target.dataset.id;
        startButtonHandler(id);
        startButton.textContent = "In progress...";
      }
    });
  });
};

const startButtonHandler = (id) => {
  console.log("comenzar el tiempo");
  console.log(tasks);
  time = 25 * 60;
  current = id;
  const taskIndex = tasks.findIndex(task => 
    task.id == id);
  console.log(taskIndex);
  taskName.textContent = tasks[taskIndex].title;
  timer = setInterval(() => {
    timerHandler(id);
  }, 1000);
};

const timerHandler = (id) => {
  time--;
  renderTime();
  if (time === 0) {
    clearInterval(timer);
    markCompleted(id);
    renderTask();
    startBreak();
  };
};

const markCompleted = (id) => {
  const taskIndex = tasks.findIndex((task) => 
    task.id == id);
  tasks[taskIndex].completed = true;
};

const renderTime = () => {
  const timeDiv = document.querySelector(".time .value");
  const minutes = parseInt(time / 60);
  const second = parseInt(time % 60);

  timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    second < 10 ? "0" : ""
  }${second}`;
};

const startBreak = () => {
  time = 1 * 60;
  taskName.textContent = "Break";
  timerBreak = setInterval(() => {
    timerBreakHandler();
  }, 1000);
};

const timerBreakHandler = () => {
  time--;
  renderTime();
  if (time === 0) {
    clearInterval(timerBreak);
    current = null;
    taskName.textContent = "";
    renderTime();
  }
};

form.addEventListener("submit", handleForm);

renderTime();
renderTask();
