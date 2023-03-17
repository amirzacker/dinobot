const chatBox = document.querySelector(".chat-box");
const inputField = chatBox.querySelector("input[type='text']");
const button = chatBox.querySelector("button");
const chatBoxBody = chatBox.querySelector(".chat-box-body");

let previous_conversation = "";
let currentQuestion = 0;
let userResponses = [];

var chapters = {
  "3e": {
    francais: [
      "Chapitre 01 - Introduction au DNB",
      "Chapitre 02 - L'art poétique pour se raconter",
      "Chapitre 03 - La poésie engagée",
      "Chapitre 04 - Dénoncer les travers de la société",
      "Chapitre 05 - Agir dans la cité - Individu et pouvoir au théâtre",
      "Chapitre 06 - Vision poétique du monde",
      "Chapitre 07 - Progrès et rêves scientifiques",
      "Chapitre 08 - Les propositions",
      "Chapitre 09 - Le participe passé",
      "Chapitre 10 - Le vocabulaire",
    ],
    "physique-chimie": [
      "Chapitre 01 - Les éléments chimiques dans l'univers",
      "Chapitre 02 - Les ions dans la matière",
      "Chapitre 03 - Les solutions acides, basiques et transformation",
      "Chapitre 04 - Les caractéristiques d'une espèce chimique",
      "Chapitre 05 - Le mouvement d'un objet",
      "Chapitre 06 - Les interactions et les forces",
      "Chapitre 07 - La Gravitation",
      "Chapitre 08 - L'énergie électrique",
      "Chapitre 09 - Energie mécanique",
      "Chapitre 10 - Les ondes",
    ],
    maths: [
      "Chapitre 01. Calcul numérique",
      "Chapitre 02. Volume - espace",
      "Chapitre 03. Arithmétique",
      "Chapitre 04. Homothétie thalès",
      "Chapitre 05. Calcul littéral",
      "Chapitre 06. Notion de fonction",
      "Chapitre 07. Trigonométrie",
      "Chapitre 08. Statistiques",
      "Chapitre 09. Fonctions affines",
      "Chapitre 10. Sections",
      "Chapitre 11. Probabilités",
      "Chapitre 12. Triangles semblables",
      "Chapitre 13. Agrandissement -reduction",
    ],
  },
  "4e": {
    francais: [
      "Chapitre 01 - Dire l'amour en poésie",
      "Chapitre 02 - Dire l'amour au théâtre",
      "Chapitre 03 - Confrontations de valeurs au théâtre et dans le récit",
      "Chapitre 04 - Réalisme et naturalisme",
      "Chapitre 05 - Le récit fantastique",
      "Chapitre 06 - Informer et s'informer",
      "Chapitre 07 - Déformer et désinformer",
      "Chapitre 08 - La ville, lieu de tous les possibles",
    ],

    maths: [
      "Chapitre 01 - Nombres relatifs opérations",
      "Chapitre 02 – Théorème de Pythagore",
      "Chapitre 03 – Les nombres rationnels",
      "Chapitre 04 - Les puissances",
      "Chapitre 05 – Géométrie translation-rotation",
      "Chapitre 06 – Le calcul littéral",
      "Chapitre 07 – Les triangles égaux",
      "Chapitre 08 - Statistiques",
      "Chapitre 09 - Proportionnalité",
      "Chapitre 10 - Equations",
      "Chapitre 11 - Cône pyramide",
      "Chapitre 12 - Probabilités",
      "Chapitre 13 – Espace et repérage",
    ],

    "physique-chimie": [
      "Chapitre 01 - Le courant électrique",
      "Chapitre 02 - Tension électrique",
      "Chapitre 03 - Les molécules",
      "Chapitre 04 - La combustion",
      "Chapitre 05 - Vitesse et mouvement",
      "Chapitre 06 - L'univers",
      "Chapitre 07 - Caractéristiques d'une espèce chimique",
      "Chapitre 08 - L'énergie électrique",
    ],
  },
  "5e": {
    francais: [
      "Chapitre 01 - Les chevaliers, ces héros !",
      "Chapitre 02 - La Littérature au Moyen-Âge",
      "Chapitre 03 - Le Merveilleux médiéval",
      "Chapitre 04 - Molière et son temps : La Comédie au XVIIe siècle",
      "Chapitre 05 - La Poésie, des mots qui transforment le monde !",
      "Chapitre 06 - Avec autrui : La famille, les amis, au cœur de l'écriture !",
      "Chapitre 07 - Etude de la langue",
    ],

    maths: [
      "Chapitre 01. Enchaînement des opérations",
      "Chapitre 02. Symétrie centrale",
      "Chapitre 03. Nombres rationnels",
      "Chapitre 04. Angles et droites parallèles",
      "Chapitre 05. Nombre relatif et repérage",
      "Chapitre 06. Nombre relatifs et opérations",
      "Chapitre 07. Triangles",
      "Chapitre 08. Proportionnalité",
      "Chapitre 09. Parallélogramme",
      "Chapitre 10. Statistiques",
      "Chapitre 11. Géométrie dans l'espace",
      "Chapitre 12. Calcul littéral",
    ],

    "physique-chimie": [
      "Chapitre 01 - L'eau dans tous ses états",
      "Chapitre 02 - La masse et le volume",
      "Chapitre 03 - Les mélanges de liquides et de solides",
      "Chapitre 04 - Les mélanges gazeux",
      "Chapitre 05 - Les changements d'états",
      "Chapitre 06 - La matière à la loupe",
      "Chapitre 07 - Le circuit électrique simple",
      "Chapitre 08 - Les différents types de circuits",
      "Chapitre 09 - Le son",
    ],
  },
  "6e": {
    francais: [
      "Chapitre 01 - Le Monstre",
      "Chapitre 02 - La Ruse",
      "Chapitre 03 - Créations Poétiques",
      "Chapitre 04 - Récit d'aventure",
      "Chapitre 05 - Récits de créations",
      "Chapitre 06 - Outils de langue",
    ],

    maths: [
      "Chapitre 01 - Nombres décimaux",
      "Chapitre 02 - Langage géométrie",
      "Chapitre 03 - Opérations-multiplications",
      "Chapitre 04 - Droites parallèles et perpendiculaire",
      "Chapitre 05 - Opérations La division",
      "Chapitre 06 - Les angles",
      "Chapitre 07 - Partage et fractions",
      "Chapitre 08 - Périmètre et aire",
      "Chapitre 09 - Proportionnalité",
      "Chapitre 10 - Figures usuelles",
      "Chapitre 11 - Géométrie dans l'espace",
      "Chapitre 12 - Symétrie axiale",
      "Chapitre 13 - Gestion de données",
    ],

    "physique-chimie": [
      "Chapitre 01 - L'energie",
      "Chapitre 02 - La nature d'un signal",
      "Chapitre 03 - Le mouvement",
      "Chapitre 04 - La matière",
      "Chapitre 05 - Caractéristiques d'un échantillon",
      "Chapitre 06 - Les mélanges",
    ],
  },
  // ...
};

