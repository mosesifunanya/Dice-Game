'use strict';

//acive player sections
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// how to get element by id using queryselector, you have toput #....
const score0El = document.querySelector('#score--0');

// how to get an element by id using getElementById, no need for # or dot
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0'); //player 1 score
const current1El = document.getElementById('current--1'); //player 2 score
// const player0El = document.getElementById('name--0');
// const player1El = document.getElementById('name--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//reset function
const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// switch players function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rooling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate the dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check for rolled dice in current score
    if (dice !== 1) {
      currentScore += dice;

      // The active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player
    scores[activePlayer] += currentScore;

    //
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if the player scores is >= 100;
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});
//reset the game
btnNew.addEventListener('click', init);
