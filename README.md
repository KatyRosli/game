# 🌎 Europe Map Tournament!

- A responsive game map.

- Game Rules: 
- Number of rounds = Number of cities (9 cities & rounds).
- If User score = 0 = end game.
- If there's no more cities to guess = end game.
- Display User score and the number of cities correctly guessed. 

- Features: 
- A map with the zoom in & out button.
- A pin for Users to drag and drop on the map.
- 9 Rounds, 9 City Names to guess the location on the map.
- Scoring system: the different between the pin and the actual city location.
- Regardless of win or lose, Users get to play again to beat the current score!

- GAME ON!

# Live Demo:
[Live Demo Link] (https://chimerical-meringue-763758.netlify.app/)

- Here's a list of improvements & future features to develop the game:
- Sign In & Login (useAuth).
- Multiple Players.
- Timer.
- Scoring board across multiple players.
- Keep track of all the scores in the game for every player (eg: last week's best score vs 
  this  week's best score).
- Multiple tournament (eg: Asian Map Tournament).
- Branding & UI (include branding and look of the game itself).
- Light & Dark Mode (Tailwind, making it easy to read & keep track, no need to read from scss or css file).

- Here's a list of improvements for the Tech stack:
- Test coverage.
- Use company wide styling for the Design system.
- When the project goes bigger (more features) look at how to improve the data flow using redux.
- Create API (to make the rounds and cities more dynamic).
- Translation for the UI tech (to make it globally accessible).
- Move logic from GameMap to Tournament so that GameMap component is only concerned with pinPosition instead of calculating score and correct city list etc. e.g. using useMemo or useCallback in useEffect with dependencies containing the states.

# Built with 🛠️:
FRONTEND:
- React
- TypeScript
- HTML
- SCSS
- Figma

## Available Scripts:
In the project directory, you can run:
`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
`npm test`

# Author:
👩 **Katy Rosli**
- GitHub: [@KatyRosli](https://github.com/KatyRosli)

# Show your support:
Give a ⭐️ if you like this project!

Thank you!
