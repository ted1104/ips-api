const express = require("express");
const app = express();
require("dotenv").config();

const errorHandler = require(`./api/${process.env.VERSION}/middlewares/error-handler`);
const notFoundPage = require(`./api/${process.env.VERSION}/middlewares/not-found-page`);

//all routes exports
const routesCrudStatique = require("./api/v1/routes/crud-statique");

//middlewares
app.use(express.json());

app.use(`/api/${process.env.VERSION}`, routesCrudStatique);
app.use(notFoundPage);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on ${port} `);
});
