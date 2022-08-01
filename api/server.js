const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { json } = require("body-parser");
const axios = require("axios");

const app = express();

const API_KEY = "886615613355328";
const API_SECRET = "3a2zm4dmAxBj53wh6RPXwBfDT6I";
const CLOUD_NAME = "dqpemptui";

app.use(cors());
app.use(json());

const BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}`;
const auth = {
  username: API_KEY,
  password: API_SECRET,
};

app.get("/search?", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/resources/search`, {
      auth,
      params: {
        expression: req.query.expression,
        next_cursor: req.query.next_cursor,
      },
    });
    return res.send(response.data);
  } catch (err) {
    console.error(err);
  }
});

app.get("/folders", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/folders/jr-portfolio`, {
      auth,
    });
    return res.send(response.data);
  } catch (err) {
    console.error(err);
  }
});

const PORT = 7000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
