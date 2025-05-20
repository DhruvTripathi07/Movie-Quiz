const questions = [
    {
        question : "In 'The Matrix', what colour pill does Neo take?",
        answers: [
            {text: "Yellow", correct : false},
            {text: "Blue", correct : false},
            {text: "Green", correct : false},
            {text: "Red", correct : true},
        ]
    },
    {
        question : "The head of what kind of animal is front-and-center in an infamous scene from 'The Godfather'?",
        answers: [
            {text: "Horse", correct : true},
            {text: "Stag", correct : false},
            {text: "Tiger", correct : false},
            {text: "Lion", correct : false},
        ]
    },
    {
        question : "How does Emperor Akbar justify his opposition to Salim and Anarkali's relationship in the film 'Mughal-e-Azam'?",
        answers: [
            {text: "Religious differences", correct : false},
            {text: "Political instability and duty to the empire", correct : true},
            {text: "He personally dislikes Anarkali", correct : false},
            {text: "She was previously engaged", correct : false},
        ]
    },
    {
        question : "What tragic event prompts Thakur Baldev Singh to seek vengeance against Gabbar Singh in 'Sholay'?",
        answers: [
            {text: "Gabbar loots his village", correct : false},
            {text: "Gabbar kills his wife", correct : false},
            {text: "Gabbar murders his entire family and cuts off Thakur's arms", correct : true},
            {text: "Gabbar kills his police squad", correct : false},
        ]
    },
    {
        question : "Which movie has the famous 'You talkin' to me?' scene?",
        answers: [
            {text: "'The Taxi Driver'", correct : true},
            {text: "'Scarface'", correct : false},
            {text: "'Raging Bull'", correct : false},
            {text: "'The Godfather'", correct : false},
        ]
    },
        {
        question : "In Guide (1965), what causes Raju (Dev Anand) to become a spiritual figure by the end of the film?",
        answers: [
            {text: "He performs a miracle", correct : false},
            {text: "He predicts a flood accurately", correct : false},
            {text: "He is mistaken for a reincarnated saint", correct : false},
            {text: "He saves the village from a drought by fasting", correct : true},
        ]
    },
    {
        question : "In The 'Shawshank Redemption', how does Andy Dufresne flee prison?",
        answers: [
            {text: "He bribes the warden", correct : false},
            {text: "He hides in a laundry cart", correct : false},
            {text: "He crawls through a sewage pipe", correct : true},
            {text: "He switches identities with another inmate", correct : false},
        ]
    },
    {
        question : "In 'Inception', what is the main goal of Dom Cobb's team?",
        answers: [
            {text: "To steal corporate secrets", correct : false},
            {text: "To plant an idea in someone's mind", correct : true},
            {text: "To rescue a kidnapped executive", correct : false},
            {text: "To wake up from a shared dream", correct : false},
        ]
    },
        {
        question : "What is Anand's terminal illness in the 1971 film 'Anand'?",
        answers: [
            {text: "Lukemia", correct : false},
            {text: "Lymphosarcoma of the intestine", correct : true},
            {text: "Tuberculosis", correct : false},
            {text: "Brain Tumor", correct : false},
        ]
    },
            {
        question : "Which movie features the quote, “Here's looking at you, kid”?",
        answers: [
            {text: "'Gone with the wind'", correct : false},
            {text: "'Citizen Kane'", correct : false},
            {text: "'The Godfather'", correct : false},
            {text: "'Casablanca'", correct : true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question; 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! Mind going at it again?`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();