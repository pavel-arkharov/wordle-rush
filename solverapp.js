const keyboard = document.querySelector('.keyboard-container')
const mapDisplay = document.querySelector('.map-container')
const messageDisplay = document.querySelector('.message-container')

let remainingWords = [];

possibleWordsArray.forEach(elem => {
	remainingWords.push(elem);
});

/* 
*		Elements of UI section
*/	

/*		List of keys		*/

const classes = ['grey-overlay', 'yellow-overlay', 'green-overlay']

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

/*		Array of guessed words		*/

const wordRows = [
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', '']
]

/*		Function that draws	keyboard UI element	*/

keys.forEach(key => {
	const buttonElement = document.createElement('button');
	buttonElement.textContent = key;
	buttonElement.setAttribute('id', key);
	buttonElement.addEventListener('click', () => handleClick(key));
	keyboard.append(buttonElement);
})

/*		Function that draws game map		*/
let clickCount = 0;
const	toggleTile = (id) => {
	const tileElement = document.getElementById(id);
	tileElement.classList.add('flip');
	if (clickCount === classes.length || tileElement.classList.length === 2)
	{
		clickCount = 0;
	}
	const originalClasses = Array.from(tileElement.classList);

	const getClasses = () =>
		originalClasses.filter(
			(originalClass) => !classes.some((c) => c === originalClass)
		);
	const newClasses = [...getClasses(), classes[clickCount]];
	const newClassesString = newClasses.join(" ");
	tileElement.setAttribute("class", newClassesString);
	++clickCount;
} 

wordRows.forEach((row, rowIndex) => {
	const rowElement = document.createElement('div');
	rowElement.setAttribute('id', 'row-' + rowIndex);
	row.forEach((tile, tileIndex) => {
		const tileElement = document.createElement('div');
		tileElement.setAttribute('id', 'row-' + rowIndex + '-tile-' + tileIndex);
		tileElement.classList.add('tile');
		tileElement.onclick = function () { toggleTile(tileElement.id) }
		rowElement.append(tileElement);
	})
	mapDisplay.append(rowElement);
})

/*
*		Variables section.
*/

let	currentRow = 0;
let	currentTile = 0;
let isGameOver = false;
const wordle = pickedword;

/*
*		Game functions 
*/

/*		Logic for handling the click according to the button pressed on keyboard		*/

const handleClick = (key) => {
	console.log('Tile is ' + currentTile)
	console.log('Row is ' + currentRow)
	if (key === '«') {
		deleteLetter();
		if (currentTile == -1 && currentRow > 0)
		{
			currentRow--;
			currentTile = 0;
		}
		return;
	}
	if (key === 'ENTER') {
		currentTile = 0;
		currentRow++;
		return;
	}
	if (currentTile < 5 && currentRow < 6)
		addLetter(key);
}

/*		Set the current tile content equal to the letter pressed and increments the current tile by one		*/

const	addLetter = (letter) => {
	const tile = document.getElementById('row-' + currentRow + '-tile-' + currentTile);
	tile.textContent = letter
	wordRows[currentRow][currentTile] = letter;
	tile.setAttribute('data', letter);
	++currentTile;
}

/*		Removes content of previously set tile		*/

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

/*		Displays the message on the screen		*/

const	showMessage = (message) => {
	const messageElement = document.createElement('p');
	messageElement.textContent = message;
	messageDisplay.append(messageElement);
	setTimeout(() => messageDisplay.removeChild(messageElement), 5000);
}

/*		If the guess contains all 5 letter then 
*		checking the guess against the WORDL word
*		Moves to the next row and zeroth tile if no match
*		Ends the game if match		*/

const	isAllowed = (word) => {
	if (allowedWordsArray.includes(word)) {
		return true;
	} else {
		showMessage('Word is not existing');
		return false;
	}
}

const	checkRow = () => {
	const guess = wordRows[currentRow].join('');
	if (currentTile == 5 && isAllowed(guess))
	{
		flipTile();
		if (guess == wordle) {
			showMessage('A great success');
			isGameOver = true;
		} else {
			if (currentRow >= 5) {
				isGameOver = true;
				showMessage('Game over :(')
				return;
			} else {
				++currentRow;
				currentTile = 0;
			}
		}
	}
}

const	flipTile = () => {
	const	rowTiles = document.querySelector('#row-' + currentRow).childNodes;
	
	/*		Copying the wordle to a variable that will be modified
	*		in order to account for each letter only once	*/
	let		checkWordle = wordle;
	
	/*		Copying our guessed word into an array of objects
	*		assigning letter attribute to be equal to corresponding letter
	*		and color attribute default to grey		*/
	const	guess = [];
	rowTiles.forEach(tile => {
		guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
	})

	/*		Checking if the letter from object at index from guess array
	*		is present in wordle copy, assigning corresponding color to it
	*		and changing it to NULL in wordleCopy not to account for it again		*/
	guess.forEach((guess, index) => {
		if (guess.letter == wordle[index]) {
			guess.color = 'green-overlay';
			checkWordle = checkWordle.replace(guess.letter, '');
		}
	})

	guess.forEach((guess, index) => {
		if (checkWordle.includes(guess.letter) && guess.letter != wordle[index]) {
			guess.color = 'yellow-overlay';
			checkWordle = checkWordle.replace(guess.letter, '');
		}
	})

	rowTiles.forEach((tile, index) => {
		const dataLetter = tile.getAttribute('data');
		
		setTimeout(() => {
			tile.classList.add('flip');
			tile.classList.add(guess[index].color);
			addColorToKey(guess[index].letter, guess[index].color);
			
		}, 500 * index)
	})
}

const	addColorToKey = (keyLetter, color) => {
	const key = document.getElementById(keyLetter);
	key.classList.add(color);
}