// Define the options for each class and subject
var ExerciceEntrainement = {
  francais: [
    "Exercices de compréhension de la lecture",
    "Exercices de grammaire",
    "Exercices de vocabulaire",
    "Exercices d'écriture",
  ],
  "physique-chimie": [
    "Vrai ou faux",
    "Quizz",
    "Calculs",
    "Analyse de données",
    "Expériences",
    "Résolution de problèmes",
  ],
  maths: [
    "Algèbre",
    "Analyse",
    "Géométrie",
    "Calcul mental",
    "Résolution de problèmes",
  ],
};

const ExerciceDecouverte = [
  "Vrai ou faux",
  "Quiz à choix multiple",
  "Texte à trous",
  "Classement",
  "Mots croisés",
  "Anagrammes: Jumelage",
  "Trouver les différences",
];

// Define the questions
const questions = [
  {
    question: "Quelle est votre classe ?",
    options: ["3e", "4e", "5e", "6e"],
  },
  {
    question: "Quelle matière souhaitez-vous réviser ?",
    options: ["francais", "maths", "physique-chimie"],
  },
  {
    question: "Quel chapitre souhaitez-vous réviser ?",
    options: [],
  },
  {
    question: "Quel type de requete souhaitez-vous faire ?",
    options: ["Exercices", "Résumé du cours"],
  },
  {
    question: "Quel type d'exercice souhaitez-vous faire ?",
    options: ["Exercice d'entrainement", "Exercice de découverte"],
  },
  {
    question: "Quel modele d'exercice souhaitez-vous faire ?",
    options: [],
  },
];

