import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';

//import express from 'express';
//import bodyParser from 'body-parser'; 
//import { MongoClient } from 'mongodb';
//import path from 'path';

//create web server 
const app = express();

//connect to mongodb
MongoClient.connect('mongodb://localhost:27017/test', (err, db) => {
  if (err) throw err;
  console.log('Connected to MongoDB');

  //use body parser to parse json data
  app.use(bodyParser.json());

  //serve static files from the dist directory
  app.use(express.static(path.join(__dirname, '/dist')));

  //get comments from mongodb
  app.get('/api/comments', (req, res) => {
    db.collection('comments').find({}).toArray((err, comments) => {
      if (err) throw err;
      res.json(comments);
    });
  });

  //add new comment to mongodb
  app.post('/api/comments', (req, res) => {
    const newComment = {
      text: req.body.text,
      id: Date.now(),
    };
    db.collection('comments').insertOne(newComment, (err, result) => {
        if (err) throw err;
        res.json(result.ops[0]);
        });
    });
});
