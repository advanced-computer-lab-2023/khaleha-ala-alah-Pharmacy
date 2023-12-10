import React from 'react';
import { useAuth } from '../AuthContext';

const UserList = ({ users, onSelectUser }) => {
  const { role } = useAuth();

  const doctorsAndPatients = role === 'pharmacist' ? users : [];
  const pharmacists = role === 'patient' ? users : [];

  const hasPatients = doctorsAndPatients.some((user) => user.role === 'patient');

  return (
    <div className="user-list">
      {(role === 'pharmacist' || role === 'doctor') && (
        <>
          <h2>Doctors</h2>
          {doctorsAndPatients
            .filter((user) => user.role === undefined)
            .map((doctor, index) => (
              <div
                key={index}
                className="user"
                onClick={() => onSelectUser(doctor.userID)}
              >
                {doctor.name}
              </div>
            ))}
        </>
      )}

      {role === 'pharmacist' && hasPatients && (
        <>
          <h2>Patients</h2>
          {doctorsAndPatients
            .filter((user) => user.role === 'patient')
            .map((patient, index) => (
              <div
                key={index}
                className="user"
                onClick={() => onSelectUser(patient.userID)}
              >
                {patient.name}
              </div>
            ))}
        </>
      )}

      {role === 'patient' && (
        <>
          <h2>Pharmacists</h2>
          {pharmacists.map((pharmacist, index) => (
            <div
              key={index}
              className="user"
              onClick={() => onSelectUser(pharmacist.userID)}
            >
              {pharmacist.name}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default UserList;
