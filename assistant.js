/*		ASSISTANT		*/
/*		copies array		*/

function	deleteAndCopyArray( array1, array2 )
{
	array1.splice(0, array1.length);
		array2.forEach(elem => {
			array1.push(elem);
		});
	return array1;
};

/*		copies from one string to another		*/

function	strcpyNoDublicates(correctLetters, presentLetters)
{
	let index = 0;
	if (correctLetters.length > 0)
	{
		while (index < (presentLetters.length || correctLetters.length))
		{
			if (!correctLetters.includes(presentLetters[index]))
			{
				correctLetters = correctLetters.concat(presentLetters[index]);
				index = 0;
			}
			else
				index++;
		}
	}
	else
		correctLetters = presentLetters.slice();
	return correctLetters;
}

/*		makes a string containing all correctly guessed words up until this point		*/

function	collectCorrectLetters( row, currentRow, curTile )
{
	var correctLetters = "";

	while (row < currentRow)
	{
		var presentLetters = "";
		const checkCorrectLetters = document.getElementById("row-" + row).childNodes;
		checkCorrectLetters.forEach(tile => {
			tile = document.getElementById("row-" + row + "-tile-" + curTile);
			const letter = tile.getAttribute('data');
			const color = tile.getAttribute('class')[13];
			if (color == 'l' || color == 'e')
				presentLetters = presentLetters.concat(letter);
			curTile++;
		});
		correctLetters = strcpyNoDublicates(correctLetters, presentLetters);
		curTile = 0;
		row++;
	}
	return (correctLetters);
}

/*		if tile is yellow it removes all words containing the letter at the current position		*/

function	filterCurrentPosLetters(remainingWords, letter, curTile)
{
	let filtered = [];

	remainingWords.forEach( words => {
		if (words.includes(letter) && words[curTile] != letter)
			filtered.push(words);
	});
	remainingWords = deleteAndCopyArray(remainingWords, filtered);
	return remainingWords;
}

/*		if tile is grey it removes all words containing the letter		*/

function	removeWordsBasedOnLetter(remainingWords, letter)
{
	let filtered = [];

	remainingWords.forEach( words => {
		if (!words.includes(letter))
			filtered.push(words);
		});
	remainingWords = deleteAndCopyArray(remainingWords, filtered);
	return remainingWords;
}

/*		if tile is green it keeps all words containing the letter		*/

function	keepWordsBasedOnLetter(remainingWords, letter, curTile)
{
	let filtered = [];

	remainingWords.forEach( words => {
		if (words.includes(letter) && words[curTile] == letter)
			filtered.push(words);
		});
	remainingWords = deleteAndCopyArray(remainingWords, filtered);
	return remainingWords;
}

/*		count amount of times letter is occuring in str		*/

function	amountOfLetterInStr(correctLetters, letter)
{
	var i = 0;
	var count = 0;

	while (i < correctLetters.length)
	{
		if (correctLetters[i] == letter)
			count++;
		i++;
	}
	return (count);
}

/*		removes words based on char count		*/

function	removeWordsCharCount(remainingWords, letter)
{
	let filtered = [];

	remainingWords.forEach( words => {
		if (words.includes(letter) && amountOfLetterInStr(words, letter) == 2)
			filtered.push(words);
		});
	remainingWords = deleteAndCopyArray(remainingWords, filtered);
	return remainingWords;
}

/*		analyse all guesses made		*/

const	analyseGuess = () => {
	let row = 0;
	let curTile = currentTile;
	var correctLetters = collectCorrectLetters( row, currentRow, curTile )
	console.log(correctLetters);

	while (row < currentRow)
	{
		const element = document.getElementById("row-" + row).childNodes;
		element.forEach(tile => {
			tile = document.getElementById("row-" + row + "-tile-" + curTile);
			const letter = tile.getAttribute('data');
			console.log(letter);
			const color = tile.getAttribute('class')[13];
			if (amountOfLetterInStr(correctLetters, letter) === 2)
				remainingWords = removeWordsCharCount(remainingWords, letter);
			if (color == 'y')
			{
				if (!correctLetters.includes(letter))
					remainingWords = removeWordsBasedOnLetter(remainingWords, letter);
				else
					remainingWords = filterCurrentPosLetters(remainingWords, letter, curTile);
			}
			else if (color == 'l')
				remainingWords = filterCurrentPosLetters(remainingWords, letter, curTile);
			else if (color == 'e')
				remainingWords = keepWordsBasedOnLetter(remainingWords, letter, curTile);
			console.log(remainingWords);
			curTile++;
		});
		curTile = 0;
		row++;
	}
}

const	toggleAssistant = () => {
	console.log('Assistant button is pressed');
	analyseGuess();
}