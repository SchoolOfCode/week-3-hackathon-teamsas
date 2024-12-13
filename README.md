# 🌐 Fetch-athon

A hands-on exercise to practice working with APIs and DOM manipulation.

## 📋 Overview

In this project, you'll build a web page that fetches and displays data from a public API. This task will strengthen your skills in:
- Working with the `fetch()` API
- Handling asynchronous operations
- DOM manipulation
- Basic error handling

## 🚀 Getting Started

### Step 1: Choose Your API

Select a free public API that you can access without authentication. Here are some popular options:

- [PokéAPI](https://pokeapi.co/) - Comprehensive Pokémon data
- [Open Trivia DB](https://opentdb.com/api_config.php) - Quiz questions across various categories
- [Free Dictionary API](https://dictionaryapi.dev/) - Word definitions and pronunciations
- [icanhazdadjoke](https://icanhazdadjoke.com/api) - Random dad jokes
- [Dog CEO](https://dog.ceo/dog-api/) - Random dog images
- [NumbersAPI](http://numbersapi.com/) - Interesting facts about numbers

Browse even more options [on this public API list](https://github.com/public-apis/public-apis), or search for your own.

### Step 2: Verify API Access

Before diving into development:
1. Review the API documentation thoroughly
2. Test the API endpoint in your browser or using tools like Thunder Client/Postman
3. Confirm the data structure matches your needs
4. If the API requires authentication, choose a different one - it's easier to switch now than later

### Step 3: Build Your Application

#### Planning Phase
1. Define your core features
2. Sketch a basic UI layout
3. Identify which data points you'll display

#### Development Phase
1. Set up your project structure
2. Implement the fetch request:
   ```javascript
   async function fetchData() {
     try {
       const response = await fetch('your-api-endpoint');
       if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }
       const data = await response.json();
       // Handle your data
       return data;
     } catch (error) {
       console.error('Error fetching data:', error);
       // Handle any errors
     }
   }
   ```
3. Create DOM elements to display the data
4. Add error handling and loading states

## 💡 Tips for Success

- Start simple: First get the data logging to console before building the UI
- Break down the task into smaller, manageable steps
- Use semantic HTML for better accessibility
- Add basic CSS styling for a professional look
- Test your error handling by intentionally causing failures
- Consider using try/catch blocks to handle potential errors gracefully

## 🎯 Success Criteria

Your project should:
- Successfully fetch data from your chosen API
- Display the data in a clear, organized manner
- Handle potential errors gracefully
- Include basic styling for visual appeal
- Be responsive and user-friendly

## 🔍 Testing

Before submitting, verify that your application:
- Works in different browsers
- Handles network errors appropriately
- Displays loading states while fetching data
- Presents data in a readable format
- Properly handles API rate limits and error responses

## 📚 Resources

- [MDN Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JavaScript DOM Manipulation Guide](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)
- [Async/Await Syntax](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)

## 🤝 Contributing

Feel free to fork this repository and submit pull requests with improvements or bug fixes.
