const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicationSchema = new Schema({
  medicine: {
    type: String,
    required: true,
  },

  dosage: {
    type: String,
  },
});

const prescriptionsSchema = new Schema(
  {
    patientID: {
      type: String,
      required: true,
    },
    doctorID: {
      type: String,
      required: true,
    },
    isFilled: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    medications: [medicationSchema],
    pdfFileID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "uploads.files",
    },
  },
  { timestamps: true }
);

const Prescriptions = mongoose.model("Prescriptions", prescriptionsSchema);
module.exports = Prescriptions;
