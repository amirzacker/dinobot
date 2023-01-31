const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const crypto = require("crypto");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const config = new Configuration({
  apiKey: process.env.API_TOKEN,
});

const openai = new OpenAIApi(config);

let sessions = {};

app.get("/", (req, res) => {
  res.send("Welcome to the Coding Nexus API");
});

app.post("/start_session", (req, res) => {
  const sessionToken = generateSessionToken();
  sessions[sessionToken] = {};
  res.set("sessiontoken", sessionToken);
  res.send({ message: "Session started" });
});

app.post("/message", (req, res) => {
  const sessionToken = req.headers.sessiontoken;
  const userContext = sessions[sessionToken];
  if (!userContext) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const message = req.body.message;
  // update user context
  // ...
  openai.apiKey = process.env.OPENAI_API_KEY;
  const response = openai.Completion.create({
    engine: "davinci:ft-personal:dinobot-2023-01-31-11-33-22",
    prompt: message,
    temperature: 0.3,
    top_p: 1.0,
    frequency_penalty: 0.8,
    presence_penalty: 0.2,
    max_tokens: 1500,
  });

  response
    .then((data) => {
      const message = { message: data.choices[0].text };
      res.set("sessiontoken", sessionToken);
      res.send(message);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(3000, () => console.log("Listening on port 3000"));

function generateSessionToken() {
  // generate a unique session token here
  return crypto.randomBytes(16).toString("hex");
}
