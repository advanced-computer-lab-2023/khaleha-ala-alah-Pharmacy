import React from "react";
//import "./patient.css";
import "./patientHome.css";
import { Link } from "react-router-dom";

import makeappointment from "../Images/appointmentpatient.png";
import pres from "../Images/perscriptionpatient.png";
import addfm from "../Images/addfmpatient.png";
import viewdoctor from "../Images/viewdoctorpatient.png";
import searchdoctor from "../Images/searchdoctor.png";
import viewfm from "../Images/fammember.png";
import healthpackages from "../Images/packages.png";
import chatdoctor from "../Images/chat.png";
import familymember from "../Images/FamilyMember.jpg";
import appointments from "../Images/appointments.jpg";
import packages from "../Images/Packages.jpg";
import doctors from "../Images/SearchDoctor.jpg";
import Header from "../Elements/HeaderAdmin";
import ServiceItem from "../Elements/ServiceItem";
import NavBar from "../Elements/NavBarAdmin";
import ImageCarousel from "../Elements/ImageCarousel";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";

export const AdminHome = () => {
  const [salesData, setSalesData] = useState([]);
  const slides = [
    {
      image: familymember,
      title: "Choose your Doctor",
      description:
        "Explore our diverse range of expert doctors and select the one who best suits your healthcare needs.",
    },
    {
      image: doctors,
      title: "Family Members",
      description:
        " Easily add family members to your account, and Experience personalized care for the whole family, all in one place.",
    },
  ];

  const MyLineChart = () => {
    return (
      <LineChart width={600} height={300} data={salesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
      </LineChart>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload; // Assuming your detailed data is stored in the payload

      // Render your custom tooltip content here
      return (
        <div className="custom-tooltip">
          <p>{`Month: ${data.name}`}</p>
          {data.medicines.map((medicine, index) => (
            <p
              key={index}
            >{`Medicine: ${medicine.medicine.name}, Sold: ${medicine.totalQuantity} , Price: ${medicine.totalSales}`}</p>
          ))}
        </div>
      );
    }

    return null;
  };

  const fetchSalesData = async () => {
    let data = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:4002/admins/medicine-sales-report/${year}/${month}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Assuming a Bearer token is used for authorization
            },
          }
        );
        console.log(response.data);
        console.log(
          response.data[0] ? response.data[0].totalSalesForAllMedicines : 0
        );
        data.push({
          name: new Date(0, 11 - i).toLocaleString("default", {
            month: "short",
          }),
          sales: response.data[0]
            ? response.data[0].totalSalesForAllMedicines
            : 0,

          medicines: response.data[0] ? response.data[0].medicines : [], // Include detailed medicine data
        });
      } catch (error) {
        console.error("Error fetching sales data:", error);
        // Handle error appropriately
      }
    }
    setSalesData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  const data = {
    labels: Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString("default", { month: "short" })
    ),
    datasets: [
      {
        label: "Monthly Sales",
        data: salesData,
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <>
      <Header />
      <NavBar />
      <div
        style={{ backgroundColor: "white", height: "100vh", width: "99.9vw" }}
      >
        <div className="all-containers">
          {/* Profile Side Menu */}

          {/* Sidebar */}
          <div
            className="services-container"
            style={{ justifyContent: "flex-start", margin: "20px 0 0 20px" }}
          >
            <MyLineChart />
            <ServiceItem
              imgSrc={searchdoctor}
              title="Manage admins"
              description="Here you can add new admin"
              navigateTo="/addAdmin"
            />
            ,
            <ServiceItem
              imgSrc={viewdoctor}
              title="Manage Pharmacist/Patient"
              description="Explore profiles and expertise of all our available users"
              navigateTo="/ManageUsers"
            />
            ,
            <ServiceItem
              imgSrc={pres}
              title="View Pending Pharmacists"
              description="Show your medications prescribed online quickly and securely"
              navigateTo="/viewPendingPharmacists"
            />
            ,
            <ServiceItem
              imgSrc={makeappointment}
              title="View Medicines"
              description="View all medicines"
              navigateTo="/viewMedicines"
            />
          </div>
        </div>
      </div>
    </>
  );
};
