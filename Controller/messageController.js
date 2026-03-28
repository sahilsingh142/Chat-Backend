import { io, getReceiverSocketId } from '../Socket/socket.js'
import Conversation from '../UserSchema/conversation.js'
import Message from '../UserSchema/messageSchema.js';
import User from '../UserSchema/userSchema.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        const senderSocketId = getReceiverSocketId(senderId); // Get sender's socket ID as well

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        if (senderSocketId) {
            io.to(senderSocketId).emit("newMessage", newMessage); // Emit to sender as well
        }

        res.status(200).json(newMessage);
    } catch (error) {
        console.error("Error sending message:", error.stack || error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id; // current logged-in user
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, chatUser] },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error retrieving messages:", error.stack || error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getUser = async (req, res) => {
    try {
        const search = req.query.search || "";
        const users = await User.find({
            name: {
                $regex: search, $options: "i"
            }
        }).select("name email");
        res.status(200).json({ success: true, users });
    }
    catch (err) {
        console.log("SERVER ERROR:", err);
        res.status(500).json({ success: false, error: err.message });
    }
}