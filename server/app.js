const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const multer = require("multer");
const Medicine = require("./models/medicine");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Set the destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname); // Set the filename
  },
});

const upload = multer({ storage: storage });

const adminRouter = require("./routes/adminstratorRoutes");
const patientRouter = require("./routes/patientRoutes");
const Pharmacist = require("./models/users/pharmacist");

const pharmacistRouter = require("./routes/pharmacistRoutes");
//1) middleware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); // middleware is function to modify incoming requested data
app.use(express.static(`${__dirname}/public`)); // to serve static files
app.use(cors()); // to allow all cors requests

//2) routes

const setMedicinePhoto = async function (req, res) {
  try {
    console.log(req.file); // Access uploaded file via req.file
    const medicine = await Medicine.findById(req.body.medicineId);
    medicine.pictureUrl = "http://localhost:4000/uploads/" + req.file.filename;
    await medicine.save();

    res.status(200).json({
      status: "success",
      data: {
        medicine,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "An error occurred while setting medicine photo.",
    });
  }
};

module.exports = setMedicinePhoto;

app.patch(
  "/patients/setMedicineImage",
  upload.single("profileFile"),
  setMedicinePhoto
);

app.use("/admins", adminRouter);
app.use("/pharmacists", pharmacistRouter);
app.use("/patients", patientRouter);
app.use("/users", require("./routes/userRoute"));

module.exports = app;
