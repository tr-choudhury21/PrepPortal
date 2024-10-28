const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require("./database/dbConnection");
const UserRoutes = require("./routes/userRoutes");
const DocumentRoutes = require("./routes/docRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes")

require("dotenv").config();

const PORT = process.env.PORT || 5000

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]  //Add your allowed headers here if needed.
}));
app.use(express.json());


//routes
app.use("/api/v1/auth", UserRoutes);
app.use("/api/v1/docs", DocumentRoutes);
app.use("/appointment", appointmentRoutes);


//database connection
dbConnection();


app.listen(PORT, ()=>{
    console.log(`Server started on Port ${PORT}`);
});