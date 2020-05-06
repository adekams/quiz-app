
// set variables to hold html tags
const options = document.querySelector('.options').children

const questionNumber = document.querySelector('#question-num')

const totalQuestions = document.querySelector('#totalQ')

const question = document.querySelector('#question')

let btn1 = document.querySelector("#a")

let btn2 = document.querySelector("#b")

let btn3 = document.querySelector("#c")

let trackerContainer = document.querySelector('.tracker')

const next = document.querySelector('.nextQ')

let score = document.querySelector('#score')

let finalScore = document.querySelector('#final-score')

let tryAgain = document.querySelector('#again')

//to loop over the quizQuestion array
let quizIndex;

//to loop over the questions
let index = 0;

//to avoid duplicate questions while randomizing
let dupArray=[];
let myArr= [];

//to count correct answers
let counter=0;


//save the questions, options and correct answers in an array
const quizQuestions = [
    {
        question: "What is the shortcut for the 'copy' function on most computers?",
        answers: {
            a: 'shift + c',
            b: 'ctrl + c',
            c: 'ctrl + alt'
        },
        correctAnswer: 'b'
    },

    {
        question: "The botanical plant 'Oryza sativa' is commonly known as?",
        answers: {
            a: 'Rice',
            b: 'Millet',
            c: 'Spaghetti'
        },
        correctAnswer: 'a'
    },

    {
        question: "What kind of alcohol is Russia notoriously known for?",
        answers: {
            a: 'Rum',
            b: 'Vodka',
            c: 'Gin'
        },
        correctAnswer: 'b'
    },

    {
        question: "What does the car brand 'BMW' stands for?",
        answers: {
            a: 'Belgian Motor Wiring',
            b: 'Be My Wife',
            c: 'Bavarian Motor Works'
        },
        correctAnswer: 'c'
    },

    {
        question: "How many bones are there in the human body?",
        answers: {
            a: 155,
            b: 300,
            c: 206
        },
        correctAnswer: 'c'
    }
]

//store questions and answers into the variables already set to push to html
function quiz(){
    questionNumber.innerHTML = `Question ${index+1} / ${quizQuestions.length}`
    question.innerHTML = quizQuestions[quizIndex].question
    btn1.innerHTML = quizQuestions[quizIndex].answers.a
    btn2.innerHTML = quizQuestions[quizIndex].answers.b
    btn3.innerHTML = quizQuestions[quizIndex].answers.c
    index++
}

//check if user picks correct answer and change bgcolor and text color according to option selected
function check(ans){
    if (ans.id == quizQuestions[quizIndex].correctAnswer){
        ans.classList.add('right-answer')
        counter++
        score.innerHTML =`Score: ${counter}`   
    }
    else{
        ans.classList.add('wrong-answer')
        
    }
    //after user pick an option, other options become unclickable
    disableOptions()
}


//disallow user from picking more than one option
function disableOptions(){
    for(i=0; i<options.length; i++){
        options[i].classList.add('disabled')
        if (options[i].id == quizQuestions[quizIndex].correctAnswer){
            options[i].classList.add('right-answer')
        }
    }
}

//make the options clickable again for next question
function enableOptions(){
    for(i=0; i<options.length; i++){
        options[i].classList.remove('disabled', 'right-answer', 'wrong-answer' )
    }
}

//validate that an option is picked
function validate(){
    //if disabled is not part of options' class
    if(!options[0].classList.contains('disabled')){
        //next.style.display= 'none'
        //next.style.display="none"
        alert('Please select an option')
    }else{
        enableOptions();
        randomize();
    }
}
//btn1.addEventListener('click', check())

//make sure user selects an option before going to next question
function nextQ(){
    validate()
}

//next.addEventListener('click', nextQ())

//to randomize the question on load, store in an array and make sure no duplicates
function randomize(){
    let randomQuestion=Math.floor(Math.random()*quizQuestions.length)
    let hitDuplicate=0
    if(index==quizQuestions.length){
        gameOver()
    }
    else{
        if(dupArray.length > 0){
            for(i=0; i< dupArray.length; i++){
                if(dupArray[i] == randomQuestion){
                    hitDuplicate = 1
                    break;
                }
            }
            if(hitDuplicate == 1){
                randomize()
            }
            else{
                quizIndex = randomQuestion
                quiz()
                myArr.push(quizIndex)
            }
        }
        if(dupArray.length == 0){
            quizIndex = randomQuestion
            quiz()
            myArr.push(quizIndex)
        }
        console.log('myArr:'+myArr)

        dupArray.push(randomQuestion)
    }
}

//show game over page after the fifth question
function gameOver(){
    document.querySelector('.the-end').classList.add('visible')
    finalScore.innerHTML = `You scored ${counter} of ${quizQuestions.length}`

}

//allow user start the game again
function playAgain(){
    window.location.reload()
}
//document.querySelector('#again').addEventListener('click', playAgain())
window.onload=function(){
    randomize();
}












































/*
//hide the next button while user hasn't picked an option
document.querySelector('#next').style.display="block"

//hide the next button when user hasn't picked an option and display after user has picked one
function nextQ(){
  document.querySelector('#next').style.display="none"
  document.querySelector('.answer-btn')  .style.display='block'
}
*/
