const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");


module.exports.postAppointment = async(req,res,next) => {

    const {requestPerson, firstName, lastName, email, phone, year, semester, gender, appointment_date, department} = req.body;

    try {
        const existing_appointment = await Appointment.findOne({requestPerson: requestPerson, firstName: firstName, appointment_date: appointment_date})

        if(existing_appointment){
            return res.status(400).json({message:'Appointment exists'})
        }

        const appointment = await Appointment.create({requestPerson, firstName, lastName, email, phone, year, semester, gender, appointment_date, department});
        res.status(201).send(appointment);

        
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
        console.log(error);
        
    }
    


    
};

module.exports.acceptAppointmentRequest = async(req,res)=>{
    const appointmentId = req.params.appointmentId;

    try {
        const approve = await Appointment.findByIdAndUpdate(appointmentId, {status: "Accepted"}, {new: true})

        if(approve){
            res.status(200).json({message: "Appointment accepted!"});
        }else{
            res.status(404).json({message: "Appointment not found"});
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
        console.log(error);
        
    }
}

module.exports.getAllAppointmentRequests = async(req, res, next) => {
    const requestPerson  = req.params.requestPerson;
    // const firstName = req.params.firstName;

    try{
        const appointmentRequests = await Appointment.find({
            requestPerson: requestPerson,
            status: "Pending"
        });

        if(!appointmentRequests){
            return res.status(404).json({message: "appointments not found"})
        }
        res.status(200).json(appointmentRequests);
    }catch(error){
        res.status(500).json({message: "Internal server error"});
        console.log(error);
    }
    
};