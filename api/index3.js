const {Configuration, OpenAIApi} = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dinChatRouter = require('./routes/dinoChatRoute');
const dinExoRouter = require('./routes/dinoExoRoute');
const turboChatRouter = require('./routes/turboChatRoute');
const generateImageRouter = require('./routes/imageGeneratorRoute');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const config = new Configuration({
    apiKey: process.env.API_TOKEN
});

const openai = new OpenAIApi(config);


app.get('/', (req, res) => {
    res.send('Welcome to the Dino Bot API')
})
app.post('/message', (req, res) => {


    const response = openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{role: "user", content: req.body.prompt}],
        //messages: [{role: "user", text: req.body.prompt}],
      /*   messages: [
          {"role" : "system", "content": "Je suis Dino Bot, votre professeur personnel ! Je suis là pour vous aider à réussir. Je suis là pour vous aider à traiter vos devoirs, à donner des exercices d'entraînement et de découverte en fonction de chaque matière de la 6e à la Terminale."},
          {"role" : "user", "content": `${req.body.prompt}`}
        ], */
    });

    response.then((data) => {
        const message = {message: data};
        res.send(message);
    }).catch((err) => {
        res.send(err);
    });
});



app.use('/openai/dinochat', dinChatRouter);
app.use('/openai/turbochat', turboChatRouter);
app.use('/openai/dinoexo', dinExoRouter);
app.use('/openai/generateimage', generateImageRouter);

app.listen(3000, () => console.log('Listening on port 3000'));