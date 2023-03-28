import messageModel from "../schema/message.js";

export const messageController = async (req, res) => {
  const newMessage = new messageModel(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).send(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMessageController = async (req, res) => {
  try {
    const newMessage = await messageModel.find();
    res.status(200).json(newMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};
