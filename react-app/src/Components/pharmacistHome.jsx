import { Link } from "react-router-dom";
import "../Components/doctorHome.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

import makeappointment from "../Images/appointmentpatient.png";
import chatpatient from "../Images/chat.png";
import healthrecord from "../Images/record.png";
import allpatients from "../Images/viewallpatients.png";
import follow from "../Images/followup.png";
import editprofile from "../Images/editprofile.png";

import ImageCarousel from "../Elements/ImageCarousel";
import ServiceItem from "../Elements/ServiceItem";

import NavBarPharmacist from "../Elements/NavBarPharmacist";
import HeaderDoctor from "../Elements/HeaderDoctor";

import appointments from "../Images/appointmentwithpatient.jpg";
import chat from "../Images/chatwithpatient.jpg";
import patientrecord from "../Images/patienthealth.jpg";
import viewpatient from "../Images/viewpatient.jpg";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export const DoctorHome = () => {
  const slides = [
    {
      image: viewpatient,
      title: "view my Patients",
      description:
        "Effortlessly track and manage your patient list with our comprehensive patient overview feature, all in one place.",
    },
    {
      image: appointments,
      title: "make Appointments",
      description:
        "Experience the ease of effortless appointment booking and simple follow-ups with your patients.",
    },
    {
      image: patientrecord,
      title: "Health Records",
      description:
        "Instantly access and update patient health records, ensuring accurate and up-to-date medical information.",
    },
    {
      image: chat,
      title: "Chat with your Patient",
      description:
        "Get immediate access to your patient with our easy-to-use chat feature. Send your personalized care anytime to your patients. SOON",
    },

    // Add more slides as needed
  ];

  const [salesData, setSalesData] = useState({});

  const dataa = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    // ... more data
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
          `http://localhost:4002/pharmacists/medicine-sales-report/${year}/${month}`,
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
      <HeaderDoctor />
      <NavBarPharmacist />
      {
        <div className="all-containers-doctorH">
          <div className="titleofPAGE-doctorH">
            <MyLineChart />
            <h1> To cure sometimes, to relieve often, to comfort always. </h1>
          </div>
          <div className="services-container-doctorH">
            {/* <ServiceItem
              imgSrc={editprofile}
              title="Edit My Profile"
              description="Easily edit and update your profile details"
              navigateTo="/editPharmacistProfile"
            />
            , */}
            <ServiceItem
              imgSrc={allpatients}
              title="View Medicines"
              description="Explore profiles and expertise of all your patients"
              navigateTo="/viewMedicines"
            />
            ,
            <ServiceItem
              imgSrc={makeappointment}
              title="ADD Medicine"
              description="Schedule a consultation with your patients anytime"
              navigateTo="/AddMedicine"
            />
            ,
            <ServiceItem
              imgSrc={chatpatient}
              title="Chat with Doctor"
              description="Connect with a doctor for instant advice through secure messaging. SOON"
            />
            {/* <ServiceItem
             
              title="wallet"
              description="check your wallet"
              navigateTo="/wallet"
            /> */}
            ,
          </div>
          <div className="about-us-container">
            <h2>About Us</h2>
            <p
              style={{
                padding: "2rem",
                marginLeft: "3rem",
                fontSize: "16pt",
                lineHeight: 1.6,
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
              }}
            >
              At Khaleha-ala-allah Clinic, we are dedicated to providing
              exceptional healthcare services tailored to meet the unique needs
              of our patients. With a commitment to excellence and a passion for
              wellness, our team of experienced healthcare professionals strives
              to deliver compassionate and comprehensive medical care.
            </p>
            <p
              style={{
                marginTop: "2rem",
                fontSize: "14pt",
                lineHeight: 1.6,
                fontFamily: "Arial, sans-serif",
              }}
            >
              From routine check-ups to specialized medical services, we offer a
              range of healthcare solutions designed to promote a lifetime of
              optimal health. We look forward to serving you and your family
              with the highest standards of medical excellence.
            </p>
          </div>
        </div>
      }
    </>
  );
};
