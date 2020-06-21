const values = [
    {
        category: 'sound word',
        name: 'rhythm',
        hint: 'A strong, regular repeated pattern of movement or sound.'
    },
    {
        category: 'Creature',
        name: 'sphinx',
        hint: 'A winged monster having a woman\'s head and a lion\'s body'
    },
    {
        category: 'Number Sequence',
        name: 'twelfth',
        hint: 'constituting number twelve in a sequence'
    },
    {
        category: 'arrangement',
        name: 'queue',
        hint: 'A sequence of people or vehicles awaiting their turn to be attended to or to proceed.'
    },
    {
        category: 'devil',
        name: 'zombie',
        hint: 'A person or corpse  turned into a creature capable of movement and feeds on flesh'
    },
    {
        category: 'medical condition',
        name: 'dwarfism',
        hint: 'A person is abnormally small stature because of this medical condition;'
    },
    {
        category: 'Art',
        name: 'calligraphy',
        hint: 'The art of producing decorative handwriting'
    },
    {
        category: 'dress',
        name: 'pajama',
        hint: 'A loose-fitting jacket and trousers for sleeping in.'
    },
    {
        category: 'word',
        name: 'virus',
        hint: 'Can affect both human and computers'
    },
    {
        category: 'book',
        name: 'HarryPotter',
        hint: 'Written By JK ROWLING'
    },
    {
        category: 'color',
        name: 'red',
        hint: 'Known to be symbol of love'
    },
    {
        category: 'fruit',
        name: 'kiwi',
        hint: 'Is a bird as well as fruit'
    },
    {
        category: 'needs',
        name: 'oxygen',
        hint: 'Something you cant live without'
    },
    {
        category: 'phobia',
        name: 'Claustrophobia',
        hint: 'Fear of closed space'
    },
    {
        category: 'music',
        name: 'jazz',
        hint: 'A type of music of black American origin'
    },
    {
        category: 'condition',
        name: 'dizzy',
        hint: 'Having or involving a sensation of spinning around and losing one\'s balance.'
    },


]

//DATE TIME SECTION
const date = new Date();
document.getElementById("date").innerHTML = date.toDateString();

highScores();

//Selecting unused words 
const chosedNumbers = [];
let incorrectWords = [];
let correctWords = [];
let realWord = [];


window.onload = newGame();
document.addEventListener("keyup", e => checkLetter(e));


window.onclick = () => {
    document.getElementById("modal").style.display = "none";
}
//Initializes new Game
function newGame() {
    incorrectWords = [];
    correctWords = [];
    realWord = [];

    choice = numberSelection();

    const selectedWord = values[choice].name;
    const category = "Guess the " + values[choice].category;
    const hint = values[choice].hint;

    document.getElementById("category").innerHTML = category;
    document.getElementById("hint").innerHTML = hint;

    //Making arrays of string and assigning in variable realWord
    for (i = 0; i < selectedWord.length; i++) {
        realWord.push(selectedWord[i].toLowerCase());
    }
    
    commonChanges();
    
}


function commonChanges()
{

    removeTypedLetters();
    const parts = ["head", "body", "lleg", "lhand", "rhand", "rleg"];
    parts.forEach(part => {
        document.getElementById(`${part}`).style.display = "none";
    })

    document.getElementById("error").innerHTML = "";
    const paragraph = document.getElementById("text");
    paragraph.innerHTML = "";

    //Creating placeholder for pressed keys
    for (i = 0; i < realWord.length; i++) {

        let span = document.createElement("span");
        span.appendChild(document.createTextNode("_"));
        span.setAttribute("id", i);
        span.setAttribute("class", "letters");
        paragraph.appendChild(span);
    }
    
}

function tryAgain()
{
    incorrectWords = [];
    correctWords = [];
    commonChanges();

}

