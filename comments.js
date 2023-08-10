//Create web server
const express = require('express');
const app = express();
//Create a port
const port = 3000;
//Create a mongoose
const mongoose = require('mongoose');
//Create a schema
const Schema = mongoose.Schema;
//Connect to mongodb
mongoose.connect('mongodb://localhost:27017/itc-ecommerce-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//Create a model
const Comment = mongoose.model('Comment', {
    comment: String,
    product_id: String,
    user_id: String,
    c_date: Date
});
//Create a route
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        res.send(comments);
    });
});
//Run the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
