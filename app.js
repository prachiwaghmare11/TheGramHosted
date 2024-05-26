const express = require("express");
const app = express();
const PORT = process.env.port || 5000;
const data = require("./data");
const cors = require("cors");
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");
const path = require("path");

app.use(cors());
require("./models/model");
require("./models/post");
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"));
mongoose.connect(mongoUrl);
mongoose.connection.on("connected", () => {
  console.log("connected to mongoose");
});
mongoose.connection.on("error", () => {
  console.log("Error in connecting to mongoose");
});

/*
app.get('/',(req,res)=>{
    res.json(data)
})

*/

//serving the front end
app.use(express.static(path.join(__dirname, "./frontend/thegram/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/thegram/build/index.html")),
    function (err) {
      res.status(500).send(err);
    };
});

app.listen(PORT, () => {
  console.log("Server is running on  " + PORT);
});
