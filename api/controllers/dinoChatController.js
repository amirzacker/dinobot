const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// Initialize previous conversation variable
//let previous_conversation = '';

const config = new Configuration({
  apiKey: process.env.API_TOKEN,
});

const openai = new OpenAIApi(config);

const dinoChat = async (req, res) => {
  //console.log(req.body.prompt);
  const {
    classe,
    prompt,
    matiere,
    chapter,
    requete,
    level,
    exercice,
    question,
    previous_conversation,
    previous_exercice 
  } = req.body?.prompt;

 
  let prompts = "";
  if (requete === "exercices") {
    //const introduction = `Je suis un élève en classe de ${classe},et j’ai besoin de ton aide pour progresser. Je veux que tu te comportes comme un professeur de  ${matiere} , En classe ${classe}  au collège, dans la matière  ${matiere}, sur le ${chapter}.`;
    const exercicepromt = ` Pourriez-vous me donner un exercice de    ${level} et de type  ${exercice} sur le  ${chapter} avec un niveau  debutant, avec au minimum 5 questions. N’affiche pas la correction , ni  la réponses.`;
    if (question === true) {
       //prompts =  previous_exercice ;
       //prompts =  previous_exercice +  prompt ;
       prompts =   ` ${prompt}  ${previous_exercice} ? ` ;

       //console.log(prompts);
    } else {
      prompts = exercicepromt + prompt;
      //prompts = introduction + exercicepromt + prompt;
    }
    //previous_conversation += prompts ;
  } else if (requete === "resume-du-cours") {
    const introduction = `Je suis un élève en classe de ${classe},et j’ai besoin de ton aide pour progresser. Je veux que tu te comportes comme un professeur de  ${matiere} , En classe ${classe}  au collège, dans la matière  ${matiere}, sur le ${chapter}.`;
    const resumepromt = ` Je souhaite que tu me fasses un cours détaillé de chacune des parties en étant claire et en utilisant du vocabulaire simple, que tu me donnes les notions essentielles, telles que les définitions, les propriétés, les dates, ainsi que des exemples pour chaque partie.`;

    if (question === true) {
      prompts = ` ${prompt} : ${previous_exercice} ` 
      //prompts = previous_exercice + ". " + prompt;
      console.log(prompts);
    } else {
      //prompts =  resumepromt + prompt;
      prompts = introduction + resumepromt + prompt;
    }
//previous_conversation += prompts ;
  }

  //model: 'text-davinci-tuned-001',

  const response = openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompts,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0.8,
    presence_penalty: 0.2,
    max_tokens: 2048,
  });

  response
    .then((data) => {
      const message = { message: data.data.choices[0].text };
      res.send(message);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { dinoChat };
