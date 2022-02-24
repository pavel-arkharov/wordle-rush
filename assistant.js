/*
**now it works so if you don't press help button in the first row it will not keep that data in mind when searching the second etc...
**
**test with word taste and guess with a word where the last t is present but no other t's in the word
**
**issue with some word cases that will leave array empty
**some word cases do work
*/


function	deleteAndCopyArray( array1, array2 )
{
	array1.splice(0, array1.length);
		array2.forEach(elem => {
			array1.push(elem);
		});
	return array1;
};

var	sortAlphabetical = function(text) {
	return text.split('').sort().join('');
}

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
			console.log(letter);
			const color = tile.getAttribute('class')[13];
			if (color == 'l' || color == 'e')
				presentLetters = presentLetters.concat(letter);
			curTile++;
		});
		console.log(correctLetters);
		sortAlphabetical(presentLetters);
		console.log(correctLetters);
		let index = 0;
		if (correctLetters.length > 0)
		{
			while (index < (presentLetters.length || correctLetters.length))
			{
				if (!correctLetters.includes(presentLetters[index]))
				{
					correctLetters = correctLetters.concat(presentLetters[index]);
					sortAlphabetical(correctLetters);
					index = 0;
				}
				else
					index++;
			}
		}
		else
			correctLetters = presentLetters.slice();
		curTile = 0;
		row++;
		console.log(correctLetters);
	}
	return (correctLetters);
}

function	amountOfCharInString(correctLetters, letter)
{
	var i = 0;
	var count = 0;

	while (i < correctLetters.length)
	{
		if (correctLetters[i] === letter)
			count++;
		i++;
	}
	return count;
}

function	filterCurrentPosLetters(remainingWords, letter, curTile)
{
	let filtered = [];
	// loop through array check every string if contains letter
	remainingWords.forEach( words => {
		if (words.includes(letter) && words[curTile] != letter)
			filtered.push(words);
	});
	remainingWords = deleteAndCopyArray(remainingWords, filtered);
	console.log(remainingWords);
	return remainingWords;
}

const	analyseGuess = () => {
	let row = 0;
	let curTile = currentTile;
	var correctLetters = collectCorrectLetters( row, currentRow, curTile )

	while (row < currentRow)
	{
		const element = document.getElementById("row-" + row).childNodes;
		element.forEach(tile => {
			tile = document.getElementById("row-" + row + "-tile-" + curTile);
			const letter = tile.getAttribute('data');
			console.log(letter);
			const color = tile.getAttribute('class')[13];
			if (color == 'y')//y means the tile is gray
			{
				if (!correctLetters.includes(letter))
				{
					let filtered = [];
					// loop through array check every string if contains letter
					remainingWords.forEach( words => {
						if (!words.includes(letter))
							filtered.push(words);
					});
					remainingWords = deleteAndCopyArray(remainingWords, filtered);
				}
				else
				{
					var count = amountOfCharInString(correctLetters, letter)
					// if one gray letter and one green letter or yellow. know that there are only one letter in total and should delete all words containing more than one of these letters
					if (count == 1)
					{
						remainingWords = filterCurrentPosLetters(remainingWords, letter, curTile);
					}
				}
				console.log(remainingWords);
			}
			else if (color == 'l')//means it is yellow
				remainingWords = filterCurrentPosLetters(remainingWords, letter, curTile);
			else if (color == 'e')//means it is greeen
			{
				//correctLetters = correctLetters.concat(letter);
				//console.log(correctLetters);
				let filtered = [];
				// loop through array check every string if contains letter
				remainingWords.forEach( words => {
					if (words.includes(letter) && words[curTile] == letter)
						filtered.push(words);
				});
				remainingWords = deleteAndCopyArray(remainingWords, filtered);
				console.log(remainingWords);
			}
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