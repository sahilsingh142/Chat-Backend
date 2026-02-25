import express from 'express'

const app = express();

app.get('/', (req,res) => {
    res.send("Hello Backend")
})
const PORT = process.env.PORT
app.listen(PORT,console.log("Connected"));