const Markov = require('markov-generator');
const twitter = require('twitter');
const games = require('./games');
require('dotenv').config();

const ONE_MIN = 60 * 1000;

// Instantiate the generator
const markov = new Markov({
  input: games,
  minLength: 1
});

// this is not a smart bot, it doesn't reply, just tweets every once and a while
setInterval(() => {
  const game = markov.makeChain();
  console.log(game);
}, ONE_MIN * 30)