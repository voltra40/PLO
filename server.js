const express = require("express");
const app = express();
const mongoose = require("mongoose");

// for environment variables
require('dotenv').config();

const { mongoUri } = require("./config");
const cors = require("cors");
// logs error requests to the server in the console, uses tiny configuration
const morgan = require("morgan");
const bodyParser = require("body-parser");
// import routes
const bucketListItemsRoute = require("./api/bucketListItems");
const habitsRoute = require("./api/habits");
const cryptoPriceRoute = require("./api/cryptoPrice");
const transactionHistoryRoute = require("./api/transactionHistory");
const sleepRoute = require("./api/sleepData");

const path = require('path');
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

mongoose.connect(mongoUri, { useNewUrlParser: true }).then(
  () => {
    console.log("MongoDB database is connected");
  },
  (err) => {
    console.log("Can not connect to the database" + err);
  }
);

app.use("/api/bucket-list", bucketListItemsRoute);
app.use("/api/habits", habitsRoute);
app.use("/api/crypto-prices", cryptoPriceRoute);
app.use("/api/transaction-history", transactionHistoryRoute);
app.use("/api/sleep-data", sleepRoute);

// sends hello world to anyone requesting acess
// app.get("/", (req, res) => res.send("Hello World"));

// check if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  })
}

app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});
