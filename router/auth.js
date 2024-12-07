const express = require("express");

const router = express.Router();

const db = require("../util/db");

const users = db.collection("Users");

router.post("/get-user", async (req, res, next) => {
  const email = req.body.email;
  const user = await users.findOne({ email });
  res.json(user);
});

router.post("/check-user", async (req, res, next) => {
  const email = req.body.email;
  const user = await users.findOne({ email });
  const isExist = user !== null;
  res.json({ isExist });
});

router.post("/new-user", async (req, res, next) => {
  const user = req.body.user;
  await users.insertOne(user);
  res.json({ message: "user created successfully😃😃" });
});

module.exports = router;
