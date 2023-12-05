import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingPage from "./LoadingPage.jsx";
import Table from "./table.jsx";
import styles from "./viewPendingDoctors.module.css";
import OverlayWindow from "./overlayWindow.jsx";
import ToggleSwitch from "./toggleSwitch"; // Assuming you've created this component


const AvailableMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [medicineToDescribe, setMedicineToDescribe] = useState(null);
  const [showMedicineDescription, setShowMedicineDescription] = useState(false);
  const filteredMedicines = showAll
  ? medicines
  : medicines.filter((medicine) => medicine.availableQuantity > 0);
  const handleToggleChange = () => {
    setShowAll(!showAll);
  };
  
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

  const handleFilterChange = (event) => {
    setShowAll(event.target.value === 'all');
  };

  const data = filteredMedicines.map((medicine) => ({
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
  ];

  
  const handleViewDescription = (medicine) => {
    setShowMedicineDescription(true);
    setMedicineToDescribe(medicine);
  };

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <h1>Available Medicines</h1>
          <div className={styles.radioGroup}>
            {/* <label>
              <input
                type="radio"
                value="all"
                checked={showAll}
                onChange={handleFilterChange}
              />
              Show All
            </label>
            <label>
              <input
                type="radio"
                value="available"
                checked={!showAll}
                onChange={handleFilterChange}
              />
              Show Available
            </label> */}
            <h3 className={styles.options}> Show Available Medicines </h3>
            <ToggleSwitch isOn={showAll} handleToggle={handleToggleChange} />
            <h3 className={styles.options}> Show All Medicines </h3>
            <br/>
          </div>
          <div className={styles.viewPendingDoctors}>
            <h4>click on any row to show the medicine description</h4>
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
                  message={medicineToDescribe.description}
                  onCancel={() => {setShowMedicineDescription(false)}}
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
