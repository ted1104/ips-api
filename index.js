const express = require("express");
const app = express();
require("dotenv").config();

const errorHandler = require(`./api/${process.env.VERSION}/middlewares/error-handler`);

//all routes exports
const routesCrudStatique = require("./api/v1/routes/crud-statique");

//middlewares
app.use(express.json());

app.use(`/api/${process.env.VERSION}/crud`, routesCrudStatique);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on ${port} `);
});
