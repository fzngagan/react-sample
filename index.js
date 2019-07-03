const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const conn = mongoose.connect('mongodb://localhost:27017/react-sample', {useNewUrlParser: true});
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Note = new Schema({
    postId: ObjectId,
    title: String,
    body: String,
    date: Date,
});

var NoteMod = mongoose.model("Note", Note);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {

     NoteMod.find(function(err,docs){

         res.json(docs)
    })
    
    /**
     * fetch data from mongo db
     * 
     */
    
    
    
});

app.post('/api/addNote', (req, res) => {
    //get the data in request object
    // create a mongo model, validate the data and persist to db
    note = {
        title:req.body.noteTitle,
        desc:req.body.noteDesc
    }
    NoteObj = new NoteMod({
        title:req.body.noteTitle,
        body:req.body.noteDesc
    })
    NoteObj.save()
    .then(item=>{console.log(item)
        console.log('saved to db')
    })
});

app.put('/api/editNote', (req, res) => {
    //check how to update the notes
});

// Handles any requests that don't match the ones above
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);