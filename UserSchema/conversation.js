import mongoose from "mongoose";
import User from './userSchema.js'
import Message from './messageSchema.js'

const conversationSchema = mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Message
        }
    ]
}, { timestamps: true });

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation; 