// Setting global variables for query parameters
let limitParam = 3;
let breeds = 1;
let points = 0;

// Function to fetch info of correct dog. Returns name and image URL in an object
async function getCorrectDog() {
  try {
    let correctDog = await fetch(
      `https://api.thedogapi.com/v1/images/search?has_breeds=${breeds}`,
      {
        headers: {
          "x-api-key":
            "live_EwtozMG6f4aHbDVWyxT9ELUto8wgIXV74bjePkRZfS9KFgA6ySIrbhI9mUsA4fD3",
        },
      }
    );
    let correctDogData = await correctDog.json();
    let dogInfo = {
      name: correctDogData[0].breeds[0].name,
      img: correctDogData[0].url,
      hint: correctDogData[0].breeds[0].bred_for,
    };
    return dogInfo;
  } catch (error) {
    console.log(error);
  }
}

/* async function getDogDescription(dogInfo){
    let dogDescription = COME BACK TO THIS AND HELP SAM WITH DOGS DESCRIPTIONS
} */

// Function to fetch info of 3 incorrect dogs. Returns name in objects in reformatted array
async function getIncorrectDogs() {
  try {
    let incorrectDogs = await fetch(
      `https://api.thedogapi.com/v1/images/search?limit=${limitParam}&has_breeds=${breeds}`,
      {
        headers: {
          "x-api-key":
            "live_EwtozMG6f4aHbDVWyxT9ELUto8wgIXV74bjePkRZfS9KFgA6ySIrbhI9mUsA4fD3",
        },
      }
    );

    let incorrectDogsData = await incorrectDogs.json();

    // .map returns a new array
    let dogsInfoArray = incorrectDogsData.map((dog) => {
      return {
        name: dog.breeds[0].name,
      };
    });
    return dogsInfoArray;
  } catch (error) {
    console.log(error);
  }
}

// Event listener for starting the game when button pressed
document.addEventListener("DOMContentLoaded", () => {
  let startButton = document.getElementById("startGame");
  startButton.addEventListener("click", startGame);
});

// Logic for what happens when game is started. Image updated, buttons created
async function startGame() {


  let infoBox = document.querySelector(".infoBox");

=======
  points = 0;
  let imgToUpdate = document.querySelector("img");

  let correctDogObject = await getCorrectDog();
  console.log(correctDogObject);

  createButtons(correctDogObject);

  imgToUpdate.src = correctDogObject.img;
  // infoBox.textContent = `Hint: ${correctDogObject.name}`;
  infoBox.textContent = `Hint: ${correctDogObject.hint}`;
}

// Fisher-Yates algorithm for shuffling arrays. Found on stackoverflow, explained by chatGPT. A bit confusing
// mirrors elements and then flips them is my basic understanding of this function.
// more research needs to be done here in order to fully understand it
// ALI algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Logic for creating buttons and assigning dog breeds to them
async function createButtons(correctDogObject) {
  // Declaring empty array where choices will be stored
  let multipleChoiceArray = [];

  // Getting API info for correct dog, pushing it to array
  let correctDogName = correctDogObject.name;
  multipleChoiceArray.push(correctDogName);

  // Finding start button and removing
  let startButton = document.getElementById("startGame");

  if (startButton) {
    startButton.remove();
  }

  // Getting API info for incorrect dogs
  let incorrectDogsObject = await getIncorrectDogs();

  // Creating incorrect dog object, pushing values to array
  incorrectDogsObject.forEach((object) => {
    multipleChoiceArray.push(object.name);
  });

  // Clear buttonList div before appending new buttons
  let buttonList = document.querySelector(".buttonList");
  buttonList.innerHTML = "";

  // Shuffles the array
  shuffleArray(multipleChoiceArray);

  // Create and append buttons based on the shuffled array
  multipleChoiceArray.forEach((dogName) => {
    let button = document.createElement("button");
    button.innerText = dogName;
    button.classList.add("quiz-box");
    document.querySelector(".buttonList").appendChild(button);
  });

  console.log(multipleChoiceArray);

  // Using Ali's function and passing my own arguments
  updateQuizBoxes(multipleChoiceArray, correctDogName);
}


/// ALI's CODE

function updateQuizBoxes(options, correctAnswer) {
  const boxes = document.querySelectorAll(".quiz-box");
  boxes.forEach((box, index) => {
    box.textContent = options[index];
    box.dataset.correct = options[index] === correctAnswer;
    box.addEventListener("click", handleAnswerClick);
  });
}

function handleAnswerClick(event) {
  const isCorrect = event.target.dataset.correct === "true";

  const boxes = document.querySelectorAll(".quiz-box");
  boxes.forEach((box) => box.removeEventListener("click", handleAnswerClick));

  if (isCorrect) {
    event.target.classList.add("correct");
    points++;
    document.getElementById("points").innerHTML = "Points:" + points;
    setTimeout(() => {
      nextLevel();
    }, 1000);
  } else {
    event.target.classList.add("wrong");
    points = 0;
    setTimeout(() => {
      resetGame();
    }, 1000);
  }
}

function resetQuizBoxes() {
  const boxes = document.querySelectorAll(".quiz-box");
  boxes.forEach((box) => {
    box.classList.remove("correct", "wrong");
    box.style.backgroundColor = "";
  });
}

function resetGame() {
  document.getElementById("points").innerHTML = "Points: " + points;
  let buttonList = document.querySelector(".buttonList");
  buttonList.innerHTML = "";

  let imgElement = document.querySelector("img");
  imgElement.src = "dog_default.jpg";

  // Chat GPT suggestion. Very clever way of restarting the game, by putting the start game button back with its original ID and event listener, which invokes start game again
  if (!document.getElementById("startGame")) {
    let startButton = document.createElement("button");
    startButton.id = "startGame";
    startButton.textContent = "Start Game";
    startButton.addEventListener("click", startGame);
    buttonList.appendChild(startButton);
  }
  resetQuizBoxes();
}

async function nextLevel() {
  let imgToUpdate = document.querySelector("img");
  let corredtDogObject = await getCorrectDog();

  createButtons(corredtDogObject);

  imgToUpdate.src = corredtDogObject.img;
}

// CHATGPT pointers:

/* 
Separation of concern - Logic for fetching data, updating the UI, and handling game flow is mixed in a few places such as the startGame function. Consider modularizing? code better.

Be aware of using await inside loops, as forEach doesn't support asynchronous operations.
Fine for smaller cases, but will struggle to scale.

Error handling - Consider providing user feedback in case of error message

Restart button?

Hard to scale with current structure, but works well for 4 answer quizes. 
Same principle as when I did the 1-10 algorithm problem

State management - Which button is correct, which button was clicked. What happens
in even of correct / incorrect answers. Ties in to Ali code.*/

