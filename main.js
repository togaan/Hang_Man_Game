// letters 
const letters = "abcdefghijklmnopqrstuvwxyz";

// get array from letters
let lettersArray = Array.from(letters);

// Select letters contaner
let lettersContainer = document.querySelector(".letters");

// Generate letters
lettersArray.forEach(letter => {
    // create span
    let span = document.createElement("span");

    //create letter text node
    let theLetter = document.createTextNode(letter);

    // Append the letter to span
    span.appendChild(theLetter);

    // Add class on span
    span.className = 'letter-box';

    // Append span to the letters container
    lettersContainer.appendChild(span)
})



fetch("main.json")
    .then(function (resp) {return resp.json()})
    .then(data => javascriptData(data))

const javascriptData = (data) => {
    let allkeys = Object.keys(data.words);
    let randamNumber = Math.floor(Math.random() * allkeys.length);
    let randamName = allkeys[randamNumber];
    let randamValue = data.words[randamName];

    let randamValueNumber = Math.floor(Math.random() * randamValue.length);
    let randamValueValue = randamValue[randamValueNumber];
    // set category info 
document.querySelector(".game_info .category span").innerHTML = randamName 

// select letter guess element
let lettersguessContainer = document.querySelector(".letters_guess");

// convert chosen word to array
let lettersAndSpace = Array.from(randamValueValue);

// create span deoended on word
lettersAndSpace.forEach(letter => {
    // create an empty span
    let emptySpan = document.createElement("span");

    if (letter == ' ') {
        emptySpan.className = 'with-space'
    }
    lettersguessContainer.appendChild(emptySpan)

});

// select guess spans

let guessSpans = document.querySelectorAll(".letters_guess span");
let randamValueValueLength = lettersAndSpace.length;
let guessSpansLength = guessSpans.length;

let randamValueValueS = /\S/g;
let randamValueValueWithoutSpace = randamValueValue.match(randamValueValueS).join("");



// set wrong attempts 
let wrongAttempts = 0;

// set right attempts 
let rightAttempts = 0;

//select the draw element
let theDraw = document.querySelector(".hangman_draw")

//handle clicking on letters
document.addEventListener("click", (e) => {
    //set the chose status
    let theStatus = false;

    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked")
        
    
        // get clicked letter
        let ClickedLetter = e.target.innerHTML.toLowerCase();

        // get chosen word
        let chosenWord = Array.from(randamValueValue.toLowerCase());

        chosenWord.forEach((wordLetter, WordIndex) => {

            if (ClickedLetter === wordLetter) {
                // set status to correct
                theStatus = true;
                // loop on all guess spans
                guessSpans.forEach((span, spanIndex) => {
                    if (WordIndex === spanIndex) {
                        span.innerHTML = ClickedLetter;
                        rightAttempts++;
                    }
                });
    
            }
        
        });
        
        
        // if the letter is wrong
        if (theStatus !== true) {
            // increase the wrong attempts
            wrongAttempts++;

            // add class wrong on the draw element 
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            
            // play fail sound
            document.getElementById("fail").play();
            if (wrongAttempts === 8) {
                endGame();
                lettersContainer.classList.add("finished");
                reload();
                document.addEventListener("click", (y) => {
                    if (y.target.className === 'relod_Button') {
                        window.location.reload();
                    }
                });
            }

        } else {
            // play success sound
            document.getElementById("success").play();
            if (rightAttempts === randamValueValueWithoutSpace.length) {
                winGame();
                lettersContainer.classList.add("finished");
                reload();
                document.addEventListener("click", (y) => {
                    if (y.target.className === 'relod_Button') {
                        window.location.reload();
                    }
                });
            }
        }
    }   
    
});

// end game function 
function endGame() {
    //create popup div
    let lost = document.createElement("div");

    // create text 
    let lostText = document.createTextNode(`Game over, the word is ${randamValueValue}`)

    // append text to div
    lost.appendChild(lostText);

    // add class on div
    lost.classList = 'popup';

    // append to the body
    document.body.appendChild(lost);
}

// win game function
function winGame() {
    // creat win div
    let win = document.createElement("div");

    // creat text
    let winText = document.createTextNode(`congragolations, you wan. you mist ${wrongAttempts} times!`) 
    
    win.appendChild(winText);

    win.classList = 'popup';

    document.body.appendChild(win)

}
function reload() {
    let relodButton = document.createElement("button");
    let relodText = document.createTextNode("play again");
    relodButton.appendChild(relodText);
    relodButton.classList = 'relod_Button';
    document.body.appendChild(relodButton);
};



}
    
   

   



// end game function 
function endGame() {
    //create popup div
    let lost = document.createElement("div");

    // create text 
    let lostText = document.createTextNode(`Game over, the word is ${randamValueValue}`)

    // append text to div
    lost.appendChild(lostText);

    // add class on div
    lost.classList = 'popup';

    // append to the body
    document.body.appendChild(lost);
}

// win game function
function winGame() {
    // creat win div
    let win = document.createElement("div");

    // creat text
    let winText = document.createTextNode(`congragolations, you wan. you mist ${wrongAttempts} times!`) 
    
    win.appendChild(winText);

    win.classList = 'popup';

    document.body.appendChild(win)

}
function reload() {
    let relodButton = document.createElement("button");
    let relodText = document.createTextNode("play again");
    relodButton.appendChild(relodText);
    relodButton.classList = 'relod_Button';
    document.body.appendChild(relodButton);
};

