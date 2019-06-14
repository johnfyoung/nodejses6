import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    }
});

const Person = mongoose.model("person", PersonSchema);

export default Person;