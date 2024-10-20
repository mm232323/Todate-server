import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json({ limit: "300mb" }));

app.listen(5000);
