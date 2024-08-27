// DOM elements
const answers = document.querySelectorAll(".answer");
const questionElement = document.querySelector(".question");
const next = document.querySelector(".next");
const PlayAgain = document.querySelector(".PlayAgain");
// implimentation variables
let rightAnswerElement;
let rightAnswerGlobal;
let questionCount = 0;
let rightAnswerCount = 0;
// the question objects
const questionOne = {
  question: "1.what is the largest animal on earth",
  rightAnswer: "white whale",
  answers: ["Shark", "white whale", "Giraf", "Elephant"],
};
const questionTwo = {
  question: "2.what's the capital of morocco",
  rightAnswer: "Rabat",
  answers: ["Fes", "marrakech", "Rabat", "Agadir"],
};
const questionThree = {
  question: "3.what's the most selling manga in japan",
  rightAnswer: "One piece",
  answers: ["Blue Lock", "Demeon Slayer", "Attack on Titan", "One piece"],
};
const questionfour = {
  question: "4.where is the tallest building in the world",
  rightAnswer: "dubai",
  answers: ["dubai", "japan", "greenland", "USA"],
};
// questions array
const questionsArray = [questionTwo, questionThree, questionfour];
//functions
function insertAnswers(valuesArray) {
  const { question, answers: answersArray, rightAnswer } = valuesArray;
  questionElement.innerText = question;
  for (i = 0; i < answers.length; i++) {
    answers[i].innerText = answersArray[i];
    if (answersArray[i] === rightAnswer) {
      rightAnswerElement = answers[i];
      console.log(rightAnswerElement);
    }
  }
}
function reset() {
  questionElement.innerText = "";
  rightAnswerElement = undefined;
  rightAnswerGlobal = undefined;
  answers.forEach(function (answer) {
    answer.innerText = "";
    answer.classList.remove("wrongAnswer");
    answer.classList.remove("rightAnswer");
    answer.removeEventListener("click", handle);
    answer.disabled = false;
    next.style.display = "none";
  });
}
function endGame() {
  questionElement.innerText = `you scored ${rightAnswerCount}/4 play again?`;
  answers.forEach((answer) => {
    answer.remove();
  });
  rightAnswerCount = 0;
  PlayAgain.style.display = "block";
}
function handle(e) {
  if (e.target.innerText === rightAnswerGlobal) {
    e.target.classList.add("rightAnswer");
    rightAnswerCount++;
  } else {
    e.target.classList.add("wrongAnswer");
    rightAnswerElement.classList.add("rightAnswer");
  }
  answers.forEach((answer) => (answer.disabled = true));
  next.style.display = "block";
}
function check(valuesArray) {
  const { rightAnswer } = valuesArray;
  rightAnswerGlobal = rightAnswer;
  for (i = 0; i < answers.length; i++) {
    answers[i].addEventListener("click", handle);
  }
}
//implimentation
insertAnswers(questionOne);
check(questionOne);
next.addEventListener("click", function () {
  reset();
  if (questionCount === questionsArray.length) {
    endGame();
  }
  insertAnswers(questionsArray[questionCount]);
  check(questionsArray[questionCount]);
  questionCount++;
});
