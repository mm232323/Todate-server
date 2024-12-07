const express = require("express");

const bodyParser = require("body-parser");

const authRoutes = require("./router/auth");

const mainRoutes = require("./router/main");

const app = express();

app.use(bodyParser({ extended: false }));

app.use("/auth", authRoutes);

app.use(express.static("./output"));

app.use("/", mainRoutes);

app.use("/", (req, res, next) => {
  res.send("<h1>hello world</h1>");
});

app.listen(5000);
