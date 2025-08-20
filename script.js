// Quiz Data
const quizData = [
    { question: "Which of these is a valid C identifier?", options: ["1variable", "variable1", "var-iable", "none"], answer: "variable1" },
    { question: "What is the size of int in C?", options: ["2 bytes", "4 bytes", "Depends on compiler", "8 bytes"], answer: "Depends on compiler" },
    { question: "Which symbol is used to comment a single line in C?", options: ["//", "/*", "#", "<!--"], answer: "//" },
    { question: "Which of the following is used to read a string in C?", options: ["scanf()", "printf()", "getchar()", "putchar()"], answer: "scanf()" },
    { question: "Which function is used to read a character in C?", options: ["scanf()", "getchar()", "gets()", "read()"], answer: "getchar()" },
    { question: "Which of these is used for input in C++?", options: ["cin", "scanf", "input", "read"], answer: "cin" },
    { question: "Which of these is correct to define a class in C++?", options: ["class MyClass {}", "MyClass class {}", "define MyClass {}", "class = MyClass"], answer: "class MyClass {}" },
    { question: "What is the default access specifier for class members in C++?", options: ["private", "public", "protected", "default"], answer: "private" },
    { question: "Which operator is used for scope resolution in C++?", options: ["::", ":", ".", "->"], answer: "::" },
    { question: "Which function is called when an object is destroyed?", options: ["Constructor", "Destructor", "Main", "Delete"], answer: "Destructor" },
    { question: "Which of these is used to define a method in Java?", options: ["def", "void", "function", "method"], answer: "void" },
    { question: "What is the default value of boolean in Java?", options: ["true", "false", "0", "null"], answer: "false" },
    { question: "Which keyword is used to inherit a class in Java?", options: ["extends", "implements", "inherits", "super"], answer: "extends" },
    { question: "Which of these is not a Java primitive type?", options: ["int", "char", "String", "float"], answer: "String" },
    { question: "Which method is the entry point of a Java program?", options: ["main()", "start()", "init()", "run()"], answer: "main()" },
    { question: "Which operator is used for logical AND in C/C++/Java?", options: ["&", "&&", "|", "||"], answer: "&&" },
    { question: "Which of these is used to allocate memory dynamically in C++?", options: ["malloc", "new", "alloc", "calloc"], answer: "new" },
    { question: "What is the size of char in C/C++/Java?", options: ["1 byte", "2 bytes", "4 bytes", "Depends"], answer: "1 byte" },
    { question: "Which keyword is used to define a constant in C/C++?", options: ["const", "final", "constant", "#define"], answer: "const" },
    { question: "Which loop is guaranteed to execute at least once?", options: ["for", "while", "do-while", "if"], answer: "do-while" }
];

// State variables
let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(quizData.length).fill(null);

// DOM Elements
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev'); 
const resultEl = document.getElementById('result');

// Load a question
function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.innerText = q.question;
    optionsEl.innerHTML = '';

    // Display options
    q.options.forEach(option => {
        const li = document.createElement('li');
        li.innerHTML = `<label>
            <input type="radio" name="option" value="${option}" ${userAnswers[currentQuestion] === option ? "checked" : ""}>
            ${option}
        </label>`;
        optionsEl.appendChild(li);
    });
}

// Next button click
nextBtn.addEventListener('click', () => {
    const selected = document.querySelector('input[name="option"]:checked');
    if (!selected) {
        alert("Please select an answer!");
        return;
    }

    // Save user answer
    userAnswers[currentQuestion] = selected.value;

    // Move to next question
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        calculateScore();
        showResult();
    }
});

// Previous button click
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
});

// Calculate score
function calculateScore() {
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizData[index].answer) {
            score++;
        }
    });
}

// Show final result with review
function showResult() {
    questionEl.style.display = "none";
    optionsEl.style.display = "none";
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";

    let resultHTML = `<h3>Your score: ${score} / ${quizData.length}</h3>`;
    resultHTML += `<h4>Review:</h4><ul>`;

    quizData.forEach((q, index) => {
        const userAnswer = userAnswers[index] || "No Answer";
        const color = userAnswer === q.answer ? "green" : "red";
        resultHTML += `<li>${q.question} <br> Your answer: <span style="color:${color}">${userAnswer}</span> | Correct answer: ${q.answer}</li><br>`;
    });

    resultEl.innerHTML = resultHTML;
}

// Initial load
loadQuestion();
