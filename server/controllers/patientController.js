const Patient = require("../models/users/patientModel");
const Doctors = require("../models/users/doctorModel");
const Appointments = require("./../models/appointmentModel");
const Prescriptions = require("./../models/presecriptionsModel.js");

//examples

//examples -- we need api bellow to test with them
// get patient and create patient written here to test add family members

// get all patients

exports.getMyDoctors = async function (req, res) {
  try {
    const patient = req.user._id;
    const doctorIds = await Appointments.distinct("DoctorID", {
      PatientID: patient,
    });
    const doctors = await Doctors.find({ userID: { $in: doctorIds } });
    const doctorNames = doctors.map((doctor) => {
      doctor.name, doctor.speciality;
    });
    res.status(200).json({
      doctorNames,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};
exports.getAllPatients = async function (req, res) {
  try {
    const patients = await Patient.find();
    res.status(200).json({
      status: "success",
      results: patients.length,
      data: {
        patients,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.getPatients = async function (req, res) {
  try {
    const patient = await Patient.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user: patient,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.createPatient = async function (req, res) {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newPatient,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};

exports.addFamilyMembers = async function (req, res) {
  try {
    const patient = await Patient.find({ userID: req.user._id });

    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }

    // Create a new family member based on the request body
    const newFamilyMember = {
      name: req.body.name,
      nationalID: req.body.nationalID,
      age: req.body.age,
      gender: req.body.gender,
      relationToPatient: req.body.relationToPatient,
    };

    // Add the new family member to the patient's familyMembers array
    patient.familyMembers.push(newFamilyMember);

    // Save the patient with the updated familyMembers array
    const updatedPatient = await patient.save();

    res.status(201).json(updatedPatient);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Server error",
    });
  }
};
exports.getPerscriptions = async function (req, res) {
  try {
    const prescriptions = await Patient.find({
      PatientID: req.user._id,
    });
    const allDoctors = await Doctors.find();
    const doctors = [];

    for (let i = 0; i < allDoctors.length; i++) {
      for (let j = 0; j < doctorsID.length; j++) {
        if (allDoctors[i]._id == doctorsID[j].DoctorID) {
          doctors.push(allDoctors[i]);
          break;
        }
      }
    }
    res.status(200).json({
      status: "success",
      results: prescriptions.length,
      data: {
        prescriptions,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};
exports.getPatientPrescribtions = async function (req, res) {
  try {
    const presecriptions = await Prescriptions.find({
      PatientID: req.user._id,
    });
    res.status(200).json({
      presecriptions,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "this route is not defined yet",
    });
  }
};
