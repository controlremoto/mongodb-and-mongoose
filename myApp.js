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
  Person.find({ name: personName }, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      done(null, data);
    }
  });
};

// Model.findOne only one document (not an array)
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      done(null, data);
    }
  })
};

// Model.findById will find a record by its unique id

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      done(null, data)
    }
  })
}

// Find a record by its ID and update by adding a new value to favoriteFoods array
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    console.log("[findById] data:", data);
    if (err) {
      console.error(err);
    } else {
      data.favoriteFoods.push(foodToAdd);
      data.save((err, data) => {
        console.log("[save] data:", data);
        if (err) {
          console.error(err);
        } else {
          done(null, data);
        }
      })
    }
  })
}

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  console.log("personName:", personName);
  Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      done(null, data);
    }
  });
}

// Use removeById to remove a document by its _id
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      done(null, data);
    }
  })
}

// Delete Many Documents with model.remove()

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      done(null, data);
    }
  })
}

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if (err) {
        console.error(err);
      } else {
        done(null, data);
      }
    });
};



// Exports 

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createManyPeople = createManyPeople;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;