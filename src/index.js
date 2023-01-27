const express = require('express');
const route = require('./routes/route');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://Backend-Developer:VOsRhEoMTbd0U6U6@cluster0.a48nwas.mongodb.net/User-like-CommentDataBase?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))


app.use('/', route)

let PORT = 3000;
app.listen(PORT, () => {
    console.log(`Express app running on port  ${PORT}`)
});