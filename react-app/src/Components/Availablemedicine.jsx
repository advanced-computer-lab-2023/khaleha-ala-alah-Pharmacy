import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingPage from "./LoadingPage.jsx";
import Table from "./table.jsx";
import styles from "./viewPendingDoctors.module.css";
import OverlayWindow from "./overlayWindow.jsx";

const AvailableMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [medicineToDescribe, setMedicineToDescribe] = useState(null);
  const [showMedicineDescription, setShowMedicineDescription] = useState(false);

  // Function to fetch available medicines
  const fetchAvailableMedicines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/admins/available-medicines"
      );
      setMedicines(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching available medicines:", error);
      setIsLoading(false);
    }
  };

  // Function to handle the selection of a medicine
  const handleMedicineClick = (medicine) => {
    setSelectedMedicine(medicine);
  };

  useEffect(() => {
    fetchAvailableMedicines();
  }, []);

  useEffect(() => {

    console.log(showMedicineDescription + "A")
  }, [setShowMedicineDescription])

  // Function to filter medicines based on availability
  const filteredMedicines = showAll
    ? medicines
    : medicines.filter((medicine) => medicine.availableQuantity > 0);

  const data = medicines.map((medicine) => ({
    pictureUrl: (
      <img
        width="70px"
        height="70px"
        src={medicine.pictureUrl}
        alt={medicine.name}
        style={{ marginTop: "1.3rem" }}
      />
    ),
    medicine: medicine,
    name: medicine.name,
    price: medicine.price,
    availableQuantity: medicine.availableQuantity,
    sales: medicine.sales,
    medicalUse: medicine.medicalUse,
  }));

  const columns = [
    {
      title: "Picture",
      dataIndex: "pictureUrl",
      key: "pictureUrl",
      className: styles.tableHeader,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: styles.tableHeader,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      className: styles.tableHeader,
    },
    {
      title: "Available Quantity",
      dataIndex: "availableQuantity",
      key: "availableQuantity",
      className: styles.tableHeader,
    },
    {
      title: "Sales",
      dataIndex: "sales",
      key: "sales",
      className: styles.tableHeader,
    },
    {
      title: "Medical Use",
      dataIndex: "medicalUse",
      key: "medicalUse",
      className: styles.tableHeader,
    },
  ];

  
  const handleViewDescription = (medicine) => {
    setShowMedicineDescription(true);
    setMedicineToDescribe(medicine);
    console.log(showMedicineDescription);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <h1>Available Medicines</h1>
          <div>
            <button onClick={() => setShowAll(true)}>Show All</button>
            <button onClick={() => setShowAll(false)}>Show Available</button>
          </div>
          <div className={styles.viewPendingDoctors}>
            <div className={styles.tableWrapper}>
              <Table
                data={data}
                columns={columns}
                clickable={true}
                onRowClick={(record, rowIndex) => {
                  handleViewDescription(record.medicine);
                }}
              />
              {showMedicineDescription && (
                <OverlayWindow
                  message={"ALO"}
                  onCancel={setShowMedicineDescription(false)}
                  cancelLabel={"Close"}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AvailableMedicines;
