import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const PendingDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch all pending doctors
    const fetchPendingDoctors = async () => {
      try {
        const response = await fetch("http://localhost:4000/admins/pendingDoctors", {
          method: "GET",
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setDoctors(data.data.pendingpharmacists);
      } catch (err) {
        setError(err.message);
      }
    };

    // Call the fetch function when the component mounts
    fetchPendingDoctors();
  }, []);

  const handleAcceptOrReject = async (username,action) => {
    const data = {
      username: username,
    };
    await axios.post(`http://localhost:4000/admins/approveOrRejectDoctor`, data, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
        type: action,
      },
    }).then((res) => {
      message.success(res.data.message);
      // Remove the doctor from the list of pending doctors
      setDoctors((currentDoctors) =>
        currentDoctors.filter((doctor) => doctor.username !== username)
      );
      
    }
    ).catch((err) => {
      message.error(err.response.data.error);
    });
  };


    
  return (
    <div>
      <h2>Pending Doctors</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.username}>
            <p>Name: {doctor.name}</p>
            <p>Birthdate: {doctor.birthdate}</p>
            <p>Affiliation: {doctor.affiliation}</p>
            <p>Speciality: {doctor.speciality}</p>
            <p>Educational Background: {doctor.educationalBackground}</p>
            {/* {doctor.files.length > 0 && (
              <div>
                <p>Attached Files:</p>
                <table>
                  <tbody>
                    {doctor.files.map((file, index) => (
                      <tr key={index}>
                        <td>{file}</td>
                        <td>
                          <a href={`http://localhost:4000/api/files/${file}/download`} download>
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
            )} */}
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <button value={"approve"} onClick={(e)=>handleAcceptOrReject(doctor.username,e.target.value)}>
                        Approve
                      </button>
                    </td>
                    <td>
                      <button value={"reject"} onClick={(e)=>handleAcceptOrReject(doctor.username,e.target.value)} >
                        Reject
                      </button>
                    </td>
                  </tr>
                  </tbody>
              </table>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingDoctors;
