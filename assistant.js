const	analyseGuess = () => {
	let remainingWords = [];

	possibleWordsArray.forEach(elem => {
		remainingWords.push(elem);
	});
	console.log(remainingWords);

	//analyseRowTiles = document.querySelector('#row-' + currentRow - 1).childNodes;
	//#row-0-tile-0.tile, div#row-0-tile-1.tile, div#row-0-tile-2.tile, div#row-0-tile-3.tile, div#row-0-tile-4.tile
	row = currentRow;
	curTile = currentTile;
	console.log(row);

	if (row == 1)
	{
		const element = document.getElementById("row-0").childNodes;
		console.log(element);
		curTile = 0;
		element.forEach(tile => {
			tile = document.getElementById('row-0-tile-' + curTile);
			const letter = tile.getAttribute('data');
			console.log(letter);
			const color = tile.getAttribute('class')[13];
			if (color == 'y')//y means the tile is gray
			{
				let filtered = [];
				let i = 0;
				// loop through array check every string if contains letter
				remainingWords.forEach( words => {
					console.log(!words.includes(letter));
					if (words.includes(letter))
					{
					
					}
					
					i++;
					/*filtered = remainingWords.filter(function(letter){
						return !words.includes(letter);
					});*/
				});
				
				console.log(filtered);
			}
			else if (color == 'l')//means it is yellow
			{

			}
			else if (color == 'e')//means it is greeen
			{

			}
			console.log(color);
			curTile++;
		});
	}
	else if (row == 2)
	{
		const element = document.getElementById("row-1").childNodes;
		console.log(element);
	}
	else if (row == 3)
	{
		const element = document.getElementById("row-2".childNodes);
		console.log(element);
	}
	else if (row == 4)
	{
		const element = document.getElementById("row-3".childNodes);
		console.log(element);
	}
	else if (row == 5)
	{
		const element = document.getElementById("row-4".childNodes);
		console.log(element);
	}
	

	//tile = document.getElementById('row-' + currentRow + '-tile-' + curTile);
	//const dataLetter = tile.getAttribute('data');
	//console.log(dataLetter);
	//const rowTiles2 = document.getElementById('row-' + currentRow - 1).childNodes;
	//const color = tile.getAttribute('class');
	//console.log(color);
	/*console.log(rowTiles2);
	rowTiles2.forEach(tile => {
		tile = document.getElementById('row-' + currentRow + '-tile-' + curTile);
		const dataLetter = tile.getAttribute('data');
		
	})*/
}


const	toggleAssistant = () => {
	console.log('Assistant button is pressed');
	analyseGuess();
}