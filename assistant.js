/*
**now it works so if you don't press help button in the first row it will not keep that data in mind when searching the second etc...
**
**test with word taste and guess with a word where the last t is present but no other t's in the word
**
**issue with some word cases that will leave array empty
**some word cases do work
*/


function	deleteAndCopyArray( array1, array2)
{
	array1.splice(0, array1.length);
		array2.forEach(elem => {
			array1.push(elem);
		});
	return array1;
};

const	analyseGuess = () => {
	let row = currentRow - 1;
	let curTile = currentTile;
	var prevLetters = "";

	const element = document.getElementById("row-" + row).childNodes;
	element.forEach(tile => {
		tile = document.getElementById("row-" + row + "-tile-" + curTile);
		const letter = tile.getAttribute('data');
		console.log(letter);
		const color = tile.getAttribute('class')[13];
		if (color == 'y')//y means the tile is gray
		{
			let filtered = [];
			// loop through array check every string if contains letter
			remainingWords.forEach( words => {
				if (!words.includes(letter))//&& !prevLetters.includes(letter))
					filtered.push(words);
			});
			remainingWords = deleteAndCopyArray(remainingWords, filtered);
			console.log(remainingWords);
		}
		else if (color == 'l')//means it is yellow
		{
			let filtered = [];
			// loop through array check every string if contains letter
			remainingWords.forEach( words => {
				if (words.includes(letter) && words[curTile] != letter)
					filtered.push(words);
			});
			remainingWords = deleteAndCopyArray(remainingWords, filtered);
			console.log(remainingWords);
		}
		else if (color == 'e')//means it is greeen
		{
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
		prevLetters = prevLetters.concat(letter);
		console.log(prevLetters);
	});
}

const	toggleAssistant = () => {
	console.log('Assistant button is pressed');
	analyseGuess();
}