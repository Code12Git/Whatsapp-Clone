import express from "express";
import {
  getMessageController,
  messageController,
} from "../controller/messageController.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Route is working Properly!" });
});
router.post("/messages/new", messageController);
router.get("/messages/sync", getMessageController);

export default router;