const reloadBtn = document.getElementById("reload-btn");
reloadBtn.addEventListener("click", () => {
  location.reload();
});

// Define the event listeners
button.addEventListener("click", sendChat);
//button.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = inputField.value;
  inputField.value = "";

  // Concatenate previous conversation to the current message
  const prompt = previous_conversation + message;
  previous_conversation = prompt;

  // Add the user response to the array of responses
  userResponses.push(message);

  // Display the user's message
  chatBoxBody.innerHTML += `<div class="message"><p>${message}</p></div>`;
  scrollToBottom();

  // Check if the current question is about the type of request
  if (currentQuestion === 3) {
    const selectedOption = userResponses[currentQuestion - 1];
    if (selectedOption === "Exercices") {
      // Continue asking the remaining questions
      currentQuestion++;
      askQuestion();
    } else if (selectedOption === "Résumé du cours") {
      // Stop asking questions and show the resume
      
      questionBotExo();
    }
  } else {
    // Ask the next question
    currentQuestion++;
    askQuestion();
  }
}

function askQuestion() {
  const { question, options } = questions[currentQuestion];

  // Display the question
  chatBoxBody.innerHTML += `<div class="response"><p>${question}</p></div>`;
  scrollToBottom();

  // Check if the current question is about the type of request
  if (question === "Quel type de requete souhaitez-vous faire ?") {
    const selectedOption = userResponses[currentQuestion - 1];

    if (selectedOption === "Exercices") {
      // Get the exercise type options based on the selected subject
      const subject = userResponses[1];
      const exerciseTypes = ExerciceEntrainement[subject];

      // Update the next question to ask about the exercise type
      questions[currentQuestion].question =
        "Quel type d'exercice souhaitez-vous faire ?";
      questions[currentQuestion].options = exerciseTypes;

      // Update the current question index and prompt the user for their exercise type selection
      currentQuestion++;
      chatBoxBody.innerHTML += `<div class="response"><p>${question}</p></div>`;
      displayOptions(options);
      scrollToBottom();
      return; // Exit the function
    } else if (selectedOption === "Résumé du cours") {
      questionBotExo();
      return; // Exit the function
    }
  }

  // Display the options, if any
  if (options.length > 0) {
    let optionsHTML = "";
    options.forEach((option) => {
      optionsHTML += `<button class="option-btn">${option}</button>`;
    });
    chatBoxBody.innerHTML += `<div class="options">${optionsHTML}</div>`;
    scrollToBottom();

    // Add event listeners to the option buttons
    const optionButtons = chatBoxBody.querySelectorAll(".option-btn");
    optionButtons.forEach((button) => {
      button.addEventListener("click", selectOption);
    });
  } else if (question === "Quel chapitre souhaitez-vous réviser ?") {
    const className = userResponses[0];
    const matiere = userResponses[1];

    // Filter the chapters based on the user's choices
    const classeChapitres = chapters[className][matiere];
    const chapitres = classeChapitres.filter((chapitre) =>
      chapitre.startsWith(`Chapitre`)
    );

    // Display the filtered chapters
    let optionsHTML = "";
    chapitres.forEach((chapitre) => {
      optionsHTML += `<button class="option-btn">${chapitre}</button>`;
    });
    chatBoxBody.innerHTML += `<div class="options">${optionsHTML}</div>`;
    scrollToBottom();

    const optionButtons = chatBoxBody.querySelectorAll(".option-btn");
    optionButtons.forEach((button) => {
      button.addEventListener("click", selectOption);
    });
  } else if (question === "Quel modele d'exercice souhaitez-vous faire ?") {
    const { options } = questions[currentQuestion - 1];
    const selectedOption = userResponses[currentQuestion - 1];
    const matiere = userResponses[1];
    // Filter the ExerciceModel based on the user's choices
    let exerciceModel = [];
    if (selectedOption === "Exercice d'entrainement") {
      exerciceModel = ExerciceEntrainement[matiere];
    } else {
      exerciceModel = ExerciceDecouverte;
    }

    // Display the filtered exercice models
    let optionsHTML = "";
    exerciceModel.forEach((model) => {
      optionsHTML += `<button class="option-btn">${model}</button>`;
    });
    chatBoxBody.innerHTML += `<div class="options">${optionsHTML}</div>`;
    scrollToBottom();
    const optionButtons = chatBoxBody.querySelectorAll(".option-btn");
    optionButtons.forEach((button) => {
      button.addEventListener("click", selectOption);
    });
  } else {
    // If the question is not about options, prompt the user for a text response
    chatBoxBody.innerHTML += `<div class="response"><p>${question}</p></div>`;
    chatBoxBody.innerHTML += `<div class="input-container"><input type="text" id="input-field" placeholder="Entrez votre réponse ici"><button id="send-btn"><i class="fa fa-paper-plane"></i></button></div>`;
    scrollToBottom();
    // Add an event listener to the send button
    const sendButton = chatBoxBody.querySelector("#send-btn");
    sendButton.addEventListener("click", sendTextResponse);

    // Add an event listener to the input field to detect when the user presses the Enter key
    const inputField = chatBoxBody.querySelector("#input-field");
    inputField.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        sendTextResponse();
      }
    });
  }
}

