const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

const viewQAButton = document.getElementById('viewQA');
const answersReview = document.createElement('div');
answersReview.id = 'answersReview';

viewQAButton.addEventListener('click', () => {
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers'));

    if (userAnswers && userAnswers.length > 0) {
        userAnswers.forEach((answer, index) => {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${index + 1}. ${answer.question}</strong>`;

            if (Array.isArray(answer.choices)) {
                answer.choices.forEach((ans, i) => {
                    const answerDiv = document.createElement('div');
                    answerDiv.innerText = ans;

                   
                    if (i === answer.selectedAnswer && i === answer.correctAnswer) {
                        answerDiv.classList.add('correct-answer'); 
                    }

           
                    else if (i === answer.correctAnswer) {
                        answerDiv.classList.add('correct-answer'); 
                    }

                    
                    else if (i === answer.selectedAnswer && i !== answer.correctAnswer) {
                        answerDiv.classList.add('incorrect-answer'); 
                    }

                 
                    div.appendChild(answerDiv);
                });
            } else {
                console.error("Choices are missing or not an array:", answer);
            }

            answersReview.appendChild(div);
        });

        document.body.appendChild(answersReview);
    } else {
        alert("No answers to display. Please take the quiz first.");
    }
});
