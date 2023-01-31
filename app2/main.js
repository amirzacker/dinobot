const messageDiv = document.querySelector("#reponse");
const form = document.querySelector("#image-form");
let previous_conversation = '';
function onSubmit(e) {
  e.preventDefault();

  const prompt = document.querySelector('#prompt').value;
  const classe = document.querySelector('#classe').value;
  const matiere = document.querySelector('#matiere').value;
  const chapter = document.querySelector('#chapter').value;
  const requete = document.querySelector('#requete').value;
  const level = document.querySelector('#level').value;
  const exercice = document.querySelector('#exercice').value;
  //const question = document.querySelector('#question').checked;
  //const question = document.querySelector('#question').value;
  const question = document.querySelector('#question');


     

 const data = {
  classe : classe,
  prompt: prompt,
  matiere : matiere,
  chapter : chapter,
  requete : requete,
  level : level,
  exercice : exercice,
  question: question.checked,
  previous_conversation: previous_conversation,
  
 }

 console.log(data);
 
/*   if (prompt === '') {
    alert('Please add some text');
    return;
  } */



  //generateImageRequest(prompt);
  generateImageRequest(data);
}

let loadInterval;


function loader(element) {
    element.textContent = ''

    loadInterval = setInterval(() => {
        // Update the text content of the loading indicator
        element.textContent += '.';

        // If the loading indicator has reached three dots, reset it
        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
}

function typeText(element, text) {
  let index = 0

  let interval = setInterval(() => {
      if (index < text.length) {
          element.innerHTML += text.charAt(index)
          index++
      } else {
          clearInterval(interval)
      }
  }, 20)
}

async function generateImageRequest(prompt) {
  try {
    showSpinner();
// specific message div 
   // Récupérez les données du formulaire
   //const formData = new FormData(form);



  loader(messageDiv);

    const response = await fetch('http://localhost:3000/openai/dinochat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
      //body: JSON.stringify({ formData }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('That image could not be generated');
    }
 
    clearInterval(loadInterval)
    messageDiv.innerHTML = " "

    const data = await response.json();
    const parsedData = data.message.trim() // trims any trailing spaces/'\n' 

    typeText(messageDiv, parsedData)
    console.log(data.message);
    previous_conversation += data.message
    
  
    removeSpinner();
    document.querySelector('#prompt').value = "";
    //document.querySelector('#question').value = "on";
    document.getElementById("question").checked = false;
    document.getElementById("question").removeAttribute("required");

  } catch (error) {
    console.log(error);
    messageDiv.innerHTML = "Something went wrong"
   alert(error)
  }
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);