import React, { useEffect,useState } from 'react';
import axios from 'axios';
import styles from "./addAdmin.module.css";
import Table from "./table.jsx";
import { Button, Modal, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import ConfirmationDialog from "../Elements/ConfirmationDialog.jsx";
import { PlusOutlined } from "@ant-design/icons";
import LoadingPage from "./LoadingPage.jsx";
import AddAdminOverlay from "./AddAdminOverlay.jsx";

const AddUser = () => {
  const [admins, setAllAdmins] = useState([]);
  const [currentAdmin, setCurrentAdmin] = useState([]);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =useState(false);
  const [error, setError] = useState(null);

  const [username, setUsername] = useState("");

  const [showAddOverlay, setShowAddOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [filteredAdmins, setFilteredAdmins] = useState([]); // New state for filtered patients
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4002/admins/addAdmin', {
        username: formData.username,  // Use the user-entered username
        password: formData.password,  // Use the user-entered password
      });
      const data = response.data;

      console.log(data);
      // Handle the response, e.g., 

    } catch (error) {
      // Handle errors, e.g., display an error message

      console.error(error);
    }
  };

  const fetchAllAdmins = async () => {
    try {
      const response = await fetch("http://localhost:4002/admins");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setAllAdmins(data.data.admins);
      console.log(data.data.admins);

      const response2 = await fetch(
        "http://localhost:4002/admins/getCurrentAdmin",
        {
          method: "GET",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (!response2.ok) {
        throw new Error("Failed to fetch data");
      }
      const data2 = await response2.json();
      console.log(data2.admin);
      setCurrentAdmin(data2.admin);
      fetchData(data.data.admins, data2.admin);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    // Call the fetch function when the component mounts
    fetchAllAdmins();
  }, []);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      className: styles.tableHeader, // Apply custom header style

      // Add sorter or other properties as needed
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, admin) => actions(admin),
    },
  ];

  const actions = (admin) => (
    <div className={styles.buttonsList}>
      <Button
        onClick={() => {
          setUsername(admin.username);
          setShowDeleteConfirmationDialog(true);
        }}
        shape="circle"
        danger
        icon={<DeleteOutlined />}
        className={styles.deleteButton}
      />
    </div>
  );

  const fetchData = async (admins, currentAdmin) => {
    const data = admins
      .filter((admin) => admin.username !== currentAdmin.username)
      .map((admin) => ({
        username: admin.username,
      }));
    setTableData(data);
    setIsLoading(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:4002/admins/delAdminpharmacistPatient', {
        data: { role: "admin", name: username },
      });
      setShowDeleteConfirmationDialog(false);
      fetchAllAdmins();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    setIsLoading(true);
    const value = e.target.value;
    setSearchQuery(value);
    const filtered = admins.filter((patient) =>
      patient.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredAdmins(filtered);
    fetchData(filtered, currentAdmin);
  };


  return (
    <div>
    {isLoading ? (
      <LoadingPage />
    ) : (
      <>
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          onClick={() => {
            setShowAddOverlay(true);
          }}
          className={styles.addPackageButton}
          style={{ marginRight: "20px", marginBottom: "20px" }}
        >
          Add Admin
        </Button>
        <input
          type="text"
          className={styles.searchInput} // Applied CSS class
          placeholder="Search by username..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Table columns={columns} data={tableData} />

        {showDeleteConfirmationDialog && (
          <ConfirmationDialog
            message="Are you sure you want to Delete this Doctor?"
            confirmLabel="Yes"
            cancelLabel="No"
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteConfirmationDialog(false)}
          />
        )}

        {showAddOverlay && (
          <AddAdminOverlay
            onCancel={() => {
              setShowAddOverlay(false);
              fetchAllAdmins();
            }}
          />
        )}
      </>
    )}
  </div>
  );
};

export default AddUser;
