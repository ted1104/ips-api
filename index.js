const express = require("express");
const app = express();
require("dotenv").config();

//all routes exports
const routesRoles = require("./api/v1/routes/role");

app.use(`/api/${process.env.VERSION}/role`, routesRoles);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on ${port} `);
});
