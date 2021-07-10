const dotenv = require('dotenv');
const express = require("express");
const app = express();
const cookies = require("cookie-parser");

dotenv.config({path:'./config.env'});
require('./db/conn');

app.use(cookies());
app.use(express.json());
app.use(require('./router/auth'));

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  
}

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
