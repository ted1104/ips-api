const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");

const cors = require("cors");
const fileUpload = require("express-fileupload");

const errorHandler = require(`./api/${process.env.VERSION}/middlewares/error-handler`);
const notFoundPage = require(`./api/${process.env.VERSION}/middlewares/not-found-page`);

//all routes exports
const routesCrudStatique = require(`./api/${process.env.VERSION}/routes/crud-statique`);
const routeAgents = require(`./api/${process.env.VERSION}/routes/agent`);
const routeMissions = require(`./api/${process.env.VERSION}/routes/mission`);
const routeReunions = require(`./api/${process.env.VERSION}/routes/reunion`);
const routeBanques = require(`./api/${process.env.VERSION}/routes/banque`);
const routeDashboard = require(`./api/${process.env.VERSION}/routes/dashboard`);
const routeFinances = require(`./api/${process.env.VERSION}/routes/finances`);
const routeMateriels = require(`./api/${process.env.VERSION}/routes/materiel`);
const routeAuth = require(`./api/${process.env.VERSION}/routes/auth`);

//middlewares
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cors());
app.use(express.static("./public"));

app.use(`/api/${process.env.VERSION}`, routesCrudStatique);
app.use(`/api/${process.env.VERSION}/agent`, routeAgents);
app.use(`/api/${process.env.VERSION}/mission`, routeMissions);
app.use(`/api/${process.env.VERSION}/reunion`, routeReunions);
app.use(`/api/${process.env.VERSION}/banque`, routeBanques);
app.use(`/api/${process.env.VERSION}/finances`, routeFinances);
app.use(`/api/${process.env.VERSION}/materiel`, routeMateriels);
app.use(`/api/${process.env.VERSION}/auth`, routeAuth);
app.use(`/api/${process.env.VERSION}/dashboard`, routeDashboard);
app.use(notFoundPage);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on ${port} `);
});
