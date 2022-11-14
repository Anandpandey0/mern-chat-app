const express = require('express')
const {
    chats
} = require("./data/data");
// const dotenv = require("dotenv");
// dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World! Hello')
})
app.get("/api/chat", (req, res) => {
    res.send(chats);
})
app.get("/api/data/:id", (req, res) => {
    // console.log(req);
    const singleChat = chats.find((c) => c._id == req.params.id);
    res.send(singleChat);
})

app.listen(5000, () => {
    console.log(`Example app listening on port ${PORT}`)
})