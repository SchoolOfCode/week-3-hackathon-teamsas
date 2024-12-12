let limitParam = 3;
let breeds = 1;

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

async function getDogDescription(dogInfo){
    let dogDescription = 
}

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

    console.log(incorrectDogsData);

    // .map returns a new array

    let dogsInfoArray = incorrectDogsData.map((dog) => {
      return {
        name: dog.breeds[0].name,
      };
    });

    console.log(dogsInfoArray);
  } catch (error) {
    console.log(error);
  }
}

getIncorrectDogs();

document.addEventListener("DOMContentLoaded", () => {
  let startButton = document.getElementById("startGame");
  startButton.addEventListener("click", startGame);
});

async function startGame() {
  let imgToUpdate = document.querySelector("img");
  let correctDogObject = await getCorrectDog();
  console.log(correctDogObject);

  createButtons(correctDogObject);

  imgToUpdate.src = correctDogObject.img;
}

async function createButtons(correctDogObject) {
  let multipleChoiceArray = [];

  // Getting API info for correct dog, pushing it to array
  let correctDogName = correctDogObject.name;
  multipleChoiceArray.push(correctDogName);
  console.log(multipleChoiceArray);

  // Finding start button and removing
  let startButton = document.getElementById("startGame");
  startButton.remove();

  // Creating new buttons
  let newButton = document.createElement("button");
  newButton.innerText = correctDogName;
  document.querySelector(".buttonList").appendChild(newButton);
}
