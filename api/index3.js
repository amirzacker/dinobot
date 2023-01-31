const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({
  apiKey: process.env.API_TOKEN,
});
const openai = new OpenAIApi(config);

const baseModel = "text-davinci-002";
const prompt = "What is the meaning of life?";
const tuningData = "./data.txt";
//const tuningData = "./training_data.txt";

const createTunedModel = async () => {
  try {
    const response = await openai.createTunedModel({
      baseModel,
      prompt,
      tuningData
    });
    console.log(`Tuned model created with ID: ${response.data.id}`);
  } catch (err) {
    console.log(`Error creating tuned model: ${err}`);
  }
};

createTunedModel();
