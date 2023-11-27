
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
import NavBar from "../Elements/NavBar";

import appointments from "../Images/appointmentwithpatient.jpg";
import chat from "../Images/chatwithpatient.jpg";
import patientrecord from "../Images/patienthealth.jpg";
import viewpatient from "../Images/viewpatient.jpg";

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

  return (
    <div>






    <>
    <div>
      <h1>Pharmacist Home</h1>


      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Log Out
      </button>
      

    </div>


</>
         



  
      {
        <div className="all-containers-doctorH">
        

          <div className="titleofPAGE-doctorH">
            <h1> To cure sometimes, to relieve often, to comfort always. </h1>
          </div>
          <div className="services-container-doctorH">
            <ServiceItem
              imgSrc={editprofile}
              title="Edit My Profile"
              description="Easily edit and update your profile details"
              navigateTo="/editPharmacistProfile"
            />
            ,
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
                  <ServiceItem
              imgSrc={chatpatient}
              title="Chat with Doctor"
              description="Connect with a doctor for instant advice through secure messaging. SOON"
            />
                <ServiceItem
             
              title="wallet"
              description="check your wallet"
              navigateTo="/wallet"
            />
            ,

     
          </div>
        </div>
      }
    </div>
  );
};
