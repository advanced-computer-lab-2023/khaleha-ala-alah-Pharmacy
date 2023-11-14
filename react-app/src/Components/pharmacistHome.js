import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const pharmacistHome = () => {

  return (
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
         
  );
};

export default pharmacistHome;