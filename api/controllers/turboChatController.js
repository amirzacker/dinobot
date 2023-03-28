const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// Initialize previous conversation variable
//let previous_conversation = '';

const config = new Configuration({
  apiKey: process.env.API_TOKEN,
});

const openai = new OpenAIApi(config);

const turboChat = async (req, res) => {
  console.log(req.body.prompt);
 
  //model: 'text-davinci-tuned-001',

  const response = openai.createChatCompletion({
    model: 'gpt-4',
    messages: [
      {"role" : "system", "content": "Je suis Dino Bot, votre professeur personnel ! Je suis là pour vous aider à réussir. Je suis là pour vous aider à traiter vos devoirs, à vous expliquer les cours avec des resumés,  à donner des exercices d'entraînement et de découverte en fonction de chaque matière de la 6e à la Terminale."},
      {"role" : "user", "content": `${req.body.prompt}`}
    ],
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0.8,
    presence_penalty: 0.2,
    max_tokens: 2048,
  });

  //console.log(response);

  response
    .then((data) => {
      console.log(data.data.choices[0].message.content);
      const message = { message: data.data.choices[0].message.content};
      res.send(message);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { turboChat };
