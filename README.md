# Wordle 

Wordle Rush is a game where you have to guess a secret word by trying different words and getting feedback on which letters are correct and in the correct position.

## Table of Contents

-   [Introduction](#Introduction)
-   [Getting Started](#GettingStarted)
-   [Gameplay](#Gameplay)
-   [Features](#Features)
-   [Technologies Used](#TechnologiesUsed)
-   [Contributing](#Contributing)
-   [License](#License)

## Introduction

`Wordle` game was created as part of studies in Hive Helsinki 42 school. The aim of this rush project is to recreate a popular  `Wordle` game in just 48 hours. In this game, you have to guess a secret word by trying different words and getting feedback on which letters are correct and in the correct position. The game is written in vanilla JavaScript.

## Getting Started

You can access `Wordle` game hosted on GitHub Pages [here](https://pavel-arkharov.github.io/wordle-rush/)

#### Running game on your computer 

If you wish to run game locally, you will need to clone the repository onto your machine:
```
git clone https://github.com/pavel-arkharov/wordle-rush.git
```

Once you have cloned the repository, you can start playing the game by starting the live local server via [VSCode extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) and accessing the game by clicking 'Go Live' button on the bottom status bar of the IDE. Default address is `http://127.0.0.1:5500/`

## Gameplay

When you start the game, you will see a secret word represented by a row of dashes. Your goal is to guess the secret word by entering words that you think might match.

Each time you enter a word, the game will give you feedback on which letters are correct and in the correct position, and which letters are correct but in the wrong position. You can use this feedback to narrow down your guesses and eventually guess the secret word.

You have a limited number of guesses, so you need to be strategic in your approach to guessing the secret word.

## Features
### Assistant
By clicking `Assistant` button you can see number of possible words according to the current situation on the board, and the most efficient word suggestion. You may click `Input word` to automatically insert the word on the board, or click `Show list` to see the complete list of possible words. 
### Auto-play 
`Auto-play` button will giive the control over the game to the program, that will use embedded Assistant to guess the word. You may initiate auto-play at any point of the game. It consistently wins when pressed in the first two rounds. 
### Solver
Special mode designed to assist in playing original New York Times' Wordle game is accessible through the `Solver` tab. In it you may manually input the situation that you encountered in the real Wordle and set the grey/yellow/green boxes around the letters by clicking on them. Then you initiate `Assistant` to get the best possible word, recieve the feedback from original game, and manually add it to our board again.  

## Technologies Used

The `Wordle Rush` game is written in vanilla JavaScript. 

## Contributing

If you find a bug or would like to contribute to this project, please feel free to submit a pull request or open an issue on the GitHub repository.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
