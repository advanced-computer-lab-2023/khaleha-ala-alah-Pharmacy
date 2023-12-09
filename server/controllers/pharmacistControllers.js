const Medicine = require('../models/medicine'); // Import the Medicine model
 // Import the Medicine model
// Import the Medicine model
const pharmacist = require('../models/users/pharmacist'); // Import the Medicine model

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


const allpharmacists = async (req, res) => {
  try {
    const pharmacists = await pharmacist.find();
    res.json(pharmacists);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pharmacists' });
  }}

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
            medicalUse,
        } = req.body;

        // Create a new medicine document
        const newMedicine = new Medicine({
            name,
            pictureUrl,
            price,
            description,
            availableQuantity,
            activeIngredients,
            medicalUse,
            userID: req.user._id,
        });

        // Save the new medicine to the database
        await newMedicine.save();

        res.status(201).json(newMedicine);
    } catch (error) {
        res.status(500).json({ error: 'Error adding medicine' });
    }
};
const archiveMedicine = async (req,res)=>{
    try{
        const medicineName = req.body.medicineName;
        const medicine = await Medicine.findOne({name : medicineName});
        if(!medicine){
            return res.status(404).json({error:'Medicine not found'});
        }
        medicine.isArchived = true;
        await medicine.save();
        res.status(200).json(medicine);
    }
    catch(error){
        res.status(500).json({error:'Error archiving medicine'});
    }
}
const unarchiveMedicine = async (req,res)=>{
    try{
        const medicineName = req.body.medicineName;
        const medicine = await Medicine.findOne({name : medicineName});
        if(!medicine){
            return res.status(404).json({error:'Medicine not found'});
        }
        if(!medicine.isArchived){
            return res.status(404).json({error:'Medicine is already unarchived'});
        }
        medicine.isArchived = false;
        await medicine.save();
        res.status(200).json(medicine);
    }
    catch(error){
        res.status(500).json({error:'Error unarchiving medicine'});
    }
}

module.exports = { addMedicine ,updateMedicine , getMedicineDetails,allpharmacists , archiveMedicine ,unarchiveMedicine };
