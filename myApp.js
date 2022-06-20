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
//Person.create(arrayOfPeople); // uncomment to load arrayOfPeople into person model
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      return console.error(err)
    } else {
      done(null, data)
    }
  })
};

// Model.find() returns an array of occurrences
const findPeopleByName = (personName, done) => {
  // executes, passing results to callback
  Person.find({ name: personName }, (err, docs) => {
    if (err) {
      console.error(err);
    } else {
      done(null, docs);
    }
  });
};

// Model.findOne only one document (not an array)
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, docs) => {
    if (err) {
      console.log(err)
    } else {
      done(null, docs);
    }
  })
};

// Model.findById will find a record by its unique id

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, doc) => {
    if (err) {
      console.error(err);
    } else {
      done(null, doc)
    }
  })
}

// Exports 

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createManyPeople = createManyPeople;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;