import express from "express";
import connection from "./db/conn.js";
import messageroute from "./routes/message.js";
import Pusher from "pusher";
import mongoose from "mongoose";
import cors from "cors";
//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1574913",
  key: "895b9d9ff49d9ca2cfdb",
  secret: "2ac090ca39aca1e9ee81",
  cluster: "ap2",
  useTLS: true,
});

//middleware
app.use(express.json());
app.use(cors());
app.use("/api/v1", messageroute);

//database
connection();

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messages");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("A change occured...", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        received: messageDetails.received,
      });
    } else {
      console.log("Enter triggering Pusher");
    }
  });
});

//Test port
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

//Server port
app.listen(port, () => {
  console.log(`Server is up on PORT: ${port}`);
});
