const express = require("express");

const router = express.Router();

const db = require("../util/db");

const contacts = db.collection("Contacts");

const users = db.collection("Users");

const path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../output"));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "--" + Date.now() + ".jpg");
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

router.post("/contact", async (req, res, next) => {
  const contactMes = req.body.contactMes;
  await contacts.insertOne(contactMes);
  res.json({ message: "contact message sent successfully 🙂 🙂 🙂" });
});

router.post(
  "/set-avatar/:email",
  upload.single("image"),
  async (req, res, next) => {
    const email = req.params.email;
    const avatar = req.file;
    await users.updateOne({ email }, { $set: { avatarName: avatar.filename } });
    return res.send(JSON.stringify({ message: "THE AVATAR CHANGED😊" }));
  }
);

router.get("/get-avatar/:email", async (req, res, next) => {
  const email = req.params.email;
  const user = await users.findOne({ email });
  res.json({ avatar: user.avatarName });
});

router.get("/get-user/:email", async (req, res, next) => {
  const email = req.params.email;
  const user = await users.findOne({ email });
  res.json(user);
});

router.post("/update-props", async (req, res, next) => {
  const props = req.body.props;
  const email = props.email;
  await users.updateOne(
    { email },
    {
      $set: {
        name: props.name,
        phone: props.phone,
        job: props.job,
        gender: props.gender,
      },
    }
  );
  res.json({ message: "user updated successfully 🌝 🌝 🌝" });
});

router.post("/create-todo", async (req, res, next) => {
  const email = req.body.email;
  const todo = req.body.todo;
  const user = await users.findOne({ email });
  user.dailies.todos.push(todo);
  await users.deleteOne({ email });
  await users.insertOne(user);
  res.json({ message: "todo added successfully 📔 📔 📔" });
});

router.post("/create-mission", async (req, res, next) => {
  const email = req.body.email;
  const mission = req.body.mission;
  const user = await users.findOne({ email });
  user.dailies.missions.push(mission);
  await users.deleteOne({ email });
  await users.insertOne(user);
  res.json({ message: "mission added successfully 📔 📔 📔" });
});

router.post("/create-quant", async (req, res, next) => {
  const email = req.body.email;
  const quantity = req.body.quantity;
  const user = await users.findOne({ email });
  user.dailies.quantities.push(quantity);
  await users.deleteOne({ email });
  await users.insertOne(user);
  res.json({ message: "quantity added successfully 📔 📔 📔" });
});

router.post("/get-tasks", async (req, res, next) => {
  const email = req.body.email;
  const user = await users.findOne({ email });
  const tasks = user.dailies;
  res.json(tasks);
});

router.post("/set-todo-statue", async (req, res, next) => {
  const email = req.body.email;
  const todoID = req.body.todoId;
  const statue = req.body.statue;
  const user = await users.findOne({ email });
  user.dailies.todos = user.dailies.todos.map((todo) =>
    todo.todo_id == todoID ? { ...todo, todo_statue: statue } : todo
  );
  await users.deleteOne({ email });
  await users.insertOne(user);
  res.json({ message: "todo statue changed successfully" });
});

router.post("/handle-quant-comp", async (req, res, next) => {
  const email = req.body.email;
  const quantId = req.body.quantId;
  const increaser = req.body.increaser;
  const user = await users.findOne({ email });
  user.dailies.quantities = user.dailies.quantities.map((quant) =>
    quant.quant_id == quantId
      ? { ...quant, completed: quant.completed + increaser }
      : quant
  );
  await users.deleteOne({ email });
  await users.insertOne(user);
  res.json({ message: "quant handled successfully 😃 😃 😃" });
});

router.post("/remove-mission", async (req, res, next) => {
  const email = req.body.email;
  const missionId = req.body.mission_id;
  const user = await users.findOne({ email });
  user.dailies.missions = user.dailies.missions.filter(
    (mission) => mission.mission_id !== missionId
  );
  await users.deleteOne({ email });
  await users.insertOne(user);
  res.json({ message: "mission removed successfully 😃 😃 😃" });
});

router.post("/update-mission", async (req, res, next) => {
  const { updatedMission, missionId, email } = req.body;
  const user = await users.findOne({ email });
  user.dailies.missions = user.dailies.missions.map((mission) =>
    mission.mission_id === missionId ? updatedMission : mission
  );
  await users.deleteOne({ email });
  await users.insertOne(user);
  res.json({ message: "mission updated successfully 😄 😄 😄" });
});

module.exports = router;
