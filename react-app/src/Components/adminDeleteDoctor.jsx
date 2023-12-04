import React, { useState, useEffect } from "react";
import ConfirmationDialog from "../Elements/ConfirmationDialog.jsx";
import Table from "./table.jsx";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Avatar, Button, Modal, Tag } from "antd";
import styles from "./adminDeleteDoctor.module.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const DeleteDoctor = () => {
  const [pharmacists, setAllPharmacists] = useState([]);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [result, setResult] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [filteredPharmacists, setFilteredPharmacists] = useState([]); // New state for filtered patients
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query

  const fetchAllPharmacists = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/pharmacists/allpharmacists"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      //console.log(data.data.pharmacists);
      console.log(data);
      setAllPharmacists(data);
      setFilteredPharmacists(data); 
    } catch (err) {
      //setError(err.message);
    }
  };

  useEffect(() => {
    // Call the fetch function when the component mounts
    fetchAllPharmacists();
  }, []);

  const actions = (pharmacists) => (
    <div className={styles.buttonsList}>
      <Button
        onClick={() => {
          console.log(pharmacists.name + "<<<<<<");
          setSelectedID(pharmacists._id);
          setUsername(pharmacists.username);
          setRole(pharmacists.role);
          setShowDeleteConfirmationDialog(true);
        }}
        shape="circle"
        danger
        icon={<DeleteOutlined />}
        className={styles.deleteButton}
      />
    </div>
  );

  const data = filteredPharmacists.map((pharmacists) => ({
    username: pharmacists.username,
    name: pharmacists.name,
    email: pharmacists.email,
    gender: pharmacists.gender,
    status: pharmacists.status,
    speciality: pharmacists.speciality,
  }));

  const columns = [
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
    },
    {
      key: "username",
      dataIndex: "username",
      title: "Username",
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
    },
    {
      key: "gender",
      dataIndex: "gender",
      title: "Gender",
    },
    {
      key: "speciality",
      dataIndex: "speciality",
      title: "Speciality",
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Status",
    },
    {
      key: "actions",
      title: "Actions",
      render: (_, healthPackage) => actions(healthPackage),
    },
  ];

  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const filtered = pharmacists.filter(pharmacists => 
      pharmacists.username && pharmacists.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPharmacists(filtered);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:4000/admins/delAdminpharmacistPatient', {
        data: { role: "pharmacist", name: username },
      });

      setResult(response.data.message);
      setShowDeleteConfirmationDialog(false);
      fetchAllPharmacists();
    } catch (error) {
      setResult(error.response.data.error);
    }
  };

  return (
    <div className={styles.packageAdminContainer}>
      <h2>Manage Pharmacists</h2>
      {error && <p>Error: {error}</p>}
      <div>
      <input
          type="text"
          className={styles.searchInput} // Applied CSS class
          placeholder="Search by username..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        </div>
      <div>
        <h3 className={styles.packagesListHeading}>Pharmacists List</h3>{" "}
        <Table data={data} columns={columns} />
      </div>

      {showDeleteConfirmationDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this pharmacist?"
          confirmLabel="Yes"
          cancelLabel="No"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirmationDialog(false)}
        />
      )}
    </div>
  );
};

export default DeleteDoctor;
