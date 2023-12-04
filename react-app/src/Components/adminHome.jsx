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

import ServiceItem from "../Elements/ServiceItem";
import NavBar from "../Elements/NavBar";
import ImageCarousel from "../Elements/ImageCarousel";

export  const AdminHome = () => {
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
  return (
    <div style={{ backgroundColor: "white", height: "100vh", width: "99.9vw" }}>

      <div className="all-containers">
        {/* Profile Side Menu */}

        {/* Sidebar */}
        <div
          className="services-container"
          style={{ justifyContent: "flex-start", margin: "20px 0 0 20px" }}
        >
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
          />,
          
              <ServiceItem
         
            title="chang password"
            navigateTo="/changePassword"
          />
            <ServiceItem
            imgSrc={makeappointment}
            title="search Medicines"
            description="View all medicines"
            navigateTo="/searchMedicine"
          />
       
        </div>
      </div>
    </div>
  );
};
