// models/Item.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: {
    type: String,
    enum: ["lost", "found"],
    required: true
  },
  location: String,
  image_url: String,
  status: {
    type: String,
    enum: ["active", "claimed"],
    default: "active"
  },
  date_reported: {
    type: Date,
    default: Date.now
  },
  reported_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

export default mongoose.model("Item", itemSchema);
