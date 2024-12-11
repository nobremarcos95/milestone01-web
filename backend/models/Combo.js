import mongoose, { mongo } from "mongoose";

const comboSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: Array, required: true },
  price: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model('Combo', comboSchema);