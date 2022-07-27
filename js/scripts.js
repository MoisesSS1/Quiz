const question = document.querySelector('#question')
const answersBox = document.querySelector('#answers-box')
const quizzContainer = document.querySelector('#quizz-container')
const scoreContainer = document.querySelector('#score-container')
const letters = ["a","b","c","d"]
let points = 0
let actualQuestion = 0

//Perguntas
const questions = [
  {
    "question": "PHP foi desenvolvido para qual fim?",
    "answers": [
      {
        "answer": "back-end",
        "correct": true
      },
      {
        "answer": "front-end",
        "correct": false
      },
      {
        "answer": "Sistema operacional",
        "correct": false
      },
      {
        "answer": "Banco de dados",
        "correct": false
      },
    ]
  },
  {
    "question": "Uma forma de declarar variável em JavaScript:",
    "answers": [
      {
        "answer": "$var",
        "correct": false
      },
      {
        "answer": "var",
        "correct": true
      },
      {
        "answer": "@var",
        "correct": false
      },
      {
        "answer": "#let",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual o seletor de id no CSS?",
    "answers": [
      {
        "answer": "#",
        "correct": true
      },
      {
        "answer": ".",
        "correct": false
      },
      {
        "answer": "@",
        "correct": false
      },
      {
        "answer": "/",
        "correct": false
      },
    ]
  },
]

//Substituição do quizz para a primeira pergunta
function init() {

  //Criar a primeira pergunta
  createQuestion(0)
  
}

//Cria uma pergunta
function createQuestion(i) {

  //Limpar questão anterior
  const oldButtons = answersBox.querySelectorAll('button')

  oldButtons.forEach(function (btn) {
    btn.remove()
  })  

  //Alterar o texto da pergunta
  const questionText = question.querySelector('#question-text')
  const questionNumber = question.querySelector('#question-number')

  questionText.textContent = questions[i].question
  questionNumber.textContent = i + 1

  //Insere as alternativas
  questions[i].answers.forEach( function (answer, i) {

    //Cria o template do botão de quizz
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true)

    const letterBtn = answerTemplate.querySelector('.btn-letter')
    const answerText = answerTemplate.querySelector('.question-answer')

    letterBtn.textContent = letters[i]
    answerText.textContent = answer['answer']

    answerTemplate.setAttribute("correct-answer", answer['correct'])

    //Remover hide e template class
    answerTemplate.classList.remove('hide')
    answerTemplate.classList.remove('answer-template')

    answersBox.appendChild(answerTemplate)

    //Inserir evento de click no botão
    answerTemplate.addEventListener('click',function () {
      checkAnswer(this)    
    })
  })

      //incrementar o número da questão
      actualQuestion ++
}

//Verifica a resposta do usuário
function checkAnswer(btn) {
 
  //Seleciona todos os botões
  const buttons = answersBox.querySelectorAll('button')

  //Verifica se a resposta está correta e adiciona classe nos botões
  buttons.forEach(function (button) {

    if(button.getAttribute("correct-answer") ==='true'){
      button.classList.add("correct-answer")

      //checca se o usuario acertou a pergunta
      if(btn === button){
        points++
      }

    }else{
      button.classList.add("wrong-answer")
    }
  })

  //Exibir proxima pergunta
  nextQuestion(actualQuestion)
  
}


  //Exibir proxima pergunta
  function nextQuestion(){
   
    //Timer para o usuário ver as respostas
    setTimeout(function () {

      //verifica se ainda há perguntas
      if (actualQuestion>=questions.length ) {
        //Apresenta mensagem de sucesso

       showSuccessMessage()
       return
        
      }

      createQuestion(actualQuestion)
      
    },1500)
  }

  //Exibe a tela final

  function showSuccessMessage() {

     //trocar dados da tela de sucesso
    quizzContainer.classList.toggle("hide")
    scoreContainer.classList.toggle('hide')

    //calcular o score
    const score = ((points / questions.length) * 100).toFixed(2)

    console.log(score,points, questions.length)

    const displayScore = document.querySelector('#display-score')

    displayScore.textContent= score.toString()

    //Alterar o número de perguntas corretas
    const correctAnswers = document.querySelector('#correct-answers')
    correctAnswers.textContent = points

    //Alterar o total de perguntas
    const totalQuestions = document.querySelector("#questions-qty")
    totalQuestions.textContent = questions.length
  }


//Inicialização do quizz
init()