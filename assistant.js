/*
**
** analysing guess
**
*/

const	analyseGuess = () => {
	guess.forEach((guess) => {
		let i = 0;
		possibleWordsArray.forEach((possibleWordsArray) => {
			if (possibleWordsArray.includes(guess.letter)) {
				//check if position is the same;
				//loop throguh word
				while (i < 5)
				{
					possibleWordsArray[i] == guess.letter
					i++;
				}
			}
		});
	});
}


const	toggleAssistant = () => {
	console.log('Assistant button is pressed');
}