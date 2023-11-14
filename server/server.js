// its good practice that everything related to server in main file 
// and everything related to express in another file
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Patient = require('./models/users/patientModel');
dotenv.config({path: './config.env'});
const DB = process.env.DATABASE.replace('<DATABASE_PASSWORD>',process.env.DATABASE_PASSWORD);
const pharmacist = require('./models/users/pharmacist');  
const medicine = require('./models/medicine');
const {GridFsStorage} = require('multer-gridfs-storage');
const multer = require('multer');




mongoose
    .connect(DB)
 .then(() => {
    console.log('DB connection successful!');
 });

//gridFS
const conn = mongoose.createConnection(DB);
let gfs;
conn.once('open',()=>{
    gfs = new mongoose.mongo.GridFSBucket(conn.db,{bucketName:'uploads'});
})
//storage engine
const storage = new GridFsStorage({
    url: DB,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
            try{
                const fileInfo = {
                    filename: file.originalname, 
                    bucketName: 'uploads',
                };
                resolve(fileInfo);
            }catch(err){
                reject(err);
            }
        });
    }
});
  
exports.upload = multer({storage});

//4) start server
const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`app is running on ${port}....`);
})
