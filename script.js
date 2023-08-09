//all of our quotes
const quotes = [
  "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
  "There is nothing more deceptive than an obvious fact.",
  "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
  "I never make exceptions. An exception disproves the rule.",
  "What one man can invent another can discover.",
  "Nothing clears up a case so much as stating it to another person.",
  "Education never ends, Watson. It is a series of lessons, with the greatest for the last.",
];
// store the list of words and the index of the word that the player is currently typing
let words = [];
let wordIndex = 0;

// the starting time of the game
let startTime = Date.now();

// page elements
const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");

document.getElementById("start").addEventListener("click", () => {
  // get a quote from the array
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  // put the quote into the array of words
  words = quote.split(" ");
  //reset the word index for tracking
  wordIndex = 0;

  //UI updates
  //Create an array of span elements so we can set a class
  const spanWords = words.map((word) => {
    return `<span>${word} </span>`;
  });
  // Convert into string and set it as innerHTML on quote display
  quoteElement.innerHTML = spanWords.join("");
  // Highlight the first word typed
  quoteElement.childNodes[0].className = "highlight";
  // Clear an old message
  messageElement.innerText = "";

  // Setup the textbox
  // Clear the textbox
  typedValueElement.value = "";
  // set the event handler

  // Start the timer
  startTime = new Date().getTime();
});

typedValueElement.addEventListener("input", () => {
  // Get the current word
  const currentWord = words[wordIndex];
  // get the current value
  const typedValue = typedValueElement.value;

  if (typedValue === words[wordIndex] && wordIndex === words.length - 1) {
    //end of sentence
    //Display success message
    const elapsedTime = new Date().getTime() - startTime;
    const message = `CONGRATULATIONS! You finished in ${
      elapsedTime / 1000
    } seconds.`;
    messageElement.innerText = message;
  } else if (typedValue.endWith(" ") && typedValue.trim() === currentWord) {
    //end of word
    //clear the typedValueElement for the new word
    typedValueElement.value = "";
    // move to the next word
    wordIndex++;
    // reset the class name for all the element in the quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = "";
    }
    // highlight the next word
    quoteElement.childNodes[wordIndex].className = "highlight";
  } else if (currentWord.startsWith(typedValue)) {
    //currently correct word
    //highlight the next word
    typedValueElement.className = "";
  } else {
    // error state
    typedValueElement.className = "error";
  }
});
