async function getDogData() {
  try {
      const API_KEY = 'live_XtbRAsVeVAjf0zVkNZRpmZae59iUdWnT7kEbwblkhkXCAgRTznznjNpWJ5ANxMv7';

      // Fetch the dog breeds
      const breedResponse = await fetch('https://api.thedogapi.com/v1/breeds', {
          headers: { 'x-api-key': API_KEY }
      });

      const breeds = await breedResponse.json();

     
      const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
      const correctBreedName = randomBreed.name;
      const breedId = randomBreed.id;
      
      const imageResponse = await fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${breedId}`, {
          headers: { 'x-api-key': API_KEY }
      });

      const imageData = await imageResponse.json();

      if (!imageData[0]?.url) {
          alert('No image available. Retrying...');
          return getDogData(); 
      }

      const imageUrl = imageData[0].url;

      const wrongBreeds = [];
      while (wrongBreeds.length < 3) {
          const randomWrongBreed = breeds[Math.floor(Math.random() * breeds.length)];
          if (
              randomWrongBreed.name !== correctBreedName &&
              !wrongBreeds.includes(randomWrongBreed.name)
          ) {
              wrongBreeds.push(randomWrongBreed.name);
          }
      }

      const options = shuffleArray([correctBreedName, ...wrongBreeds]);

      resetQuizBoxes(); //star slider code

     
      updateDogImage(imageUrl);
      updateQuizBoxes(options, correctBreedName);
  } catch (error) {
      alert('Failed to load dog data. Please check your API key or network connection.');
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function updateDogImage(imageUrl) {
  const imageElement = document.getElementById('dog-picture');
  imageElement.src = imageUrl;
  imageElement.alt = 'A picture of a dog';
}

function updateQuizBoxes(options, correctAnswer) {
  const boxes = document.querySelectorAll('.quiz-box');
  boxes.forEach((box, index) => {
      box.textContent = options[index];
      box.dataset.correct = options[index] === correctAnswer;
      box.addEventListener('click', handleAnswerClick);
  });
}

function handleAnswerClick(event) {
  const isCorrect = event.target.dataset.correct === 'true';

  const boxes = document.querySelectorAll('.quiz-box');
  boxes.forEach(box => box.removeEventListener('click', handleAnswerClick));

  if (isCorrect) {
      event.target.classList.add('correct');
      alert('Correct! You guessed the right breed.');

      setTimeout(() => {
          getDogData();
      }, 1000);
      
  } else {
      event.target.classList.add('wrong');
      alert('Wrong, try again!');
  }
}

//star slider as well here from sergio
function resetQuizBoxes() {
  const boxes = document.querySelectorAll('.quiz-box');
  boxes.forEach(box => {
      box.classList.remove('correct', 'wrong');
      box.style.backgroundColor = '';
  });
}

getDogData();


