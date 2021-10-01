const Deck = require('./Classes/PokerClass.js')

const deck = new Deck()
console.log("Collected the deck....");
console.log(deck.deck)
console.log("Shuffling Deck....");
deck.shuffle();
console.log('Picking 5 cards from the top of the deck')
deck.fiveCards();
console.log(deck.fiveChosen)
console.log("Determining strongest poker hand...")
deck.pokerHand(); 

