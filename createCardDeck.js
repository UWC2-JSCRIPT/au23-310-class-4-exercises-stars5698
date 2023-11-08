// Donna Quach, JavaScript 310B, Autumn 2023
// Class 4 Exercises 

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

// CHECKS
const myDeck = getDeck(); 

console.log(`Deck length equals 52? ${deck.length === 52}`); 

const randomCard = deck[Math.floor(Math.random() * 52)]; 

const cardHasVal =
   randomCard && randomCard.val && typeof randomCard.val === 'number'
 console.log(`Random card has val? ${cardHasVal}`); 

const cardHasSuit =
   randomCard && randomCard.suit && typeof randomCard.suit === 'string'
 console.log(`Random card has suit? ${cardHasSuit}`); 

 const cardHasDisplayVal =
   randomCard &&
   randomCard.displayVal &&
   typeof randomCard.displayVal === 'string'
 console.log(`Random card has display value? ${cardHasDisplayVal}`); 
