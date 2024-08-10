const express = require("express")
const router = express.Router()
const {postAppointment, acceptAppointmentRequest,getAllAppointmentRequests} = require("../controllers/appointmentController")

router.post("/appointment-request", postAppointment);
router.post("/accept-appointment/:appointmentId", acceptAppointmentRequest)
router.get("/appointments/:requestPerson", getAllAppointmentRequests)

module.exports = router;