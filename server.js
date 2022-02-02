const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const colors = require("colors");
var db = "mongodb://localhost:27017/Medicine";
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true});
const userRoutes = require("./routes/user");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/user", userRoutes);
app.use("/shop", shopRoutes);

mongoose
  .connect(db)
  .then(() => {
    const port = process.env.PORT || 5000;
    const server = app.listen(port, () => {
      console.log("Server running on port".cyan, colors.yellow(port));
    });
    console.log("\nConnected to".cyan, "Medicine".magenta, "database".cyan);
  })
  .catch(err => console.log("Error connecting to database".cyan, err));
