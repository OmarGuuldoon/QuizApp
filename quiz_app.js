const question = document.getElementById("questions-text");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("progressText");
// const scoreText = document.getElementById("scoreText");
const progressBarFull = document.getElementById("progressBarFull");
const questionNumber = document.getElementById("questionNumber");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timer;
let timeLeft = 15;
let maxTime = 15;
let userAnswers = []; 

let questions = [
    {
        question : "What is the correct file extension for Python files?",
        choice1 : ".py",
        choice2 :  ".js",
        choice3 : ".java",
        choice4 : ".html",
        answer : 1
    },
    {
        question :"Which of the following is used to declare a variable in JavaScript?",
        choice1 : "var",
        choice2 : "let",
        choice3 : "const",
        choice4 : "All of the above",
        answer : 4
    },
    {
        question : "What does HTML stand for?",
        choice1 :  "HighText Markup Language",
        choice2 :  "HyperText Markdown Language",
        choice3 :  "HyperText Markup Language",
        choice4 :  "HyperTool Multi Language",
        answer : 3
    },
    {
        question : "Which of the following is a loop structure in programming?",
        choice1 :  "if",
        choice2 :  "for",
        choice3 :  "switch",
        choice4 :  "try",
        answer : 2
    },
    {
        question : "What is the result of 5 + 5 in JavaScript?",
        choice1 :  "NaN",
        choice2 :  "55",
        choice3 :  "Error",
        choice4 :  "10",
        answer : 4
    },
    {
        question : "In Python, how do you create a list?",
        choice1 :  "[]",
        choice2 :  "{}",
        choice3 :  "()",
        choice4 :  "<>",
        answer : 1
    },
    {
        question : "What does SQL stand for?",
        choice1 :  "Structured Query Language",
        choice2 :  "Sequential Query Language",
        choice3 :  "Standard Query Language",
        choice4 :  "Server Query Language",
        answer : 1
    },
    {
        question : "Which of the following is a frontend web development language?",
        choice1 :  "Python",
        choice2 :  "Node.js",
        choice3 :  "HTML",
        choice4 :  "Java",
        answer : 3
    },
    {
        question : "In CSS, how do you select an element with the ID header?",
        choice1 :  "#header",
        choice2 :  ".header",
        choice3 :  "header",
        choice4 :  "*header",
        answer : 1
    },
    {
        question :  "Which of the following is a version control system?",
        choice1 :   "SSL",
        choice2 :   "Git",
        choice3 :   "FTP",
        choice4 :   "NPM",
        answer : 2
    }
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

function startTimer() {
    timeLeft = maxTime;
    updateCircle(timeLeft, maxTime);
    document.getElementById('timeText').innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timeText').innerText = timeLeft;
        updateCircle(timeLeft, maxTime);

        if (timeLeft === 0) {
            clearInterval(timer);
            getNewQuestion();
        }
    }, 1000);
}

function updateCircle(timeLeft, maxTime) {
    const percent = (timeLeft / maxTime) * 100;
    const dashArray = `${percent}, 100`;
    document.getElementById('circle').style.strokeDasharray = dashArray;
}

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    userAnswers = []; 
    localStorage.removeItem('userAnswers'); 
    getNewQuestion();
    startTimer();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        clearInterval(timer);
        localStorage.setItem('mostRecentScore', score);
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
        return window.location.assign('/end.html');
    }

    questionCounter++;
    questionCounterText.innerHTML = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    questionNumber.innerHTML = `${(questionCounter / MAX_QUESTIONS) * 10}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

    clearInterval(timer); 
    startTimer(); 
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = parseInt(selectedChoice.dataset["number"]); 

        
        userAnswers.push({
            questionIndex: questionCounter - 1,
            question: currentQuestion.question,

            choices: [
                currentQuestion.choice1,
                currentQuestion.choice2,
                currentQuestion.choice3,
                currentQuestion.choice4
            ], 
            selectedAnswer: selectedAnswer - 1,
            correctAnswer: currentQuestion.answer - 1,
        });
    
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if(classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
         
        
        
        getNewQuestion();
    });
    
});
incrementScore = num => {
    score += num;
    // scoreText.innerText = score;
}


startGame();
