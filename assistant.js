const	analyseGuess = () => {
	let remainingWords = [];

	possibleWordsArray.forEach(elem => {
		remainingWords.push(elem);
	});
	console.log(remainingWords);

	//analyseRowTiles = document.querySelector('#row-' + currentRow - 1).childNodes;
	//#row-0-tile-0.tile, div#row-0-tile-1.tile, div#row-0-tile-2.tile, div#row-0-tile-3.tile, div#row-0-tile-4.tile
	console.log(currentRow);
	if (currentRow == 1)
	{
		const element = document.getElementById("row-0").childNodes;
		console.log(element);
		currentTile = 0;
		let index = 0;
		element.forEach(tile => {
			tile = document.getElementById('row-0-tile-' + currentTile);
			const letter = tile.getAttribute('data');
			console.log(letter);
			const color = tile.getAttribute('class')[13];
			if (color == 'y')//y means the tile is gray
			{
				// loop through array check every string if contains letter
				remainingWords.forEach( words => {
					var filtered = remainingWords.filter(function(letter){
						return !remainingWords[index].includes(letter);
					});
					index++;
				});
				console.log(remainingWords);
			}
			else if (color == 'l')//means it is yellow
			{

			}
			else if (color == 'e')//means it is greeen
			{

			}
			console.log(color);
			currentTile++;
		});
	}
	else if (currentRow == 2)
	{
		const element = document.getElementById("row-1").childNodes;
		console.log(element);
	}
	else if (currentRow == 3)
	{
		const element = document.getElementById("row-2".childNodes);
		console.log(element);
	}
	else if (currentRow == 4)
	{
		const element = document.getElementById("row-3".childNodes);
		console.log(element);
	}
	else if (currentRow == 5)
	{
		const element = document.getElementById("row-4".childNodes);
		console.log(element);
	}
	

	//tile = document.getElementById('row-' + currentRow + '-tile-' + currentTile);
	//const dataLetter = tile.getAttribute('data');
	//console.log(dataLetter);
	//const rowTiles2 = document.getElementById('row-' + currentRow - 1).childNodes;
	//const color = tile.getAttribute('class');
	//console.log(color);
	/*console.log(rowTiles2);
	rowTiles2.forEach(tile => {
		tile = document.getElementById('row-' + currentRow + '-tile-' + currentTile);
		const dataLetter = tile.getAttribute('data');
		
	})*/
}


const	toggleAssistant = () => {
	console.log('Assistant button is pressed');
	analyseGuess();
}