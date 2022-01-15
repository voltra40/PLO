const { Router } = require("express");
const BucketListItem = require("./models/BucketListItem");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const bucketListItems = await BucketListItem.find();
    if (!bucketListItems) throw new Error("No bucketListItems");

    const sorted = bucketListItems.sort((a, b) => {
      return new Date(a.date).getTime - new Date(b.date).getTime();
    });
    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const newBucketListItem = new BucketListItem(req.body);
  try {
    const bucketListItem = await newBucketListItem.save();
    console.log("attempting to create new item");
    if (!bucketListItem) throw new Error("Cannot create newBucketListItem");

    res.status(200).json(newBucketListItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  // checks if item exists, standard
  try {
    const response = await BucketListItem.findByIdAndUpdate(id, req.body);
    if (!response) throw Error("Something went wrong");
    //altered
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  // checks if item exists, standard
  try {
    const removed = await BucketListItem.findByIdAndDelete(id);
    if (!removed) throw Error("Something went wrong");
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
