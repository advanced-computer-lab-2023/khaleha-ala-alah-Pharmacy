import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingPage from "./LoadingPage.jsx";
import Table from "./table.jsx";
import styles from "./Availablemedicine.module.css";
import OverlayWindow from "./overlayWindow.jsx";
import ToggleSwitch from "./toggleSwitch"; // Assuming you've created this component
import NavBarPharmacist from "../Elements/NavBarPharmacist";
import HeaderDoctor from "../Elements/HeaderDoctor";
import HeaderAdmin from "../Elements/HeaderAdmin.jsx";
import NavBarAdmin from "../Elements/NavBarAdmin.jsx";
import { useAuth } from "../AuthContext.js";

const AvailableMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [medicineToDescribe, setMedicineToDescribe] = useState(null);
  const [showMedicineDescription, setShowMedicineDescription] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const { role } = useAuth();
  const filteredMedicines = medicines
    .filter((medicine) => showAll || medicine.availableQuantity > 0)
    .filter((medicine) =>
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleToggleChange = () => {
    setShowAll(!showAll);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to fetch available medicines
  const fetchAvailableMedicines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4002/admins/available-medicines"
      );
      console.log(response.data);
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

  const handleArchiveMedicine = async (medicine) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        "http://localhost:4002/pharmacists/archiveMedicine",
        {
          medicineName: medicine.name,
        }
      );
      alert("Medicine archived successfully");
      console.log(response);
      console.log(medicine);
      setIsLoading(false);
    } catch (error) {
      console.error("Error archiving medicine:", error);
    }
  };
  const handleUnArchiveMedicine = (medicine) => {
    try {
      const response = axios.patch(
        "http://localhost:4002/pharmacists/unarchiveMedicine",
        {
          medicineName: medicine.name,
        }
      );
      alert("Medicine unarchived successfully");
      setIsLoading(false);
    } catch (error) {
      alert(error);
      console.error("Error archiving medicine:", error);
    }
  };

  useEffect(() => {
    fetchAvailableMedicines();
  }, []);

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
    {
      title: "Action",
      key: "action",
      className: styles.tableHeader,
      render: (text, record) =>
        role === "pharmacist" &&
        (record.medicine.isArchived ? (
          <button
            className={styles.Unarchivebutton}
            onClick={async () => {
              await handleUnArchiveMedicine(record.medicine);
              window.location.reload();
            }}
          >
            Unarchive
          </button>
        ) : (
          <button
            className={styles.Archivebutton}
            onClick={async () => {
              await handleArchiveMedicine(record.medicine);
              window.location.reload();
            }}
          >
            Archive
          </button>
        )),
    },

    // {
    //   title: "Archive",
    //   key: "Archive",
    //   className: styles.tableHeader,
    //   render: (text, record) => (
    //     <button
    //       className={styles.button}
    //       onClick={() => handleArchiveMedicine(record.medicine)}
    //     >
    //       Archive
    //     </button>
    //   ),
    // },
    // {
    //   title: "Unarchive",
    //   key: "Unarchive",
    //   className: styles.tableHeader,
    //   render: (text, record) => (
    //     <button
    //       className={styles.button}
    //       onClick={() => handleUnArchiveMedicine(record.medicine)}
    //     >
    //       Unarchive
    //     </button>
    //   ),
    // }
  ];

  const handleViewDescription = (medicine) => {
    setShowMedicineDescription(true);
    setMedicineToDescribe(medicine);
  };

  return (
    <>
      <div>
        {role === "pharmacist" ? (
          <>
            <HeaderDoctor />
            <NavBarPharmacist />
          </>
        ) : (
          <>
            <HeaderAdmin />
            <NavBarAdmin />
          </>
        )}
      </div>
      <div className={styles.ContainerOfAvailableMedicines}>
        {isLoading ? (
          <LoadingPage />
        ) : (
          <>
            {/* <h1 className={styles.headerOfMedicineList}>Available Medicines</h1> */}
            <div className={styles.components}>
              <div className={styles.radioGroup}>
                <br />
              </div>
              <div className={styles.searchBar}>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className={styles.searchInput}
                />
                <h3 className={styles.options}> Show Available Medicines </h3>
                <ToggleSwitch
                  isOn={showAll}
                  handleToggle={handleToggleChange}
                />
                <h3 className={styles.options}> Show All Medicines </h3>
              </div>
              <div className={styles.viewAllMedicines}>
                <h4>click on any row to show the medicine description</h4>
                <div className={styles.ViewAvailableMedicine}>
                  <div className={styles.tableWrapper}>
                    <Table
                      data={data}
                      columns={columns}
                      clickable={true}
                      onRowClick={(record, rowIndex) => {
                        handleViewDescription(record.medicine);
                      }}
                    />
                  </div>
                  {showMedicineDescription && (
                    <OverlayWindow
                      message={medicineToDescribe.description}
                      onCancel={() => {
                        setShowMedicineDescription(false);
                      }}
                      cancelLabel={"Close"}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AvailableMedicines;
