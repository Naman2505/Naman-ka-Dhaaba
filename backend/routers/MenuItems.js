const express = require("express");

const router = express.Router();

//importing model

const MenuItems = require("./../models/MenuItem");

router.get("/",async(req,res)=>{
    try {
        const data = await MenuItems.find();
        console.log("Data fetched");
        res.status(200).json(data);
      } catch (err) {
        res.status(502).json({ error: "Error" });
    }
});

router.get("/:taste", async (req, res) => {
  try {
    const itemTaste = req.params.taste;
    if (["sweet", "spicy", "sour"].includes(itemTaste)) {
      const data = await MenuItems.find({ taste: itemTaste });
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (err) {
    res.status(502).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const itemData = new MenuItems(data);
    const response = await itemData.save();
    console.log("Data Filled");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(502).json({ error: "Internal Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const UpdatedData = req.body;
    const response = await MenuItems.findByIdAndUpdate(itemId, UpdatedData, {
      new: true,
    });
    if (!response) return res.status(404).json({ error: "Item not found" });
    res.status(200).json(response);
  } catch (err) {
    res.status(502).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const response = await MenuItems.deleteOne({ _id: itemId });
    if (!response) return res.status(404).json({ error: "Item not Found" });
    console.log("Data Deleted");
    res.status(200).json("Item deleted");
  } catch (error) {
    res.status(502).json({ error: "internal error" });
  }
});

module.exports = router;
