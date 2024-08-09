const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");


module.exports.postAppointment = async(req,res,next) => {

    const {firstName, lastName, email, phone, year, semester, gender, appointment_date, department} = req.body;


    const appointment = await Appointment.create({firstName, lastName, email, phone, year, semester, gender, appointment_date, department});

    res.status(200).json({
        success: true,
        appointment,
        message: "Appointment Send!",
    });
};


module.exports.getAllAppointments = async(req, res, next) => {

    const appointments = await Appointment.find();

    res.status(200).json({
        success: true,
        appointments,
    });
};