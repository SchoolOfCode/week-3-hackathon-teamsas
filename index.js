// Setting global variables for query parameters
let limitParam = 3;
let breeds = 1;

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
  let imgToUpdate = document.querySelector("img");
  let correctDogObject = await getCorrectDog();
  console.log(correctDogObject);

  createButtons(correctDogObject);

  imgToUpdate.src = correctDogObject.img;
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
  startButton.remove();

  // Creating correct button
  let newButton = document.createElement("button");
  newButton.innerText = correctDogName;
  document.querySelector(".buttonList").appendChild(newButton);

  // Getting API info for incorrect dogs
  let incorrectDogsObject = await getIncorrectDogs();

  // Creating incorrect buttons, assigning values to buttons, pushing values to array
  incorrectDogsObject.forEach((object) => {
    let incorrectButton = document.createElement("button");
    incorrectButton.innerText = object.name;
    document.querySelector(".buttonList").appendChild(incorrectButton);
    multipleChoiceArray.push(object.name);
  });

  console.log(multipleChoiceArray);
}
