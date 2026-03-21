import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './Router/userRouter.js';
import mongoose from 'mongoose';
import messageRouter from './Router/messageRouter.js';
import { app, server } from './Socket/socket.js';

dotenv.config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRouter);
app.use('/api', messageRouter);

const mongoUrl = process.env.MONGO_URL;
await mongoose.connect(mongoUrl)
    .then(()=>{
        console.log("Mongodb has connected")
    })

app.get('/', (req,res) => {
    res.send("Hello Backend")
})


const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log("Connected");
});