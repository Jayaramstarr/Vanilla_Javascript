const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters =  [];
const wrongLetters = [];

// show the hidden word
const displayWord = () => {
	
	wordEl.innerHTML = `
		${selectedWord
			.split('')
			.map( letter => `
				<span class="letter">
					${correctLetters.includes(letter) ? letter : '' }
				</span>
			` 
		)
		.join('')}`;//we split the string to an array check if you won and wrap the array back into a string

	const innerWord = wordEl.innerText.replace(/\n/g,'');

	if( innerWord === selectedWord )
	{
		finalMessage.innerText = 'Congratulations! You won! 😃';
		popup.style.display = 'flex';
	}
}


// update wrong letters
const updateWrongLettersEl = () => {
	
	// display wrong letter
	wrongLettersEl.innerHTML = `
		${ wrongLetters.length > 0 ? `<p>Wrong</p>` : '' }
		${ wrongLetters.map( letter => `<span>${letter}</span>` ) }
	`;

	// display parts
	const errors = wrongLetters.length;
	figureParts.forEach( (part,index) => {
		
		if( index < errors )
		 part.style.display = 'block';
		else
		 part.style.display = 'none';
	} );

	// check if palyer has lost
	if( wrongLetters.length === figureParts.length )
	{
		finalMessage.innerText = `Unfortunately you've lost. 😕`;
		popup.style.display = 'flex';
	}

}


// show notification
const showNotification = () => {
	notification.classList.add('show');
	setTimeout( () => notification.classList.remove('show') , 2000 );
}


// keydown letter press
window.addEventListener( 'keydown', e => {

	if( e.keyCode>=65 && e.keyCode<=90 )
	{
		const letter = e.key;
		if( selectedWord.includes(letter) )
		{
			if( !correctLetters.includes(letter) )
			{
				correctLetters.push(letter);
				console.log(letter);
				displayWord();
			}
			else
				showNotification();
		}
		else
		{
			if( !wrongLetters.includes(letter) )
			{
				wrongLetters.push(letter);
				updateWrongLettersEl();
			}
			else
				showNotification();
		}
	}

} );

// restart the game 
playAgainBtn.addEventListener('click', () => {
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];
	displayWord();

	// to clear the figure
	updateWrongLettersEl();
	popup.style.display = 'none';
});

displayWord();