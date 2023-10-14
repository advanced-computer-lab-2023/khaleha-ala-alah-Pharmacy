// its good practice that everything related to server in main file 
// and everything related to express in another file
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Patient = require('./models/users/patientModel');
dotenv.config({path: './config.env'});
const DB = process.env.DATABASE.replace('<DATABASE_PASSWORD>',process.env.DATABASE_PASSWORD);
const pharmacist = require('./models/users/pharmacist');  
const medicine = require('./models/medicine');




mongoose
    .connect(DB)
 .then(() => {
    console.log('DB connection successful!');


    // Define a Mongoose schema and model for your 'pharmacists' collection


 });

//4) start server
const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`app is running on ${port}....`);
})
