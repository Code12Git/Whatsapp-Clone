import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: String,
  name: String,
  timestamps: String,
  received: Boolean,
});

const messageModel = mongoose.model("messages", messageSchema);

export default messageModel;
