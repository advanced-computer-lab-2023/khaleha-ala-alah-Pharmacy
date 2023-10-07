const { CheckAuth } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const patientController = require("./../controllers/patientController");



// router
//     .route('/')
//     .get(patientController.getAllPatients)
//     .post(patientController.createPatient);

router.get('/mydoctors',CheckAuth, patientController.getMyDoctors);
router.get("/:id", patientController.getPatients);
router.patch("/add-family-members", CheckAuth ,patientController.addFamilyMembers);
router.get('/presecriptions', CheckAuth, patientController.getPerscriptions);


module.exports = router;
