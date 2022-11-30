const question = [
    {
        question: "Скілки буде 5 + 5?",
        answers: [9, 10, 11, 12],
        correct: 2,
    },
    {
        question: "Після якого числа іде число 100?",
        answers: [99, 100, 110, 120],
        correct: 1,
    },
    {
        question: "Яка кількість пальців на руці людини?",
        answers: ["два", "три", "чотири", "п'ять"],
        correct: 4,
    },
    {
        question: "Яка пора року наступає після весни?",
        answers: ["зима", "весна", "осінь", "літо"],
        correct: 4,
    }
];

let score = 0;
let questionIndex = 0;

const headerContainer = document.querySelector('#header-quiz');
const listContainer = document.querySelector('#quiz-list');
const submitButton = document.querySelector('#submit')

clearPage();
showQuestion();
submitButton.onclick = checkAnswer;

function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}


function showQuestion() {
    const headerTemplate = `<h2 class="question">%title%</h2>`;
    const title = headerTemplate.replace('%title%', question[questionIndex]['question']);
    headerContainer.innerHTML = title;

    let answerNumber = 1;
    for (answerText of question[questionIndex]['answers']) {
        
        const questionTemplate = 
        `<li>
            <label>
                <input type="radio" class="answer" name="answer" value="%number%">
                <span>%answer%</span>
            </label>
        </li>`;
        let answerHTML = questionTemplate.replace('%answer%', answerText);

        answerHTML = answerHTML.replace('%number%', answerNumber);
        

        listContainer.innerHTML += answerHTML;
        answerNumber++;
    }

    

}

function checkAnswer() {
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

    if (checkedRadio) {
        console.log('OK');
    } else {
        return
    }
    
    const userAnswer = parseInt(checkedRadio.value);

    if (userAnswer === question[questionIndex]['correct']) {
        score++;
    }
    
    if (questionIndex === question.length - 1){
        clearPage();
        showResults();
    } else {
            questionIndex++;
            clearPage();
            showQuestion();
    }
    
}

function showResults() {
    

    const resultsTemplate = `
        <h2 class="question">%title%</h2>
        <h3 class="summary">%message%</h3>
        <p class="result">%result%</p>
    `;

    let title, message;

    if (score === question.length) {
        title = 'ВІТАЄМО!!!!';
        message = 'Ти молодець, на всі питання відповів!';
    } else if ((score * 100) / question.length >= 50) {
        title = 'Досить непогано!';
        message = 'Половина правильних відповідей';
    } else {
        title = 'Потрібно працювати';
        message = 'Меньше половини правильних відповідей';
    }

    let result = `${score} з ${question.length}`;

    const finalMassage = resultsTemplate
                                .replace('%title%', title)
                                .replace('%message%', message)
                                .replace('%result%', result)

    headerContainer.innerHTML = finalMassage;

    submitButton.innerText = 'Почати знову?'
    submitButton.onclick = function() {
        history.go();
    }

}