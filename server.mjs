// this is ES6 module import syntax 
import mongoose from "mongoose";
import Person from "./models/person.mjs";

// mongoose ODM data connection.
mongoose.connect("mongodb://localhost:27017/person")

const data = [
    { fname: "John", lname: "Young" },
    { fname: "Jim", lname: "Tink" },
    { fname: "Sally", lname: "Gallean" },
    { fname: "Foofoo", lname: "Shepard" },
    { fname: "Bing", lname: "Washerman" }
];

/**
 * Save all of the people in the database
 * 
 * @param {Object} data 
 * @returns {Promise}
 */
const savePeople = (data) => {
    return (Promise.all(data.map(p => {
        const person = new Person(p);
        return person.save();
    })));
};

const findPeople = () => {
    return Person.find().exec();
};

const printPeople = (people) => {
    return people.map((p) => console.log(`${p.fname} ${p.lname}`));
};

const job = async (data) => {
    await savePeople(data);
    const people = await findPeople();
    await printPeople(people);

    // without this, the application will hang. It has to be the last thing that happens, otherwise our dtabase operations won't work.
    mongoose.connection.close();
};

job(data);