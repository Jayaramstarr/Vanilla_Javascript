const msgEl = document.getElementById('msg');
const randomNum =  Math.floor(Math.random()*100)+1;

console.log('Number:', randomNum);


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition game
recognition.start();

// Writes what the user speaks
const writeMessage = (msg) => {
   msgEl.innerHTML = `
   <div>You said: </div>
   <span class="box">${msg}</span>
   `;
}


// Check message against number
const checkNumber = (msg) => {
  const num = +msg;

  // Check if its a valid number
  if(Number.isNaN(num))
    return msgEl.innerHTML += '<div>This is not a valid number</div>';

  // Check the range
  if( num<1 || num>100 )
    return msgEl.innerHTML += ' <div>Number must be between 1 and 100</div> ';

  // Check number
  if( num == randomNum )
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number!<br><br>It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  else if( num > randomNum )
    msgEl.innerHTML += '<div>GO LOWER</div>';
  else
    msgEl.innerHTML += '<div>GO HIGHER</div>';
}


// Capture sound
const onSpeak = (e) => {
  const msg = e.results[0][0].transcript;
  
  writeMessage(msg);
  checkNumber(msg); 
}


// Speak result
recognition.addEventListener('result', onSpeak);


//End SR service
recognition.addEventListener('end', () => recognition.start()) 

document.body.addEventListener('click', (e) => {
  if(e.target.id == 'play-again')
    window.location.reload();
});