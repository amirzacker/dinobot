const chatBox = document.querySelector(".chat-box");
const inputField = chatBox.querySelector("input[type='text']");
const button = chatBox.querySelector("button");
const chatBoxBody = chatBox.querySelector(".chat-box-body");

button.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

let previous_conversation = '';
function sendMessage() {
  const message = inputField.value;
  inputField.value = "";
  // Concatenate previous conversation to the current message
  const prompt = previous_conversation + message;
  previous_conversation = prompt;

  console.log(message);
  function generatePrompt(message) {
    return `Je suis Dino Bot, votre professeur personnel ! Je suis là pour vous aider à réussir. Je suis là pour vous aider à traiter vos devoirs, à donner des exercices d'entraînement et de découverte en fonction de chaque matière de la 6e à la Terminale.
  
  Moi: Bonjour Dino Bot, comment ça va ?
  Dino Bot: Bonjour ! Je vais très bien, merci. Et vous ?
  Moi: Pouvez-vous m'aider à comprendre cette formule de mathématiques ?
  Dino Bot: Bien sûr ! Expliquez-moi ce que vous avez du mal à comprendre, et nous travaillerons ensemble pour vous aider à comprendre.
  
  Moi: ${message}
  Dino Bot: `;
  }
  
  console.log(prompt);

  chatBoxBody.innerHTML += `<div class="message"><p>${message}</p></div>`;
  chatBoxBody.innerHTML += `<div id="loading" class="response loading">.</div>`;
  scrollToBottom();
  window.dotsGoingUp = true;
    var dots = window.setInterval( function() {
        var wait = document.getElementById("loading");
        if ( window.dotsGoingUp ) 
            wait.innerHTML += ".";
        else {
            wait.innerHTML = wait.innerHTML.substring(1, wait.innerHTML.length);
        if ( wait.innerHTML.length < 2)
            window.dotsGoingUp = true;
        }
        if ( wait.innerHTML.length > 3 )
            window.dotsGoingUp = false;
        }, 250);

  fetch('http://localhost:3000/message', {
    method: 'POST',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  
  }).then(response => {
    return response.json();
  }).then(data => {
    clearInterval(dots);
    document.getElementById("loading").remove();
    console.log(data.message);
    previous_conversation += data.message;
    chatBoxBody.innerHTML += `<div class="response"><p>${data.message}</p></div>`;
    scrollToBottom();
  })
}

function scrollToBottom() {
  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
}