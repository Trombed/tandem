# [Live Site](https://eric-tandem-quiz.herokuapp.com/)

## Installation
This project is built with Create-React-App to install please have npm installed locally.

1. Clone the repository. ```git clone https://github.com/Trombed/tandem.git```
2. run ```npm install``` to install dependencies for the app.
3. run ```npm start``` to the app
4. Open ```http://localhost:3000/``` in browser to play.


## Issues
11/01 - I was able to fix the useEffect dependencies error by using useCallback.

One issue that I ran into and still trying to solve is the dependency array inside useEffect. As I am trying to update a state after a particular rerender, useEffect calls a function which depends on a function which updates states and depends on props from parent component.  People have suggested to ignore this by adding eslint-disable but this might not be good practice. 

## Additional Features To Do
I would like to put in more CSS animations, especially in the game over screen. My idea was to put in extra animations if the users perfect the quiz. 

A custom quiz editor would be nice also, perhaps lets user upload a text file to convert it into a custom quiz generator.

Lastly I would give a bit more time on the CSS to make this more mobile friendly.
