const messageDiv = document.querySelector("#reponse");
const questionDiv = document.querySelector("#enonce");
const form = document.querySelector("#image-form");

let previous_conversation = "";
let previous_question = "";
let last_question = "";
let previous_exercice  = "";
let laste_exercice  = "";

function onSubmit(e) {
  e.preventDefault();

  const submitButton = e.submitter;
  let prompt;
  let question;

  if (submitButton.name === "valider") {
    // Le bouton "Valider" a été soumis
    console.log("valider est soumis");
    prompt = document.querySelector("#prompt").value;
    question = document.querySelector("#question").checked;
    questionDiv.style.display = "none";
    // Traitez les données du formulaire pour la soumission
  } else if (submitButton.name === "reponse") {
    // Le bouton "reponse" a été soumis
    console.log("reponse est soumis");
    prompt = "Pourriez-vous me donner les reponses détaillées de l'exercie ";
    questionDiv.style.display = "block";
    //questionDiv.innerHTML = `<h1> QUESTION </h1> <p> ${previous_conversation} </p> <h1> CORRECTION </h1>`;
    // Split the previous conversation into individual questions
    //const questions = previous_conversation.split("<qs>");
    const questions = previous_question.split("<qs>");

    // Select the last question
    //const last = questions.pop();
    //const last = questions.slice(-1)[0];
    const last =
      questions[1] !== "" ? questions[questions.length - 2] : questions[0];
    // Update the last question variable
    last_question = last;
    questionDiv.innerHTML = `<h2 class='titre-correction' > QUESTION </h2> <p> ${last_question} </p> <div class='correction'> <h2 class='titre-correction'> CORRECTION </h2> <div>`;
    question = true;
    //console.log(lastConversation);
    // Effectuez une action différente, comme vider le formulaire ou revenir à la page précédente
  }


  const last_exercice = previous_exercice.split("<qs>");

    // Select the last question
    console.log(last_exercice);
    //const last = questions.pop();
    //const last = questions.slice(-1)[0];
    const lastExo = last_exercice[1] !== "" ? last_exercice[last_exercice.length - 2] : last_exercice[0];
    // Update the last question variable
    console.log(lastExo);
    laste_exercice = lastExo;

  const classe = document.querySelector("#classe").value;
  const matiere = document.querySelector("#matiere").value;
  const chapter = document.querySelector("#chapter").value;
  const requete = document.querySelector("#requete").value;
  const level = document.querySelector("#level").value;
  const exercice = document.querySelector("#exercice").value;

  //const question = document.querySelector('#question');
  //const question = document.querySelector('#question');

  const data = {
    classe: classe,
    prompt: prompt,
    matiere: matiere,
    chapter: chapter,
    requete: requete,
    level: level,
    exercice: exercice,
    question: question,
    previous_conversation: previous_conversation,
    previous_exercice : laste_exercice,
  };

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
  element.textContent = "";

  loadInterval = setInterval(() => {
    // Update the text content of the loading indicator
    element.textContent += ".";

    // If the loading indicator has reached three dots, reset it
    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

async function generateImageRequest(prompt) {
  try {
    showSpinner();
    // specific message div
    // Récupérez les données du formulaire
    //const formData = new FormData(form);

    loader(messageDiv);

    console.log(prompt);

    const response = await fetch("http://localhost:3000/openai/dinochat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
      //body: JSON.stringify({ formData }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error("That image could not be generated");
    }

    clearInterval(loadInterval);
    messageDiv.innerHTML = " ";

    const data = await response.json();
    const parsedData = data.message.trim(); // trims any trailing spaces/'\n'

    typeText(messageDiv, parsedData);
    console.log(data.message);
    previous_conversation += data.message;
    // Append the new conversation to the previous conversation
    //previous_conversation += `${parsedData}<qs>`;
    previous_question += `${data.message}<qs>`;

    // Check if the current request was an exercise request and if it returned a response
    if (parsedData.trim() !== "") {
      // Update the previous_exercice variable with the latest response
      previous_exercice = previous_question
      console.log(`Previous exercice updated: ${previous_exercice}`);
    }

    removeSpinner();
    document.querySelector("#prompt").value = "";
    document.querySelector("#exercice").value = "";
    document.querySelector("#level").value = "";
    //document.querySelector('#question').value = "on";
    document.getElementById("question").checked = false;
    document.getElementById("question").removeAttribute("required");
  } catch (error) {
    console.log(error);
    messageDiv.innerHTML = "Something went wrong";
    alert(error);
  }
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);
