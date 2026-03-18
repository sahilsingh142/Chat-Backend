import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import chatRouter from './Router/chatRouter.js';
import mongoose from 'mongoose';
import message from './Router/message.js';

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', chatRouter);
app.use('/api', message);

const mongoUrl = process.env.MONGO_URL;
await mongoose.connect(mongoUrl)
    .then(()=>{
        console.log("Mongodb has connected")
    })

app.get('/', (req,res) => {
    res.send("Hello Backend")
})


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Connected");
});