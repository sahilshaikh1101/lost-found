import express from "express";
import Claim from "../models/claim.js";
import Item from "../models/item.js";

const router = express.Router();

// Create a claim
router.post("/", async (req, res) => {
  try {
    const { item_id, claimant_id } = req.body;

    // Mark item as claimed
    const item = await Item.findByIdAndUpdate(item_id, { status: "claimed" }, { new: true });
    if (!item) return res.status(404).json({ error: "Item not found" });

    const claim = new Claim({ item_id, claimant_id });
    await claim.save();

    res.status(201).json(claim);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all claims
router.get("/", async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate("item_id", "title category")
      .populate("claimant_id", "name email");
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single claim
router.get("/:id", async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id)
      .populate("item_id", "title category")
      .populate("claimant_id", "name email");
    if (!claim) return res.status(404).json({ error: "Claim not found" });
    res.json(claim);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete claim
router.delete("/:id", async (req, res) => {
  try {
    const claim = await Claim.findByIdAndDelete(req.params.id);
    if (!claim) return res.status(404).json({ error: "Claim not found" });

    // Optional: mark item as active again
    await Item.findByIdAndUpdate(claim.item_id, { status: "active" });

    res.json({ message: "Claim deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
