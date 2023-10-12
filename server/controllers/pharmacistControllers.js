const Medicine = require('../models/medicine'); // Import the Medicine model
 // Import the Medicine model
// Import the Medicine model
// search for medicine based on name
const searchMedicine = async (req, res) => {
    try {
      const { name } = req.query;
      const regex = new RegExp(`^${name}`, 'i'); // Create a case-insensitive regex for prefix search
      const medicines = await Medicine.find({ name: { $regex: regex } });
      res.status(200).json({ medicines });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
}
const getMedicineDetails = async (req, res) => {
    try {
        const { medicineId } = req.params; // Get the medicine ID from the route parameters

        // Find the medicine by ID
        const medicine = await Medicine.findById(medicineId);

        if (!medicine) {
            return res.status(404).json({ error: 'Medicine not found' });
        }

        // Extract sales and available quantity data
        const { sales, availableQuantity } = medicine;

        res.status(200).json({ sales, availableQuantity });
    } catch (error) {
        res.status(500).json({ error: 'Error getting medicine details' });
    }
};



const updateMedicine = async (req, res) => {
    try {
        const { medicineId } = req.params; // Get the medicine ID from the route parameters
        const { description, price } = req.body; // Get the updated description and price from the request body

        // Find the medicine by ID
        const medicine = await Medicine.findById(medicineId);

        if (!medicine) {
            return res.status(404).json({ error: 'Medicine not found' });
        }

        // Update the medicine details and price
        if (description) {
            medicine.description = description;
        }

        if (price) {
            medicine.price = price;
        }

        // Save the updated medicine
        await medicine.save();

        res.status(200).json(medicine);
    } catch (error) {
        res.status(500).json({ error: 'Error updating medicine' });
    }
};



const addMedicine = async (req, res) => {
    try {
        // Get data for the new medicine from the request body
        const {
            name,
            pictureUrl,
            price,
            description,
            availableQuantity,
            activeIngredients,
        } = req.body;

        // Create a new medicine document
        const newMedicine = new Medicine({
            name,
            pictureUrl,
            price,
            description,
            availableQuantity,
            activeIngredients,
        });

        // Save the new medicine to the database
        await newMedicine.save();

        res.status(201).json(newMedicine);
    } catch (error) {
        res.status(500).json({ error: 'Error adding medicine' });
    }
};


module.exports = { addMedicine ,updateMedicine , getMedicineDetails, searchMedicine};