function selectOption(event) {
  const selectedOption = event.target.textContent;

  // Add the selected option to the array of responses
  userResponses.push(selectedOption);

  // Remove the event listeners from the option buttons
  const optionButtons = chatBoxBody.querySelectorAll(".option-btn");
  optionButtons.forEach((button) => {
    button.removeEventListener("click", selectOption);
  });

  // Check if the current question is about the type of request
  if (currentQuestion === 3) {
    if (selectedOption === "Exercices") {
      // Continue asking the remaining questions
      currentQuestion++;
      askQuestion();
    } else if (selectedOption === "Résumé du cours") {
      // Stop asking questions and show the resume
      questionBotExo();
    }
  } else {
    // Ask the next question
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      askQuestion();
    } else {
      questionBotExo();
    }
  }
}

function dataPromt() {
  const { options } = questions[currentQuestion - 1];
  const selectedOption = userResponses[currentQuestion - 1];

  console.log(userResponses[4]);

  const className = userResponses[0];
  const matiere = userResponses[1];
  const chapitre = userResponses[2];
  const typeRequete = userResponses[3];
  const typeExercice = userResponses[4] ?  userResponses[4] : "" ;
  const modeleExercice = userResponses[5] ?  userResponses[5] : "";

  const data = {
    classe: className,
    prompt: inputField.value,
    matiere: matiere,
    chapter: chapitre,
    requete: typeRequete,
    level: typeExercice,
    exercice: modeleExercice,
    previous_conversation: previous_conversation,
  };
  return data

}

function questionBotExo() {
  const data = dataPromt()
  dinoExo(data);
}

function sendChat() {

  const message = inputField.value;
  inputField.value = "";

  // Concatenate previous conversation to the current message
  const prompt = previous_conversation + message;
  previous_conversation = prompt;

  // Add the user response to the array of responses
  userResponses.push(message);
  // Display the user's message
  chatBoxBody.innerHTML += `<div class="message"><p>${message}</p></div>`;
  scrollToBottom();

  const data = dataPromt()
  data.prompt = message;
  console.log(data);
  dinoExo(data);

}

function scrollToBottom() {
  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
}

// Ask the first question
askQuestion();

function dinoExo(prompt) {

  console.log(prompt);
  chatBoxBody.innerHTML += `<div id="loading" class="response loading">.</div>`;
  scrollToBottom();
  window.dotsGoingUp = true;
  var dots = window.setInterval(function () {
    var wait = document.getElementById("loading");
    if (window.dotsGoingUp) wait.innerHTML += ".";
    else {
      wait.innerHTML = wait.innerHTML.substring(1, wait.innerHTML.length);
      if (wait.innerHTML.length < 2) window.dotsGoingUp = true;
    }
    if (wait.innerHTML.length > 3) window.dotsGoingUp = false;
  }, 250);

  fetch("http://localhost:3000/openai/dinoexo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
    //body: JSON.stringify({ formData }),
  }).then((response) => {
      return response.json();
    })
    .then((data) => {
      clearInterval(dots);
      document.getElementById("loading").remove();
      console.log(data.message);
      previous_conversation += data.message;
      chatBoxBody.innerHTML += `<div class="response"><p>${data.message}</p></div>`;
      scrollToBottom();
    });
}







