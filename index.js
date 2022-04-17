const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");

const errorHandler = require(`./api/${process.env.VERSION}/middlewares/error-handler`);
const notFoundPage = require(`./api/${process.env.VERSION}/middlewares/not-found-page`);

//all routes exports
const routesCrudStatique = require(`./api/${process.env.VERSION}/routes/crud-statique`);
const routeAgents = require(`./api/${process.env.VERSION}/routes/agent`);
const routeAuth = require(`./api/${process.env.VERSION}/routes/auth`);

//middlewares
app.use(express.json());

app.use(`/api/${process.env.VERSION}`, routesCrudStatique);
app.use(`/api/${process.env.VERSION}/agent`, routeAgents);
app.use(`/api/${process.env.VERSION}/auth`, routeAuth);
app.use(notFoundPage);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on ${port} `);
});
