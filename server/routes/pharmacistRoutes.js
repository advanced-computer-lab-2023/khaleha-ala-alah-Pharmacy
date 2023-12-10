const { CheckAuth } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const pharmacistController = require("../controllers/pharmacistControllers");

// router
router.post("/addMedicine", CheckAuth, pharmacistController.addMedicine);
router.get(
  "/:medicineId/medicine-details",
  pharmacistController.getMedicineDetails
);
router.put("/:medicineId/edit-medicine", pharmacistController.updateMedicine);
router.get("/allpharmacists", pharmacistController.allpharmacists);
router.patch("/archiveMedicine", pharmacistController.archiveMedicine);
router.patch("/unarchiveMedicine", pharmacistController.unarchiveMedicine);
router.get(
  "/medicine-sales-report/:year/:month",
  pharmacistController.getMedicineSalesReport
);
module.exports = router;
