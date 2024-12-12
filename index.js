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
/* 
async function getIncorrectDogs() {
  let incorrectDogs = await fetch(
    `https://api.thedogapi.com/v1/images/search?limit=${limitParam}`,
    {
      headers: {
        "x-api-key":
          "live_EwtozMG6f4aHbDVWyxT9ELUto8wgIXV74bjePkRZfS9KFgA6ySIrbhI9mUsA4fD3",
      },
    }
  );

  let incorrectDogsData = await incorrectDogs.json();

  incorrectDogsData.forEach((dog, index) => {
    console.log(`Dog ${index + 1}:`, dog);
  });
} */

document.addEventListener("DOMContentLoaded", () => {
  let startButton = document.getElementById("startGame");
  startButton.addEventListener("click", startGame);
});

async function startGame() {
  let imgToUpdate = document.querySelector("img");
  let correctDogObject = await getCorrectDog();
  console.log(correctDogObject);

  createButtons();

  imgToUpdate.src = correctDogObject.img;
}

function createButtons() {
  let startButton = document.getElementById("startGame");
  startButton.remove();
}
