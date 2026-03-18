import Message from "../UserSchema/messageSchema.js";
import express from 'express';
import User from "../UserSchema/userSchema.js";

const router = express.Router();

//Router for save message in database 
router.post("/sendMessage/:senderId/:receiverId", async (req, res) => {

    try {

        const { receiverId, senderId } = req.params;
        const { message } = req.body;

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        await newMessage.save();

        res.status(201).json(newMessage);

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

//Router for show message in fronend
router.get("/getMessages/:senderId/:receiverId", async (req, res) => {

    try {

        const { senderId, receiverId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

//Router for get user whos login
router.get("/getUser", async (req, res) => {
  try {

    const search = req.query.search || "";

    const users = await User.find({
      name:{ $regex: search, $options: "i" }
    }).select("name email");

    res.status(200).json({
      success: true,
      users
    });

  } catch (err) {

    console.log("SERVER ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

export default router;