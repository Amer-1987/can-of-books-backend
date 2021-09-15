'use strict';


require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const server = express();
const cors = require('cors');

server.use(cors());

// to access req.body
server.use(express.json());

const PORT = process.env.PORT;


main().catch(err => console.log(err));

let LibraryModel;
async function main() {
  await mongoose.connect('mongodb://localhost:27017/Book');

  const BookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    email: String
  });


  LibraryModel = mongoose.model('book', BookSchema);

  // seedingData();
}


// Function to Seed data
async function seedingData() {

  const firstBook = new LibraryModel({
    title: 'Quran',
    description: 'Healing for what is in the breasts',
    status: 'came down from heaven',
    email: 'ameralqanahrah1238@gmail.com'

  });

  const secondBook = new LibraryModel({
    title: 'THE SUN ALSO RISES ',
    description: 'More Ecclesiastes! This particular quotation is from 1:5, which states that The sun also ariseth, and the sun goeth down, and hasteth to his place where he arose. Hemingway’s modernist novel came out in 1926.',
    status: 'puplished',
    email: 'ameralqanahrah1238@gmail.com'
  });

  const thirdBook = new LibraryModel({
    title: 'BRAVE NEW WORLD ',
    description: 'This is possibly the most famous book to take its title from a Shakespeare play – in this case, The Tempest.',
    status: 'puplished',
    email: 'ameralqanahrah1238@gmail.com'
  });

  await firstBook.save();
  await secondBook.save();
  await thirdBook.save();

}


server.get('/', (req, res) => {
  res.send('Hello, you are in main Page');
})

server.get('/getBook', getBookFunction);
server.post('/addBook', addBookFunction);
server.delete('/deleteBook/:id', deleteBookFunction);
server.put('/updateBook/:id', updateBookFunction);



//  
function getBookFunction(req, res) {
  const email = req.query.email;
  LibraryModel.find({ email: email }, (error, result) => {
    if (error) {
      console.log('404 ERROR');
    }
    else {
      // console.log(result);
      res.send(result);
    }
  })
}

async function addBookFunction(req, res) {
  //  console.log(req.query); it is empty because we use post, so we use (reg.body)
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  const email = req.body.email;
  // console.log(req.body);


  //we can use this line instesd of previous 4 line up :(shorter way)if your var hav the same of key name in schema  
  // const {title,description,email}=req.body;

  await LibraryModel.create({
    title: title,
    description: description,
    status: status,
    email: email
  });

  // we can use this line instesd of 4 line up if your var have the same of key name in schema  

  // await LibraryModel.create({title,description,status,email});


  LibraryModel.find({ email: email }, (error, result) => {
    if (error) {
      console.log('404 ERROR');
    }
    else {
      // console.log(result);
      res.send(result);
    }
  })
}


async function deleteBookFunction(req, res) {
  //  console.log(req.query); it is empty because we use post, so we use (reg.params) contain id that we want to delete it
  const bookId = req.params.id;
  const email = req.query.email;


  await LibraryModel.deleteOne({ _id: bookId }, (err, result) => {
    console.log(result);
    LibraryModel.find({ email: email }, (error, result) => {
      if (error) {
        console.log('404 ERROR');
      }
      else {
        // console.log(result);
        res.send(result);
      }
    })
  })
}


async function updateBookFunction(req, res) {
  //  console.log(req.query); it is empty because we use findByIdAndUpdate, so we use (reg.params) contain id that we want to delete it
  const bookId = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  const email = req.body.email;

  await LibraryModel.findByIdAndUpdate(
    bookId,
    { title, description, status, email }, (err, result1) => {
    })
    .catch(err => {
      console.log(Error);
    })
    .then(() => {
      // console.log(email);
      LibraryModel.find({ email: email }, (err, result) => {
        if (error) {
          console.log('404 ERROR');
        }
        else {
          console.log(result);
          res.send(result);
        }
      })
    })
}

server.listen(PORT, () => {
  console.log(`I'm listening on Port ${PORT}`)
});