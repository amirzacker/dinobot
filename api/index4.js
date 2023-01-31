const {Configuration, OpenAIApi} = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());
app.use(cors());

const config = new Configuration({
  apiKey: process.env.API_TOKEN,
});

const openai = new OpenAIApi(config);
const modelData = {
  name: "Dino Bot",
  description: "Dino Bot trained on my own data",
  language: "text",
};
const createModel = openai.createModel(modelData);
createModel
  .then((response) => {
    const modelId = response.data.id;
    console.log(`Model created with ID: ${modelId}`);

    // Step 2 - Upload training data to the model
    const filePath = "./data.txt";
    const uploadData = openai.uploadFileToModel(modelId, filePath);
    uploadData
      .then((response) => {
        console.log("Training data uploaded successfully");

        // Step 3 - Train the model
        const trainModel = openai.trainModel(modelId);
        trainModel
          .then((response) => {
            console.log("Model training started");
            // Step 4 - Test the model
            const modelPrompt = "What is the meaning of life?";
            const testModel = openai.createCompletion(modelId, modelPrompt);
            testModel
              .then((response) => {
                console.log(`Model response: ${response.data.choices[0].text}`);

                // Step 5 - Update the model with new data
                const newFilePath = "./data.txt";
                const uploadNewData = openai.uploadFileToModel(
                  modelId,
                  newFilePath
                );
                uploadNewData
                  .then((response) => {
                    console.log("New training data uploaded successfully");

                    // Retrain the model with new data
                    const retrainModel = openai.trainModel(modelId);
                    retrainModel
                      .then((response) => {
                        console.log("Model retraining started");
                      })
                      .catch((err) => {
                        console.log(`Error retraining model: ${err}`);
                      });
                  })
                  .catch((err) => {
                    console.log(`Error uploading new data: ${err}`);
                  });
              })
              .catch((err) => {
                console.log(`Error testing model: ${err}`);
              });
          })
          .catch((err) => {
            console.log(`Error training model: ${err}`);
          });
      })
      .catch((err) => {
        console.log(`Error uploading data: ${err}`);
      });
  })
  .catch((err) => {
    console.log(`Error creating model: ${err}`);
  });


const models = openai.listModels();
models.then((response) => {
    const myModels = response.data.data;
    console.log(`Models: ${myModels}`);
})
.catch((err) => {
    console.log(`Error liste models: ${err}`);
});

app.listen(3000, () => console.log("Listening on port 3000"));