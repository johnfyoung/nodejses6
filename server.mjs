import mongoose from "mongoose";
import Person from "./models/person.mjs";

mongoose.connect("mongodb://localhost:27017/person")

const data = [
    { fname: "John", lname: "Young" },
    { fname: "Jim", lname: "Tink" },
    { fname: "Sally", lname: "Gallean" },
    { fname: "Foofoo", lname: "Shepard" },
    { fname: "Bing", lname: "Washerman" }
];

const savePeople = async (data) => {
    return await (Promise.all(data.map(async p => {
        const person = new Person(p);
        return await person.save();
    })));
};

const findPeople = async () => {
    return await Person.find().exec();
};

const printPeople = async (people) => {
    return await people.map((p) => console.log(`${p.fname} ${p.lname}`));
};

const job = async (data) => {
    await savePeople(data);
    const people = await findPeople();
    await printPeople(people);
    mongoose.connection.close();
};

job(data);


