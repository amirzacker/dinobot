const {Configuration, OpenAIApi} = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dinChatRouter = require('./routes/dinoChatRoute');
const generateImageRouter = require('./routes/imageGeneratorRoute');
require('dotenv').config();


// Initialize previous conversation variable
let previous_conversation = '';


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

  previous_conversation += req.body.prompt;
  //model: 'text-davinci-tuned-001',

    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: req.body.prompt,
        temperature: 0.4,
        top_p: 1,
        frequency_penalty: 0.8,
        presence_penalty: 0.2,
        max_tokens: 2048,
    });

    response.then((data) => {
        const message = {message: data.data.choices[0].text};
        res.send(message);
    }).catch((err) => {
        res.send(err);
    });
});



app.use('/openai/dinochat', dinChatRouter);
app.use('/openai/generateimage', generateImageRouter);

app.listen(3000, () => console.log('Listening on port 3000'));