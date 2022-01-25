const express = require("express");
const { model, Schema } = require("mongoose");

const sleepRouter = express();

const sleepEntry = model('Sleep Entry', new Schema({ date: String, sleep: String, wake: String }));

sleepRouter.get('/', async (req, res) => {
  try {
    const sleepEntries = await sleepEntry.find();
    if (!sleepEntries) throw new Error("No sleepEntries");
    res.status(200).json(sleepEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

sleepRouter.post('/', async (req, res) => {
  const newSleepEntry = new sleepEntry(req.body);
  try {
    const sleepEntry = await newSleepEntry.save();
    if (!sleepEntry) throw new Error("Cannot create new sleep entry");
    res.status(200).json(sleepEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

sleepRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await sleepEntry.findByIdAndUpdate(id, req.body);
    if (!response) throw Error("Something went wrong");
    // this allows for front end to update asynchronously
    const updated = { ...response._doc, ...req.body};
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

sleepRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await sleepEntry.findByIdAndDelete(id);
    if (!removed) throw Error("Something went wrong");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = sleepRouter;