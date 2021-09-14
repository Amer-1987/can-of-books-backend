'use strict';


require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const server = express();
const cors = require('cors');

server.use(cors());

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

  seedingData();
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


server.listen(PORT, () => {
  console.log(`I'm listening on Port ${PORT}`)
});