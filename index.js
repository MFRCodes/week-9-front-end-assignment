class Card {
  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
  }
}
// Declared a class named "Card". I used the constructor method as my function with "suit", "rank", and "value" as my parameters.
// In lines 3-5, the values of the parameters are given to the property of the class named "Card".

class Player {
  constructor(name, hand) {
    this.name = name;
    this.score = 0;
    this.hand = hand;
  }
}
// Declared a class named "Player". I used the constructor method as my function with "name" and "hand" as my parameters.
// In lines 13-15, the values of the parameters are given to the property of the class named "Player".

class Deck {
  constructor() {
    this.deck = [];
    this.players = [];
    this.initDeck();
  }

// Declared a class named "Deck". I used the constructor method as my function.
// In lines 23-25, the values of the parameters are given to the property of the class named "Deck".

  initDeck() {
    const suits = ['Diamonds', 'Hearts', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    for (const suit of suits) {
      for (let i = 0; i < ranks.length; i++) {
        this.deck.push(new Card(suit, ranks[i], i));
      }
    }

    // I created an array named "suits" with the typical suits in a deck of cards. I then created an array named
    // "ranks", with the typical ranks in a deck of cards. In line 35, the loop iterates the "suits" array. 
    // In line 36, the loop iterates the "ranks" array. and, on line 37, the new cards are added to the array named "deck" .


    // I borrowed the below code from here https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
    for (let i = this.deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = temp;
    }

    // Lines 47-52 is what allows the cards to be shuffled. Here, the Fisher-Yates shuffle method is used. The for loop iterates 
    // the things inside the array named "deck". Inside the index named "i", an element from the array named "deck" is kept temporarily.
    // Inside of the "deck" array, the elements at indexes "i" and "j" are switched. The same type of switch happens on line 51.

    for (let x = 0; x < 2; x++) {
      let hand = this.deck.splice(0, 26);
      let player = new Player(`Player ${x+1}`, hand);
      this.players.push(player);
    }
  }

  // In lines 58-63, a for loop runs two times until "x" is no longer less than 2. "Hand" is declared as a variable. It's given an 
  // array with 26 elements in it. The splice part of the "deck" array, gets rid of elements from it and brings them back belonging
  // to the "hand" variable. A variable named "player" is declared and so is a class named "Player". The variable named "hands"
  // goes through the array as an argument. The object named "player" is added to the array named "players".

  playEachRound() {
    const firstcard = this.players[0].hand.pop();
    const secondcard = this.players[1].hand.pop();

    if (firstcard.value > secondcard.value) {
      this.players[0].score++;
    } else if (firstcard.value < secondcard.value) {
      this.players[1].score++;
    }
  }

  // On line 71, the first player loses the last card and it's given to the variable named "firstcard". On line 72,
  // the second player loses the last card and it's given to the variable named "secondcard". On lines 74-75, if the first
  // card is worth more than the second card, the score of the first player will be increased by 1. On lines 76-77, if the first card
  // is less than the second card, the score of the second player is increased by 1. 

  playTheGame() {
    for (let i = 0; i < 26; i++) {
      if (this.players[0].hand.length === 0 || this.players[1].hand.length === 0) {
        break; 
      }
      this.playEachRound();
    }
  }

  // On lines 86-93, a for loop is used to give the game 26 rounds. An if statement is used with a break statement to make sure
  // that each player always has a card. 

  endGame() {
    if (this.players[0].hand.length > this.players[1].hand.length) {
      console.log(`${this.players[0].name} is the winner`);
    } else if (this.players[0].hand.length < this.players[1].hand.length) {
      console.log(`${this.players[1].name} is the winner`);
    } else {
      console.log("It's a tie!");
    }
  }
}

// On lines 99-100, if the first player has more cards than the second player, they will be declared the winner. 
// On lines 101-102, if the first player has less cards than the second player, the second player will be the winner.
// on lines 103-104, if both players have the same amount of cards, the game will be tied. 

const game = new Deck();
game.playTheGame();
console.log("Score of first player is", game.players[0].score);
console.log("Score of second player is", game.players[1].score);
game.endGame();

// On lines 113-114, the game is initiated. Lines 115-116 display the scores of each player once the game is played. 
// Line 117, uses the method named "endGame" to figure out the winner.