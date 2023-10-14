import React, { useState, useEffect } from 'react';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [error, setError] = useState(null);

  // Function to fetch all appointments of a doctor
  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:4001/doctors/appointments');
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      const data = await response.json();
      setAppointments(data.appointments);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    // Call the fetch function when the component mounts
    fetchAppointments();
  }, []);

  // Function to filter appointments based on date and status
  const filterAppointments = () => {
    const filtered = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.timedAt).toISOString().split('T')[0];
      const status = appointment.timedAt > Date.now() ? 'pending' : 'confirmed';

      const dateFilterPassed = dateFilter === '' || appointmentDate === dateFilter;
      const statusFilterPassed = statusFilter === 'all' || status === statusFilter;

      return dateFilterPassed && statusFilterPassed;
    });

    return filtered;
  };

  return (
    <div>
      <h2>Doctor Appointments</h2>
      {error && <p>Error: {error}</p>}
      <div>
        <label>Date Filter:</label>
        <input
          type="date"
          id="dateFilter"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <label>Status Filter:</label>
        <select id="statusFilter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <ul>
        {filterAppointments().map((appointment) => (
          <li key={appointment.id}>
            {new Date(appointment.timedAt).toLocaleString()}: {appointment.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorAppointments;
