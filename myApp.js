require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// Define mongoose.schema in Schema const
const Schema = mongoose.Schema;

// Define the personSchema schema
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

// Define the Person model
const Person = mongoose.model('Person', personSchema);

// Create a new Person instance called mySelf

const createAndSavePerson = function (done) {
  const mySelf = new Person({
    name: "Moni",
    age: 28,
    favoriteFoods: ["Sushi", "Fajitas", "Pasta"]
  })

  mySelf.save((err, data) => {
    if (err) {
      return console.error(err)
    } else {
      done(null, data)
    }
  });
};

//createAndSavePerson();

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;