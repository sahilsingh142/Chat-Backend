import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({

    participant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "chatData"
    }],

    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "message",
        default: []
    }]
}, { timestamps: true })

const Conversation = mongoose.model("conversation", conversationSchema);

export default Conversation;