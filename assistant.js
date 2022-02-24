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

/*		copies from one string to another		*/

function	strcpyNoDublicates(correctLetters, presentLetters)
{
	let index = 0;
	if (correctLetters.length > 0)
	{
		while (index < (presentLetters.length || correctLetters.length))
		{
			let counter = amountOfLetterInStr(presentLetters, presentLetters[index]);
			if (counter === 2)
			{
				let counterCorrectList = amountOfLetterInStr(correctLetters, presentLetters[index]);
				if (counterCorrectList === 1)
					correctLetters = correctLetters.concat(presentLetters[index]);
				else if (counterCorrectList === 0)
				{
					correctLetters = correctLetters.concat(presentLetters[index]);
					correctLetters = correctLetters.concat(presentLetters[index]);
				}
			}
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

/*		removes words based on char count		*/

function	removeWordsCharCount(remainingWords, letter, count)
{
	let filtered = [];

	remainingWords.forEach( words => {
		if (words.includes(letter) && amountOfLetterInStr(words, letter) === count)
			filtered.push(words);
		});
	remainingWords = deleteAndCopyArray(remainingWords, filtered);
	return remainingWords;
}

/*		calculate which letters to remove based on color and amount of char		*/

function	removeBasedOnColor(remainingWords, correctLetters, tile, curTile)
{
	const letter = tile.getAttribute('data');
	const color = tile.getAttribute('class')[13];
	const amountOfLetters = amountOfLetterInStr(correctLetters, letter);
	if (amountOfLetters === 2)
		remainingWords = removeWordsCharCount(remainingWords, letter, amountOfLetters);
	if (color == 'y')
	{
		if (!correctLetters.includes(letter))
			remainingWords = removeWordsBasedOnLetter(remainingWords, letter);
		else
		{
			//remainingWords = removeWordsCharCount(remainingWords, letter, 1);
			remainingWords = filterCurrentPosLetters(remainingWords, letter, curTile);
		}
	}
	else if (color == 'l')
		remainingWords = filterCurrentPosLetters(remainingWords, letter, curTile);
	else if (color == 'e')
		remainingWords = keepWordsBasedOnLetter(remainingWords, letter, curTile);
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
			remainingWords = removeBasedOnColor(remainingWords, correctLetters, tile, curTile);
			curTile++;
		});
		curTile = 0;
		row++;
	}
	console.log(remainingWords);
	return remainingWords;
}

const	cleanAssistanceList = () => {
	const assistantElement = document.querySelector('.assistant-list');
	while (assistantElement.hasChildNodes()) {
		assistantElement.removeChild(assistantElement.firstChild);
	  }
}

const	showAssitanceList = (suggestions) => {
	cleanAssistanceList();
	const assistantElement = document.querySelector('.assistant-list');
	console.log(suggestions);
	if (suggestions.length <= 25)
	{
		suggestions.forEach(word => {
			const suggestionElement = document.createElement('div');
			suggestionElement.classList.add('suggestion');
			suggestionElement.textContent = word;
			assistantElement.append(suggestionElement);
			})
	} else {
		let suggestionElement = document.createElement('div');
			suggestionElement.classList.add('suggestion-solo');
			suggestionElement.textContent = 'There are many possibilities.\n Suggested word to use is: \n ';
			assistantElement.append(suggestionElement);
			suggestionElement = document.createElement('div');
			suggestionElement.classList.add('suggestion-solo');
			suggestionElement.textContent = chooseWord(suggestions);
			assistantElement.append(suggestionElement);
	}
}

function	chooseWord(remainingWords)
{
	let choosen;

	if (currentRow == 0)
		choosen = 'SLATE';
	else
	{
		if (remainingWords.length > 2 && currentRow < 3)
		{
			let j = 0;

			while (j < remainingWords.length)
			{
				let i = 0;
				while (i < 5)
				{
					if (amountOfLetterInStr(remainingWords[j], remainingWords[j][i]) === 2)
						break;
					i++;
				}
				if (i == 5)
				{
					choosen = remainingWords[j];
					break;
				}
				j++;
			};
		}
		else if (remainingWords.length === 2 || currentRow > 2)
			choosen = remainingWords[Math.floor(Math.random() * remainingWords.length)];
		else if (remainingWords.length === 1)
			choosen = remainingWords[0];
		else
			choosen = remainingWords[Math.floor(Math.random() * remainingWords.length)];
	}
	return choosen;
}

const	toggleAssistant = () => {
	console.log('Assistant button is pressed');
	var remainingWords = analyseGuess();
	showAssitanceList(remainingWords);
}

function autoClick(choosenWord) {
	let i = 0;
	while (i < 5)
	{
		document.getElementById(choosenWord[i]).click();
		i++;
	}
	document.getElementById("ENTER").click();
}

const	autoPlay = () => {
	if (isGameOver == false)
	{
		let choosenWord = chooseWord(analyseGuess());
		console.log(choosenWord);
		autoClick(choosenWord);
		setTimeout(() => { autoPlay() }, 2500);
	}
}