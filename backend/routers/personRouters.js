const express = require("express");

const router = express.Router();

//importing model
const Person = require("./../models/person");

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data fetched");
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: "Error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const personWork = req.params.workType;
    if (["chef", "waiter", "manager"].includes(personWork)) {
      const data = await Person.find({ work: personWork });
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (err) {
    res.status(502).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const personData = new Person(data);
    const response = await personData.save();
    console.log("Data Filled");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(502).json({ error: "Internal Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const UpdatedData = req.body;
    const response = await Person.findByIdAndUpdate(personId, UpdatedData, {
      new: true,
    });
    if (!response) return res.status(404).json({ error: "Person not found" });
    res.status(200).json(response);
  } catch (err) {
    res.status(502).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.deleteOne({ _id: personId });
    if (!response) return res.status(404).json({ error: "Person not Found" });
    console.log("Data Deleted");
    res.status(200).json("Person deleted");
  } catch (error) {
    res.status(502).json({ error: "internal error" });
  }
});

module.exports = router;
