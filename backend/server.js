const express = require('express')
const {
    chats
} = require("./data/data");
const app = express()
const port = 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get("/api/data", (req, res) => {
    res.send(chats);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})