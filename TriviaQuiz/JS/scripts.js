const quizForm = document.getElementById('quizForm');
const questionContainer = document.getElementById('questionContainer');
let questionNumber = 1;
const addQuestion = () => {
    const newQuestion = document.createElement('div');
    newQuestion.id = `question${++questionNumber}`;
    newQuestion.innerHTML = `
        <hr>
        <label for="${questionNumber}question">Pregunta:</label><br>
        <textarea id="${questionNumber}question"></textarea><br>
        <input type="checkbox" id="${questionNumber}isImage">
        <label for="${questionNumber}isImage">Es el link de una imagen</label><br><br>
        <label for="${questionNumber}option1">Opción 1:</label>
        <input type="radio" name="correctOption${questionNumber}" value="0">
        <input type="text" id="${questionNumber}option1"><br>
        <label for="${questionNumber}option2">Opción 2:</label>
        <input type="radio" name="correctOption${questionNumber}" value="1">
        <input type="text" id="${questionNumber}option2"><br>
        <label for="${questionNumber}option3">Opción 3:</label>
        <input type="radio" name="correctOption${questionNumber}" value="2">
        <input type="text" id="${questionNumber}option3"><br>
        <label for="${questionNumber}option4">Opción 4:</label>
        <input type="radio" name="correctOption${questionNumber}" value="3">
        <input type="text" id="${questionNumber}option4"><br>
    `;
    questionContainer.appendChild(newQuestion);
}

const removeQuestion = () => {
    if (questionNumber == 1) return;
    const lastQuestion = document.getElementById(`question${questionNumber}`);
    questionContainer.removeChild(lastQuestion);
    questionNumber--;
}

const submitQuiz = (e) => {
    e.preventDefault();
    const quizName = document.getElementById('quizName').value;
    if (quizName == "") return alert("Debe completar todos los campos para continuar.");
    const quizData = [];
    for (let i = 1; i <= questionNumber; i++) {
        const question = document.getElementById(`${i}question`).value;
        const isImage = document.getElementById(`${i}isImage`).checked;
        const option1 = document.getElementById(`${i}option1`).value;
        const option2 = document.getElementById(`${i}option2`).value;
        const option3 = document.getElementById(`${i}option3`).value;
        const option4 = document.getElementById(`${i}option4`).value;
        const options = [option1, option2, option3, option4];
        let correctOption = document.querySelector(`input[name="correctOption${i}"]:checked`)
        if (!correctOption) return alert("Debe seleccionar una respuesta correcta por pregunta en el quiz.");
        if (question == "" || option1 == "" || option2 == "" || option3 == "" || option4 == "") return alert("Debe completar todos los campos para continuar.");
        correctOption = correctOption.value;
        const toWin = parseInt(correctOption);
        quizData.push({
        question: question,
        isImage: isImage,
        options: options,
        toWin: toWin
        });
    }
    const quiz = {
        name: quizName,
        data: quizData
    };
    
    enviarPeticionPOST(quiz).then(apiResponse => {
        console.log(apiResponse);
    });

}

document.getElementById('addQuestion').addEventListener('click', addQuestion);
document.getElementById('removeQuestion').addEventListener('click', removeQuestion);
quizForm.addEventListener('submit', submitQuiz);

function enviarPeticionPOST(json) {
    const apiURL = 'https://kingames.tk/submit';

    return fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    }).then(response => {
      return response.text();
    });
}
