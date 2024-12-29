import express from "express";
import db from "../util/db";

const router = express.Router();

const users = db.collection("Users");

router.post("/get-user", async (req, res) => {
  const email = req.body.email;
  const user = await users.findOne({ email });
  res.json(user);
});

router.post("/check-user", async (req, res) => {
  const email = req.body.email;
  const user = await users.findOne({ email });
  const isExist = user !== null;
  res.json({ isExist });
});

router.post("/new-user", async (req, res) => {
  const user = req.body.user;
  await users.insertOne(user);
  res.json({ message: "user created successfully😃😃" });
});

export default router;
