require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

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
    name: "Miguel",
    age: 28,
    favoriteFoods: ["Pizza", "Pasta"]
  })

  mySelf.save((err, data) => {
    if (err) {
      return console.error(err)
    } else {
      done(null, data)
    }
  });
};


exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;