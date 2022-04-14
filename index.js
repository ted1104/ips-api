const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    `Server is listening on ${port} - ${process.env.DB_DEV_USERNAME}`
  );
});
