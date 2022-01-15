const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT, mongoUri } = require("./config");
const cors = require("cors");
// logs error requests to the server in the console, uses tiny configuration
const morgan = require("morgan");
const bodyParser = require("body-parser");
// import routes
const bucketListItemsRoute = require("./routes/api/bucketListItems");
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

app.use("/api/bucketListItems", bucketListItemsRoute);

// sends hello world to anyone requesting acess
app.get("/", (req, res) => res.send("Hello World"));

app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});
