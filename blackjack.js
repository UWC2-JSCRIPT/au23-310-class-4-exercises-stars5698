// Donna Quach, JavaScript 310B, Autumn 2023
// Class 4 Exercises 


/**************************************************************************
          getDeck() function from createCardDeck.js for use here 
**************************************************************************/
/**
 * Returns an array of 52 Cards
 * @returns {Array} deck - a deck of cards
 */

let deck = [];
const suits = ['hearts', 'spades', 'clubs', 'diamonds'];

const getDeck = () => {
  
  for (let index = 0; index < suits.length; index++) {
    // create an array of 13 objects
    console.log(`Index is currently at ${index}`); // for testing purposes 

    let displayVal = '';
    
    for (let j = 1; j <= 13; j++) {
      // for each loop, push a card object to the deck
      console.log(`j is currently at ${j}`); // for testing purposes 
      // special cases for when j > 10

      if(j === 1)
      {
        displayVal = 'Ace';
      }
      if(j > 1 && j <= 10) 
      {
        displayVal = j; 
      }
      if(j === 11) 
      {
        displayVal = 'Jack';
      }
      if(j === 12)
      {
        displayVal = 'Queen';
      }
      if(j === 13)
      {
        displayVal = 'King';
      }
 

      const card = {
        val: j,
        displayVal: displayVal,
        suit: suits[index],
      }

      if (displayVal === 'Ace') {
        card.val = 11; // Because Ace has a card value of 11 
      }

      if (displayVal === 'Jack' || displayVal === 'Queen' || displayVal === 'King') {
        card.val = 10; // Because Jack, Queen, and King have a card value of 10
      }

      deck.push(card);

      
      console.log(`Card added is valued at ${card.val} points with ${card.displayVal} of ${card.suit}`); // Check val, displayVal, and suit of card added
      console.log(`Deck length is now: ${deck.length}`); // Check deck length after adding card to deck
      console.log(deck[deck.length - 1]); // Access card that was added to deck 
      console.log(`${card.val} ${card.displayVal} ${card.suit}`); // Print card that was accessed 
      console.log('\n');
    }
  }

}

const blackjackDeck = getDeck(); // Calling function above 

// /**
//  * Represents a card player (including dealer).
//  * @constructor
//  * @param {string} name - The name of the player
//  */
class CardPlayer {
    // Every class created in JavaScript is required to have a method named constructor()
    constructor(name) {
        this.name = name; // Name of player or dealer passed in 
        this.hand = []; // Player's hand is initially empty 
    }

    drawCard() {
        // Keep track of player's hand
        const{hand} = this; 

        // Returns a random integer from 0 to 51. 
        // 0 to 51 because we are referring to the an element's index within an array (which starts at 0.)
        let randomCardIndex = Math.floor(Math.random() * 52); 
        // Pick a random card from deck and add to player's hand.
        hand.push(blackjackDeck[randomCardIndex]); 
    }
}; //TODO

// // CREATE TWO NEW CardPlayers
const player = new CardPlayer('Player'); // TODO
const dealer = new CardPlayer('Dealer'); // TODO


/**
 * Calculates the score of a Blackjack hand
 * @param {Array} hand - Array of card objects with val, displayVal, suit properties
 * @returns {Object} blackJackScore
 * @returns {number} blackJackScore.total
 * @returns {boolean} blackJackScore.isSoft
 */

