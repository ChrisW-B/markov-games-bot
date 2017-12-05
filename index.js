const Markov = require('markov-generator');
const Twitter = require('twitter');
const games = require('./games');
require('dotenv').config();

const ONE_MIN = 60 * 1000;
const isProduction = () => process.env.NODE_ENV === 'production';
const interval = isProduction() ? ONE_MIN * 30 : 1000;

// initiate twitter
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Instantiate the generator
const markov = new Markov({
  input: games,
  minLength: 2
});

// try to send the tweet, log the failure
const makeTweet = async () => {
  const game = markov.makeChain();
  try {
    console.log(game);
    if (isProduction()) {
      const tweet = await client.post('statuses/update', { status: game });
    }
  } catch (e) {
    console.log(e);
  }
}

makeTweet(); // run on restart, just to check for errors
setInterval(makeTweet, interval) // every half hour