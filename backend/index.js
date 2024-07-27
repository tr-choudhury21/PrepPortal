const express = require("express");
const cors = require("cors");
const dbConnection = require("./database/dbConnection");
const UserRoutes = require("./routes/userRoutes");

require("dotenv").config();

const PORT = process.env.PORT || 5000

const app = express();

app.use(cors());
app.use(express.json());


//routes
app.use("/api/auth", UserRoutes);


//database connection
dbConnection();


app.listen(PORT, ()=>{
    console.log(`Server started on Port ${PORT}`);
});