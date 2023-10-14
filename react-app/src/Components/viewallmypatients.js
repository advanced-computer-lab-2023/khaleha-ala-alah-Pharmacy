import React, { useState, useEffect } from 'react';

const DoctorPatients = ({ doctorId }) => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [appointments, setAppointments] = useState([]); // State to store doctor's appointments
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the doctor's patients and appointments
    const fetchDoctorData = async () => {
      try {
        const patientsResponse = await fetch(`http://localhost:4001/doctors/${doctorId}/patients`);
        if (!patientsResponse.ok) {
          throw new Error('Failed to fetch patients');
        }
        const patientsData = await patientsResponse.json();
        setPatients(patientsData.data.patients);
        setFilteredPatients(patientsData.data.patients); // Initialize filtered patients with all patients

        const appointmentsResponse = await fetch(`http://localhost:4001/doctors/${doctorId}/appointments`);
        if (!appointmentsResponse.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const appointmentsData = await appointmentsResponse.json();
        setAppointments(appointmentsData.data.appointments);
      } catch (err) {
        setError(err.message);
      }
    };

    // Call the fetch function when the component mounts
    fetchDoctorData();
  }, [doctorId]);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchName(e.target.value);

    // Filter patients based on the search input
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    // Further filter by upcoming appointments
    const now = new Date();
    const upcomingPatients = filtered.filter((patient) => {
      return appointments.some((appointment) => {
        const appointmentDate = new Date(appointment.timedAt);
        return appointmentDate > now && appointment.PatientID === patient._id;
      });
    });

    setFilteredPatients(upcomingPatients);
  };

  return (
    <div>
      <h2>Doctor's Patients</h2>
      {error && <p>Error: {error}</p>}
      <input
        type="text"
        placeholder="Search by patient name"
        value={searchName}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredPatients.map((patient) => (
          <li key={patient._id}>
            <strong>Name:</strong> {patient.name}<br />
            <strong>Email:</strong> {patient.email}<br />
            {/* Include other patient details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorPatients;
