"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database = require("./database");
const db = database.client.db("Todate");
module.exports = db;
