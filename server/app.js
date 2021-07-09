const dotenv = require('dotenv');
const express = require("express");
const app = express();
const cookies = require("cookie-parser");
//C:\Program Files\MongoDB\Server\4.4\data\

dotenv.config({path:'./config.env'});
require('./db/conn');

app.use(cookies());
app.use(express.json());

app.use(require('./router/auth'));

const PORT = process.env.PORT || 5000;

// Middleware(Restrict page access by authentication)
// const middleWare = (req, res, next) => {
//   console.log("hello middlware");
//   next();
// };

// app.get("/", (request, response) => {
//   response.send("Hello World Server");
// });

// app.get("/signin", (req, res) => {
//   response.send("Hello World signin");
// });

// app.get("/signup", (req, res) => {
//   response.send("Hello World signup");
// });

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  
}

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
