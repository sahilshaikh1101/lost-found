// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // store hashed password
  phone: String,
  role: {
    type: String,
    enum: ["Student", "Faculty"],
    default: "Student"
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
