import express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("API Working!");
});

app.get("/user", (req, res) => {
  res.send("API");
});

export default app;
