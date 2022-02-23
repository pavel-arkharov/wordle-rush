
const keyboard = document.querySelector('.keyboard-container')
const mapDisplay = document.querySelector('.map-container')
const messageDisplay = document.querySelector('.message-container')


const keys = [
	'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
]

const wordRows = [
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', '']
]

let	currentRow = 0;
let	currentTile = 0;
let isGameOver = false;

const handleClick = (key) => {
	console.log('clicked', key);
	if (key === '«') {
		console.log('delete letter');
		deleteLetter();
		return;
	}
	if (key === 'ENTER') {
		console.log('check row');
		checkRow();
		return;
	}
	if (currentTile < 5 && currentRow < 6)
		addLetter(key);
}

const	addLetter = (letter) => {
	const tile = document.getElementById('row-' + currentRow + '-tile-' + currentTile);
	tile.textContent = letter
	wordRows[currentRow][currentTile] = letter;
	tile.setAttribute('data', letter);
	++currentTile;
}

const	deleteLetter = () => {
	if (currentTile > 0)
	{	
		--currentTile;
		tile = document.getElementById('row-' + currentRow + '-tile-' + currentTile);
		tile.textContent = '';
		wordRows[currentRow][currentTile] = '';
		tile.setAttribute('data', '');
	}
}

const	checkRow = () => {
	const guess = wordRows[currentRow].join('');
	if (currentTile == 5)
	{
		if (guess == wordle) {
			showMessage('A great success');
			isGameOver = true;
		} else {
			if (currentRow >= 5) {
				isGameOver = true;
				return;
			} else {
				++currentRow;
				currentTile = 0;
			}
		}
		// console.log('Guess is ' + guess);
	}
}

const	showMessage = (message) => {
	const messageElement = document.createElement('p');
	messageElement.textContent = message;
	messageDisplay.append(messageElement);
	setTimeout(() => messageDisplay.removeChild(messageElement), 2000);
}

keys.forEach(key => {
	const buttonElement = document.createElement('button');
	buttonElement.textContent = key;
	buttonElement.setAttribute('id', key);
	buttonElement.addEventListener('click', () => handleClick(key));
	keyboard.append(buttonElement);
})

wordRows.forEach((row, rowIndex) => {
	const rowElement = document.createElement('div');
	rowElement.setAttribute('id', 'row-' + rowIndex);
	row.forEach((tile, tileIndex) => {
		const tileElement = document.createElement('div');
		tileElement.setAttribute('id', 'row-' + rowIndex + '-tile-' + tileIndex);
		tileElement.classList.add('tile');
		rowElement.append(tileElement);
	})
	mapDisplay.append(rowElement);
})




// stores allowed_words.txt in array (words are defined by '\n')
axios.get('allowed_words.txt').then(function(response) {
	let number = Math.floor(Math.random() * 12972) - 1;
	console.log(number);
	//\n is counted as one char 6
	let correct_word = JSON.stringify(response.data);
	/*var splitting = correct_word.split("\n");
	console.log(splitting[0]);*/
	let tempArray = correct_word.split("\n");
	let arr = [];
	let i = 0;
	while (i < (12972 - 1))
	{
		arr[i] = tempArray[i];
	}
	console.log(arr);
});
	//let number = Math.floor(Math.random() * 5);
	//console.log(number);
	//console.log(response.data);
	//var correct_word = JSON.stringify(response.data[0]);
	//console.log(correct_word);
	//console.log(JSON.stringify(result.data)));
/*let fs = require('fs')
const readFileLines = filename =>
	fs.readFileSync(filename)
	.toString('UTF8')
	.split('\n');

let arr = readFileLines('allowed_words.txt');
*/
/*axios.get('allowed_words.txt').then(function(response) {
	let number = Math.floor(Math.random() * 5);
	console.log(number);
	var correct_word = JSON.stringify(response.data[0]);

console.log(correct_word);

	
})*/
/*[Math.floor(Math.random() * 5)]
<script src="https://requirejs.org/docs/release/2.3.5/minified/require.js"></script>
var fs = require("fs");
var text = fs.readFileSync("allowed_words.txt", 'utf-8');
var textByLine = text.split("\n")
*/
// select random word from allowed word list for user to guess
/*const correct_word = allowed_words[Math.floor(Math.random() * allowed_words.length)];

console.log(correct_word);
*/
/*
let row = 0;
let i = 0;
var word;
if (keys == "ENTER")// don't know how to grab "enter" if clicked
{
	while (i < 5)
	{
		if (wordRows[0][i] == '')// break if length of rows aren't 5
		{
			console.log('error');
			i = -1;
		}
		else
		{
			wordwordRows[0][i];
		}
		i++;
	}
	if (i == -1)
		break;
	// store the word the person is quessing in a string for easier compare
	// check if solution is in allowed_words
	
}
if "enter" is pressed
	check if word length is 5
		if not display error message
	check if word is in allowed_words
	if it is in allowed words
		increase row number
		make a loop that first compares each letter with all the letters in the correct word
			if the letter is matching with any of the correct words letter (regardless of position)
				make letter yellow
			if the letters position is the same as in the correct word
				make letter green
			else
				make gray
	if it's not in allowed words
		display error message
*/
