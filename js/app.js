//  get the game elements
const cards = document.querySelectorAll('.card');

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
function addMatchedClass() {
    //  Add the matched Class to the 2 cards after .5s || 500 milliseconds
    setTimeout(function() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
    }, 500);
}

// Remove the flip class from cards when isMatch() is false
function recoverCards() {
    // set the stopEvents to true to prevent the user from interact intel the function end
    stopEvents = true;
    setTimeout(function() {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        // And reset the whole variables And Booleane to the Default including The stopEvents booleane by calling the resetVars() Function
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
        let randomais = Math.floor(Math.random() * 12);
        //And give evry card a randome number between 1:12
        //And set it to its order property
        card.style.order = randomais;
    });
}

//  Call the Function immediately
shuffle();


function restGame() {
    cards.forEach(card => card.classList.remove('matched', 'flip', ));
    cards.forEach(card => card.addEventListener('click', flipCard));
    shuffle()
};

cards.forEach(card => card.addEventListener('click', flipCard));
function count() {
    var counter = 1;
    setInterval(function () {
        counter++
    }, 1000);
}

count();