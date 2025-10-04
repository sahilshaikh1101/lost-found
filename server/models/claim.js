// models/Claim.js
import mongoose from "mongoose";

const claimSchema = new mongoose.Schema({
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true
  },
  claimant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  claim_date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Claim", claimSchema);
