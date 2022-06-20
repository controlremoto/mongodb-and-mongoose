require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define mongoose.schema in Schema const
const Schema = mongoose.Schema;

// Define the personSchema schema
const personSchema = new Schema({ name: { type: String, required: true }, age: Number, favoriteFoods: [String] })

// Define the Person model
const Person = mongoose.model('Person', personSchema);

// Create a new Person instance called mySelf

const createAndSavePerson = function (done) {
  const mySelf = new Person({ name: "Miguel", age: 28, favoriteFoods: ["Pizza", "Pasta"] })

  mySelf.save((err, data) => {
    if (err) {
      return console.error(err)
    } else {
      done(null, data)
    }
  });
};

const arrayOfPeople = [
  { name: "Phillip Anthropy", age: 28, favoriteFoods: ["Sushi", "Fajita", "Pasta"] },
  { name: "Lance Bogrol", age: 27, favoriteFoods: ["Rice", "Salad"] },
  { name: "Bodrum Salvador", age: 43, favoriteFoods: ["Deer", "Chicken", "Ribs"] }
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      return console.error(err)
    } else {
      done(null, data)
    }
  })
};
// Exports 

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createManyPeople = createManyPeople;