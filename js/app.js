//  get the game elements
const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.game-wraper');


// Loop through cards and set event listener for Every card
cards.forEach(card => card.addEventListener('click', flipCard));


// Declearations
        // Use to check if  the cards has clas flip.
let     hasFlipped = false,
        // to check if the 2 cards has class flip to prevent user form Unflip the 3rd card
        stopEvents = false,
        // Us to redeclear with the 2 cards that the user will interact with
        firstCard, secondCard;

// Flip the cards & check status.
function flipCard() {
    // Prevent the second click in the same card because if second click in the same card the matching will be true
    if (this === firstCard) return; // it's mean false || stop the Function here
    // To prevent the user to unflip the 3rd card if it already flip 2 cards
    // If true stop the Function
    if (stopEvents) return; // it's mean false || stop the Function here
    // Give the targeted card the class flip
    this.classList.add('flip');

    //  if there's no cards has class flip when user click one
    if(!hasFlipped) {
         // Thin Change the hasFlipped boolean a value of true
        hasFlipped = true;
        // And Change the firstCard variable the value of 'this' (Clicked Card)
        firstCard = this;
        return; // And stop the Function here
    }

    // And if the last condition is false that mean there's a card has flipped, so the clicked card must be the second one
    //  So Change the secondCard variable the value of 'this' (Clicked Card)
    secondCard = this;
    // And Change the hasFlipped boolean a value of true
    hasFlipped = false;

    // And now call the  isMatch() Function to check if the 2 cards matched or not!
    isMatch();
}

// Check If  the flipped cards is matched.
function isMatch() {
    // With the HTML 5 data atrribute if the 2 cards has the same Data name || value
                                                                                // if true call the keepFlipped() Function
    firstCard.dataset.ico === secondCard.dataset.ico ? keepFlipped() : recoverCards(); // And if false call the recoverCards() function
}

// Leave The flip Class if cards matched by removing the event listener
function keepFlipped() {
    firstCard.removeEventListener('click', flipCard); // Remove the Event listenters from the first card
    secondCard.removeEventListener('click', flipCard);// And remove It from the second one too

    // And call the addMatchedClass Function
    addMatchedClass()
}

// Add class Matched to the cards
// This Function created only for smooth transition in the way to give the matched cards a good style it will not effect the game if removed
//  Define a num varible to know numper of the matched cards so we can stop the timer when all cards matched
let num = 1;
function addMatchedClass() {
    //  Add the matched Class to the 2 cards after .5s || 500 milliseconds
    setTimeout(function() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        //  And incress the num varible by 1 every time the function runs
        num++
    }, 500);
}

// Remove the flip class from cards when isMatch() is false
function recoverCards() {
    // set the stopEvents to true to prevent the user from interact intel the function end
    stopEvents = true;
    setTimeout(function() {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        // And reset the whole variables And Booleanes to the Default including The stopEvents booleane by calling the resetVars() Function
        resetVars();
    }, 1500);
}

//  Reset all variables back to default values
function resetVars() {
    hasFlipped = false,
    stopEvents = false,
    firstCard = null,
    secondCard = null;
}

// .game-warper Element was set to display flex so we can re arange the cards with css order property
function shuffle() {
    // Loop through cards
    cards.forEach(function(card) {
        //  Define the random numper genrates with compniation of the math Functions as a varible
        let randomais = Math.floor(Math.random() * 12);
        //And give evry card a randome number between 1:12
        //And set it to its order property
        card.style.order = randomais;
    });
}
//  Call the Function immediately
shuffle();

//  Set a Event listenter to the cards Container Element to use for start Timer when Click
deck.addEventListener('click', counter);//  and call Counter() Function

//  Define 2 varibls to use in the way to create a timer
let sec = 0, min = 0;
//  Create a counter() function that will use in count time that the user will finsh the game
function counter() {
    //  reset the num varible to 0 once the Function called
    num = 0;
    //  Define the Interval Function to a Timer varible so we can use it to stop it later
    let timer = setInterval(function () {
        //  Incress the sec varible evry second
        sec++
        //  And print its value to the sec Element in the index.html file as string
        document.getElementById('sec').textContent = sec;
        //  And check if the value equl to 59s
        if (sec === 59){
            //  if true incress the min varible by 1 everytime its equel to 59s
            min = min + 1;
            //  And print its value to the min Element in the index.html file as string
            document.getElementById('min').textContent = min;
            // and set the sec varible back to 0 so to start over again
            sec = 0;
        }
        //  And check if the num varible equel to 6 |  that mean the whole cards has matched
        if (num === 5) {
            //  Thin stop Timer
            clearInterval(timer);
        }

    }, 1000);

    // Remove the event listener from the game Container to prevent calling the Function Every time the user click the cards
    deck.removeEventListener('click', counter);
}


// ResetGame() will execut when the user hit the start over button
function restGame() {
    //  Remove class matched , flip from cards
    cards.forEach(card => card.classList.remove('matched', 'flip'));
    //  and set the Event listeners back to the cards Because we removes it when 2 cards matched
    cards.forEach(card => card.addEventListener('click', flipCard));

    //  And call the shuffle() Function again to rearrange the cards randomly
    shuffle()

    // and force the sec variable to 0 because if we don't the timer will from the last saved value
    sec = 0;
    //  give the num varible a value of 5 will stop the timer
    num = 5;
    //  Add the Event listenter back to the game Contianer that the counter() Function was removes
    deck.addEventListener('click', counter);
    // And print 0 in the min and the sec Elements in the index.html file as string
    document.getElementById('sec').textContent = 0;
    document.getElementById('min').textContent = 0;
}