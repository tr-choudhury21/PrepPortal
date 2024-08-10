const mongoose = require("mongoose");
const validator = require("validator");

const appointmentSchema = new mongoose.Schema({
    requestPerson:{
        type:String,
        required:true,
        minLength: [3, "First Name must contain atleast 3 characters."]
    },

    firstName:{
        type: String,
        required: true,
        minLength: [3, "First Name must contain atleast 3 characters."]
    },

    lastName:{
        type: String,
        required: true,
        minLength: [3, "Last Name must contain atleast 3 characters."]
    },

    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a Valid Email."]
    },

    phone:{
        type: Number,
        required: true,
    },

    year:{
        type: Number,
        required: true,
    },

    semester:{
        type: Number,
        required: true,
    },

    gender:{
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },

    appointment_date: {
        type: String,
        required: [true, "Appointment Date Is Required!"],
    },

    department: {
        type: String,
        required: [true, "Department Name Is Required!"],
    },

    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
})


module.exports = mongoose.model('Appointment', appointmentSchema);