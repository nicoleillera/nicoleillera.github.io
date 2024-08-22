//////////////////////////////////////////////////////
///                                                ///
///                  FCNY UNIT 5                   ///
///                                                ///
///              TEXT ADVENTURE GAME               ///
///                                                ///
//////////////////////////////////////////////////////

// We use an Object here to keep track of all our messages in one easy to access place. You can use a different method if you like.
const messages = {
  A: 'Will you be the parent your daughter always wanted or will you dissapoint her yet again?',
  B1: "Quick! Your daugther is going to be home from school in 2 hours and you haven't started preparing her birthday dinner.",
  B2: "So you're giving up? How do you even sleep at night?", //to be continued..
  C: 'Oh no! Your bandeja paisa is missing three ingredients: plantain, avocado, and sausage. Shall we go shopping?',
  D: "After 20 minutes, you've finally arrived at your local supermarket.",
  E: 'You\'ve found the plantains! Do you want to "buy now" or "keep looking"?',
  F: "You've wasted 10 minutes walking around the store just to end up grabbing the plantains you were already looking at before.",
  G: "You've reached the avocados but AHH!! they're not ripe. Do you want to “buy firm avocados” or “go to another store”? (Choose wisely… this is your daughters favorite part of the meal.)",
  G1: 'Shame on you... but ok fine keep going.',
  G2: 'You wasted 30 minutes checking out and getting to the next store.',
  H: 'Look who finally made it to the meat aisle! Are you grabbing the "jimmy dean" or "hillshire farms" pack?',
  H1: 'Yay! You made it home in time and your daugther loved her meal! ~ Congrats on doing the bare minimum ~',
  H2: "Oh no! Time's up! You only have an hour left and can't make your daughters dinner in time. She'll never look at you the same. Click OK to play again.",
  H3: 'Yikes! The sausage gave your daughter food poisoning and she threw up all night. You lose.',
};

let time = 120;

function beginGame() {
  // 'confirm' shows a message and waits for the user to press “OK” or “CANCEL”. It returns true for OK and false for CANCEL/Esc.
  const response = confirm(messages.A);
  if (response) {
    // 'alert' shows a message.
    alert(messages.B1);
    nextQuestion();
  } else {
    alert(messages.B2);
  }
}

function nextQuestion() {
  // 'prompt' shows a message asking the user to input text. It returns the text or, if CANCEL or Esc is clicked, null.
  const response = confirm(messages.C);
  if (response) {
    //decrement time over here | let time -= 20; (100)
    time -= 20;
    alert(messages.D);
    firstIngredient();
  } else {
    alert(messages.B2);
    beginGame();
  }
}

function firstIngredient() {
  const response = prompt(messages.E);
  if (response === 'buy now') {
    secondIngredient();
  } else if (response === 'keep looking') {
    //decrement time over here | let time -= 10; (90)
    time -= 10;
    alert(messages.F);
    secondIngredient();
  }
}
function secondIngredient() {
  const response = prompt(messages.G);
  if (response === 'buy firm avocados') {
    alert(messages.G1);
    thirdIngredient();
  } else if (response === 'go to another store') {
    //decrement time over here | let time -= 30; (60)
    time -= 30;
    alert(messages.G2);
    //create nested if statmement and check if time <= 60 ... lose (create lose alert and restart game) || if time is > 60 continue to G2
    if (time > 60) {
      thirdIngredient();
    } else if (time <= 60) {
      const res = confirm(messages.H2);
      if (res) {
        beginGame();
      } else {
        alert(messages.B2);
      }
    }
  }
}

function thirdIngredient() {
  const response = prompt(messages.H);
  if (response === 'jimmy dean') {
    // && time is still not running out
    alert(messages.H1);
  } else if (response === 'hillshire farms') {
    alert(messages.H3); //automatic fail
  }
}
