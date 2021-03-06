const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const morgan = require("morgan");
const api = require("./routes/api");
const mongoose = require("mongoose");
//const image = require("./routes/image");

//MiddleWare
app.use(
  bodyParse.urlencoded({
    limit: "50mb",
    extended: true
  })
);
app.use(bodyParse.json({ limit: "50mb", extended: true }));
app.use(morgan("dev"));

//Prevent CORS And Allow PUT,POST,DELETE,PATCH,GET
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET");
    return res.status(200).json({});
  }
  next();
});

// GCP API
app.use("/api", api);
//app.use("/image", image);

app.get("/", (req, res) => {
  res.send({ msg: "Hello World" });
});

// Enter ur mongodb
mongoose.connect("", { useNewUrlParser: true });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Running Server at " + port));
