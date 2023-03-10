This game:
Display the map with the zoom in & out button.
Display round 1: display the word Amsterdam: display User score: 1500 (json +1)
Display the pin for User.
User grab the pin and mark on the map.
Calculate the distance between mark and the actual location.
If difference is =<50 User win round 1! 
User click submit (we get the position).
Update User score (if difference = 20, eg: User score = 1500 - 20).
If User score => 0 , bring to the GameOver page. Click play again. 
Then next button is enabled to proceed to the next round. (now next button is always there).
Display round 2: display the word Rome: display User updated score.
If User completed the 9 rounds, bring to Win page. Click play again.


Rules:
Number of rounds = Number of cities (9 cities & rounds).
If User score = 0 = end game.
If there's no more cities to guess = end game.
Display User score and the number of cities correctly guessed. 


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