const calcPoints = (hand) => 
{ 
  // CREATE FUNCTION HERE
  let totalScore = 0; // Initial score

  // Hand is not soft initially 
  // Note: Soft = Hand has an ace that counts as 11 points 
  //       Hard = Hand either has NO aces or all aces must be counted as 1 point (to prevent busting)
  let isHandSoft = false;

  // Object that will be returned by calcPoints()
  let blackJackScore = {total: totalScore, isSoft: isHandSoft}; 

  // Keep track of # of Aces in hand (because we don't know how many we'll get.)
  let numAces = 0; // Initialize # of Aces before playing game.

    // Calculate total score of hand 
    hand.forEach((card) => 
    {
      // If next card in hand is an Ace, count as 1 Ace card.
      if(card.displayVal === 'Ace') 
      {
        numAces += 1;

        if(numAces === 1) 
        {
          totalScore += card.val; // Add 11 points to total for first Ace 
          if(totalScore <= 21) 
          {
            isHandSoft = true; // Hand has 1 ace valued at 11 and is not busted 
          } 
          else
          {
            isHandSoft = false; 
          }
        } 
        if(numAces >= 2 && numAces <= 4) 
        {
          totalScore += 1; // Because we want to count the first Ace as 11 and all other Aces as 1 point

          if(totalScore <= 21) 
          {
            isHandSoft = true; // Hand has 1 ace valued at 11 and is not busted 
          } 
          else
          {
            isHandSoft = false; 
          }
        }
      } 
      else 
      {
        totalScore += card.val; // Add card value to total if current card in hand is otherwise not an Ace 

        // Taking into consideration if previous cards are Aces and what the current total score is 
        if((numAces >= 1 && numAces <= 4) && totalScore <= 21)
        {
          isHandSoft = true; 
        }
        else if((numAces >=1 && numAces <= 4) && totalScore > 21)
        {
          if(isHandSoft === true) 
          {
            totalScore -= 10; // Now all aces must be valued at 1 instead of 1 of them being valued at 11 because total score exceeded 21 
            isHandSoft = false; // Hand is no longer soft, no aces are valued at 11
          }     
        }
        else
        {
          isHandSoft = false; 
        }
      }
  
    }); 
  
    
    return blackJackScore; 
};
   

/**
 * Determines whether the dealer should draw another card.
 * 
 * @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
 * @returns {boolean} whether dealer should draw another card
 */
const dealerShouldDraw = (dealerHand) => 
{
  // CREATE FUNCTION HERE
  // Get dealer's total points and see if they have a soft hand (or not)
  let dealerHandTotalPoints = calcPoints(dealerHand); 

  if(dealerHandTotalPoints.total <= 16)
  {
    return true; // Dealer must draw another card if they have 16 points or less
  }
  else if(dealerHandTotalPoints.total === 17 && dealerHandTotalPoints.isSoft === true)
  {
    return true; // Dealer must draw another card if they have 17 points AND they have a soft hand
  }
  else 
  {
    return false; // Otherwise, dealer should end their turn 
  }
}

/**
 * Determines the winner if both player and dealer stand
 * @param {number} playerScore 
 * @param {number} dealerScore 
 * @returns {string} Shows the player's score, the dealer's score, and who wins
 */
const determineWinner = (playerScore, dealerScore) => 
{
  // CREATE FUNCTION HERE
  let statement = '';
  if(playerScore === dealerScore) // If there was a tie 
  {
    statement = `Player's score: ${playerScore}  Dealer's score: ${dealerScore}  There was a tie!`
    return statement; 
  }
  else if (playerScore > dealerScore)// Player won 
  {
    statement = `Player's score: ${playerScore}  Dealer's score: ${dealerScore} Player won!`
    return statement;
  }
  else // Dealer won 
  {
    statement = `Player's score: ${playerScore}  Dealer's score: ${dealerScore} Dealer won!`
    return statement;
  }

}


// Everything below is used to run the game! 
/**
 * Creates user prompt to ask if they'd like to draw a card
 * @param {number} count 
 * @param {string} dealerCard 
 */
const getMessage = (count, dealerCard) => {
  return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
}

/**
 * Logs the player's hand to the console
 * @param {CardPlayer} player 
 */
const showHand = (player) => {
  const displayHand = player.hand.map((card) => card.displayVal);
  console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
}

/**
 * Runs Blackjack Game
 */
const startGame = function() {
  player.drawCard();
  dealer.drawCard();
  player.drawCard();
  dealer.drawCard();

  let playerScore = calcPoints(player.hand).total;
  showHand(player);
  while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
    player.drawCard();
    playerScore = calcPoints(player.hand).total;
    showHand(player);
  }
  if (playerScore > 21) {
    return 'You went over 21 - you lose!';
  }
  console.log(`Player stands at ${playerScore}`);

  let dealerScore = calcPoints(dealer.hand).total;
  while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
    dealer.drawCard();
    dealerScore = calcPoints(dealer.hand).total;
    showHand(dealer);
  }
  if (dealerScore > 21) {
    return 'Dealer went over 21 - you win!';
  }
  console.log(`Dealer stands at ${dealerScore}`);

  return determineWinner(playerScore, dealerScore);
}
console.log(startGame());