function checkLetter(e) {
    
    const key = e.key.toLowerCase();

    document.getElementById("error").innerHTML = "";
    let errMsg = "";
    
    switch (true) {

        case (!key.match(/[a-zA-z]/)):
            document.getElementById("error").innerHTML = "Please enter alphabets from A to Z only";
            break;

        case (incorrectWords.includes(key)):
            const audio1 = new Audio("incorrect.mp3");
            audio1.play();
            errMsg = "You have already typed the word '" + key + "'";
            document.getElementById("error").innerHTML = errMsg;
            break;

        case (correctWords.includes(key)):
            
            const audio2 = new Audio("incorrect.mp3");
            audio2.play();
            errMsg = "You have already typed the word '" + key + "'";
            document.getElementById("error").innerHTML = errMsg;
            break;

        case (realWord.includes(key)):
            const audio3 = new Audio("correct.mp3");
            audio3.play();
            correctWords.push(key);
            displayCorrectLetters(realWord, key);
            displayTypedLetters("correct", key);
            checkCompleted(realWord);
            break;


        default:
            const audio4 = new Audio("incorrect.mp3");
            audio4.play();
            incorrectWords.push(key);
            countError(incorrectWords.length);
            displayTypedLetters("incorrect", key);
            break;

    }

}



//removes the incorrect and corrected list
function removeTypedLetters() {

    const list = ["incorrect", "correct"];
    const div = document.getElementsByClassName("results")[0];
    div.innerHTML = "";

    for (let i = 0; i < list.length; i++) {
        const p = document.createElement("p");
        p.setAttribute("id", `${list[i]}-words`);
        p.appendChild(document.createTextNode(`${list[i]} words:`));
        p.appendChild(document.createElement("br"))
        div.appendChild(p);
    }
}



//Gives unique words 
function numberSelection() {
    let num = Math.floor(Math.random() * values.length);
    if (chosedNumbers.length === values.length) {
        chosedNumbers.length = 0;
    }
    while (chosedNumbers.includes(num)) {
        num = Math.floor(Math.random() * values.length);
    }
    chosedNumbers.push(num);
    return num;
}

//Display if you win or lose
function displayResult(react, result) {
    document.getElementById("reaction").innerHTML = react;
    document.getElementById("remarks").innerHTML = result;
}

//Displaying guidelines when hovered on Help
function displayHelp() {
    document.getElementsByClassName("help")[0].style.display = "block";
}

function removeHelp() {
    document.getElementsByClassName("help")[0].style.display = "none";
}

function highScores(score = 0) {

    const cookie = document.cookie;
    if (cookie === "") {
        document.cookie = `highest-score=0; max-age=259200;`;
        return document.getElementById("highest-score").innerHTML = 0;
    }

    let highestScore = cookie.split(";")[0];
    highestScore = highestScore.split("=")[1];
    document.getElementById("highest-score").innerHTML = highestScore;

    if (highestScore < score && score != 0) {
        document.cookie = `highest-score=${score}; max-age=259200;`;
        document.getElementById("highest-score").innerHTML = score;
    }
}

function countError(num) {

    const list = ["0", "head", "body", "lhand", "rhand", "lleg", "rleg"];
    document.getElementById(`${list[num]}`).style.display = "block";

    if (num === 6) {
        document.getElementById("modal").style.display = "block";
        displayResult("Better luck next time", "You lose ...");
        

    }

}

function checkCompleted(word) {

    for (let i = 0; i < word.length; i++) {

        const spanItem = document.getElementById(i).innerText;
        if (spanItem === "_") {

            break;
        }
        else if (i === word.length - 1) {

            const currentScore = parseInt(document.getElementById("current-score").innerHTML) + 1;
            document.getElementById("current-score").innerHTML = currentScore;
            document.getElementById("modal").style.display = "block";
            displayResult("Congratulations!", "You won ...")
            
            highScores(currentScore)
        }
    }

}

function displayCorrectLetters(arr, val) {

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            let item = document.getElementById(i);
            item.innerHTML = "";
            item.appendChild(document.createTextNode(val))
        }
    }

}

function displayTypedLetters(value, key) {

    const typed = value + "-words"
    const paragraph = document.getElementById(typed);
    let span = document.createElement("span");
    span.setAttribute("id", value);
    span.appendChild(document.createTextNode(key));
    paragraph.appendChild(span)
}