const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure uniqueness
    },
    pictureUrl: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    sales: {
        type: Number,
        default: 0,
    },
    availableQuantity: {
        type: Number,
        required: true,
    },
    activeIngredients: {
        type: [String],
        required: true,
    },
    // You can add more fields as needed
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
