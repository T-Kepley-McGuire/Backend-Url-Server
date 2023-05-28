const express = require("express");
const urlsRouter = require("./urls/urls.router");
const usesRouter = require("./uses/uses.router");

const app = express();

app.use(express.json());
app.use("/urls", urlsRouter);
app.use("/uses", usesRouter);

app.use((request, response, next) => {
  next({status: 404, message: `Not found: ${request.originalUrl}`});
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  response.status(status).json({ error: message });
});

module.exports = app;
