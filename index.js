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
    console.log(correctDogData);
    let dogInfo = {
      name: correctDogData[0].breeds[0].name,
    };
    return correctDog;
  } catch (error) {
    console.log(error);
  }
}
getCorrectDog();
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

/* async function startGame() {
  let correctDog = await getCorrectDog();
    let correctDogPic = await correctDog[0].breeds[0].name; 
    console.log(correctDog[0]?.breeds[0]?.name); 
  console.log(correctDog[0]);
} */
