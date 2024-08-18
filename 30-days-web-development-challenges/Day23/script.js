document.addEventListener('DOMContentLoaded', () => {
    const infoBox = document.querySelector('.info_box');
    const quizBox = document.querySelector('.quiz_box');
    const startQuizButton = document.getElementById('startQuiz');
    const nextButton = document.querySelector('.next_btn');
    const prevButton = document.querySelector('.prev_btn');
    const submitButton = document.querySelector('.submit_btn');
    const totalQue = document.querySelector('.total_que');
    const currentQuestionText = document.getElementById('currentQuestion');
    const totalQuestionsText = document.getElementById('totalQuestions');
    const scoreDisplay = document.getElementById('score');

    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let totalTime = 60;
    let timer;
    let isQuizActive = false;
    let userSelections = [];

    const questions = [
        {
            question: 'What does HTML stand for?',
            options: ['HyperText Markup Language', 'HyperText Transfer Protocol', 'HyperText Management Language', 'HyperTransfer Markup Language'],
            answer: 'HyperText Markup Language'
        },
        {
            question: 'Which HTML element is used to define the title of a document?',
            options: ['<head>', '<title>', '<meta>', '<body>'],
            answer: '<title>'
        },
        {
            question: 'Which of the following is a CSS pseudo-class?',
            options: [':hover', '::before', ':root', '::after'],
            answer: ':hover'
        },
        {
            question: 'What does CSS stand for?',
            options: ['Cascading Style Sheets', 'Creative Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
            answer: 'Cascading Style Sheets'
        },
        {
            question: 'Which property is used to change the background color in CSS?',
            options: ['background-color', 'bgcolor', 'color', 'background'],
            answer: 'background-color'
        }
    ];

    totalQuestionsText.textContent = questions.length;

    function showQuestion() {
        const queText = document.querySelector('.que_text');
        const optionList = document.querySelector('.option_list');

        const question = questions[currentQuestionIndex];
        queText.innerHTML = question.question;
        optionList.innerHTML = '';

        question.options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(optionElement));
            optionList.appendChild(optionElement);
        });

        if (!isQuizActive) {
            highlightAnswers();
        } else {
            const options = document.querySelectorAll('.option');
            options.forEach(option => {
                option.classList.remove('selected', 'incorrect-selected');
            });

            const selectedOption = Array.from(optionList.children).find(
                option => option.textContent === userSelections[currentQuestionIndex]
            );
            if (selectedOption) {
                selectedOption.classList.add('selected');
            }
        }

        totalQue.innerHTML = `Question ${currentQuestionIndex + 1} / ${questions.length}`;
        prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
        submitButton.style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
        nextButton.style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';

        currentQuestionText.textContent = currentQuestionIndex + 1;
    }

    function selectOption(selectedOption) {
        if (!isQuizActive) return;

        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.classList.remove('selected');
        });

        selectedOption.classList.add('selected');

        userSelections[currentQuestionIndex] = selectedOption.textContent;
    }

    function highlightAnswers() {
        correctAnswers = 0;

        questions.forEach((question, index) => {
            const selectedOption = userSelections[index];
            const options = document.querySelectorAll('.option_list .option');

            options.forEach(option => {
                if (option.textContent === question.answer) {
                    option.classList.add('correct');
                }

                if (option.textContent === selectedOption && selectedOption !== question.answer) {
                    option.classList.add('incorrect-selected');
                }
            });

            if (userSelections[index] === question.answer) {
                correctAnswers++;
            }
        });

        scoreDisplay.textContent = `${correctAnswers}/${questions.length}`;
    }

    function endQuiz() {
        isQuizActive = false;
        clearInterval(timer);
        highlightAnswers();
        showQuestion();
    }

    function startQuiz() {
        infoBox.classList.remove('activeInfo');
        quizBox.classList.add('activeQuiz');
        isQuizActive = true;
        startTimer();
        showQuestion();
    }

    function startTimer() {
        timer = setInterval(() => {
            totalTime--;
            updateTimerDisplay();

            if (totalTime <= 0) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;
        document.querySelector('.timer_sec').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function handleQuestionNavigation(direction) {
        if (direction === 'next') {
            currentQuestionIndex++;
        } else if (direction === 'prev') {
            currentQuestionIndex--;
        }

        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
            showQuestion();
        }
    }

    startQuizButton.addEventListener('click', startQuiz);

    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            handleQuestionNavigation('next');
        } else {
            endQuiz();
        }
    });

    prevButton.addEventListener('click', () => {
        handleQuestionNavigation('prev');
    });

    submitButton.addEventListener('click', endQuiz);
});
