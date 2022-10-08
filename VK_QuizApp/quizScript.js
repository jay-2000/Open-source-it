const quizQna = [
    {
        question: 'In which country is the Taj Mahal?',
        a: 'Melbourne',
        b: 'India',
        c: 'Conneticut',
        d: 'None of the above',
        correctAns: 'b'
    },
    {
        question: 'Who was the first man to walk on the moon?',
        a: 'Steven',
        b: 'Kalpana Chawla',
        c: 'Neil Armstrong',
        d: 'Speiberg',
        correctAns: 'c'
    },
    {
        question: 'Which is the deepest ocean in workd',
        a: 'Artic',
        b: 'Atlantic',
        c: 'Indian',
        d: 'Pacific',
        correctAns: 'd'
    },
    {
        question: 'How many strings does a Guitar/ Ukele have?',
        a: 'Three(3)',
        b: 'Four(4)',
        c: 'Six(6)',
        d: 'Seven(7)',
        correctAns: 'b'
    },
    {
        question: 'On which continent is India located?',
        a: 'Asia',
        b: 'Europe',
        c: 'Africa',
        d: 'Antartica',
        correctAns: 'a'
    },
    {
        question: 'What is the largest planet in the solar system?',
        a: 'Saturn',
        b: 'Earth',
        c: 'Jupiter',
        d: 'Venus',
        correctAns: 'c'
    },
    {
        question: 'How many days are there in Febraury in leap year?',
        a: '30',
        b: '29',
        c: '31',
        d: '28',
        correctAns: 'd'
    },
    {
        question: 'What does a carnivore eat?',
        a: 'Grass',
        b: 'Water',
        c: 'Meat',
        d: 'plants',
        correctAns: 'c'
    },
    {
        question: 'Which ocean is frozen for most of the year?',
        a: 'Artic',
        b: 'Indian',
        c: 'Pacific',
        d: 'Bay of Bengal',
        correctAns: 'a'
    },
    {
        question: 'In which Australian city is the Opera House?',
        a: 'Melbourne',
        b: 'Sydney',
        c: 'Perth',
        d: 'None of the above',
        correctAns: 'b'
    },
    {
        question: 'What is 44 divided by 4?',
        a: '19',
        b: '10',
        c: '11',
        d: '8',
        correctAns: 'c'
    },
    {
        question: 'What is the 7th letter of the alphabet?',
        a: 'b',
        b: 'c',
        c: 'g',
        d: 'f',
        correctAns: 'c'
    },
    {
        question: 'How many days are there in one year (not a leap year)?',
        a: '364',
        b: '367',
        c: '366',
        d: '365',
        correctAns: 'd'
    },
    {
        question: 'How many colors are there in a rainbow?',
        a: '7',
        b: '10',
        c: '12',
        d: '8',
        correctAns: 'a'
    },
    {
        question: 'Can you unscramble the following word to reveal the name of the biggest tropical rainforest in the world: ZNMAAO?',
        a: 'AMAZON',
        b: 'DECCAN',
        c: 'AMAAZON',
        d: 'DECAAN',
        correctAns: 'a'
    }
]
const dps = [
    // boy_dp = {
    //     dp: "👦"
    // },
    // girl_dp = {
    //     dp: "👧"
    // }
    "👦", "👧"
]


var firebaseConfig = {
    // add the credentails
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var playerDetailsRef = firebase.database().ref('players-data');


const questionEl = document.getElementById("question");
const a_textEl = document.getElementById("a_text");
const b_textEl = document.getElementById("b_text");
const c_textEl = document.getElementById("c_text");
const d_textEl = document.getElementById("d_text");
const answerEls = document.querySelectorAll(".answer");
const quizSubmitBtn = document.getElementById("quiz_submit");
const scoreEls = document.getElementById("score");
const scoreEl = document.getElementById("score");
const playerNameEl = document.getElementById("playerName");
const playerDpEl = document.getElementById("playerDp");
let score = 0;
let quizCount = 0;
const totQuiz = quizQna.length;

playerNameEl.innerText = localStorage.getItem('player_name');
playerDp = localStorage.getItem('player_dp');
let index = 0; 
if (playerDp === 'boy_dp') {
    index = 0;
}
else {
    index = 1;
}
playerDpEl.innerText = dps[index];


loadQuiz();
function loadQuiz() {
    deleteAnswerID();

    const currentQuiz = quizQna[quizCount];
    questionEl.innerText = currentQuiz.question;
    a_textEl.innerText = currentQuiz.a;
    b_textEl.innerText = currentQuiz.b;
    c_textEl.innerText = currentQuiz.c;
    d_textEl.innerText = currentQuiz.d;
    console.log(score);
}

function deleteAnswerID() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });    
    quizSubmitBtn.style.backgroundColor = "blue";
}

// function to get selected answer ID
function getAnswerID() {
    let answerID = undefined;
    answerEls.forEach((answerEl) => {
        if(answerEl.checked) {
            answerID = answerEl.id;
        }
    });
    return answerID;
}

quizSubmitBtn.addEventListener('click', () => {
    // get the answer click
    const answerID = getAnswerID();
    
    if(answerID === quizQna[quizCount].correctAns) {
        score++;
        scoreEl.innerText = score;
        const correctAns = document.getElementById(`${answerID}_res`);
        correctAns.innerText = '👌';
        quizSubmitBtn.style.backgroundColor = "green";
        quizCount++;
        if (quizCount < totQuiz){
            // timeout for 5 seconds
            setTimeout(() => {
                correctAns.innerText = ' ';
                loadQuiz();
            }, 1000);
        }
        else {
            console.log('quiz completed');
            savePlayerDetails(localStorage.getItem('player_name'), localStorage.getItem('player_dp'), score);
            window.location.href = ' dashboard.html'
        }
    }
    else {
        const wrongAns = document.getElementById(`${answerID}_res`);
        wrongAns.innerText = '😡';
        quizSubmitBtn.style.backgroundColor = "red";
        quizCount++;
        // timeout for 5 seconds
        if (quizCount < totQuiz){
            setTimeout(() => {
                wrongAns.innerText = ' ';
                loadQuiz();
            }, 1000);
        }
        else {
            console.log('quiz completed');
            savePlayerDetails(localStorage.getItem('player_name'), localStorage.getItem('player_dp'), score);
            window.location.href = ' dashboard.html'
        }
    }
})


function savePlayerDetails(playerName, playerDp, score) {
    var newplayerDetailsRef = playerDetailsRef.push();
    newplayerDetailsRef.set({
        name: playerName,
        dp: playerDp,
        score: score
    });
}

// quiz page js ends