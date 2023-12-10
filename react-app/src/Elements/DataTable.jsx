import React from 'react';
import './DataTable.css'; // Import the CSS file you created

const DataTable = ({ data, columns }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key}>{item[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/*
const doctors = [
  { name: 'Doctor 1', address: '123 Main Sdhahdkashkdhsadhaskjhdkajlshdkahsdkjlashkldhaskhdkjladkjlahdkjhast', age: 40, speciality: 'Cardiologist' , gender:"male" },
  { name: 'Doctor 2', address: '456 Elm St', age: 35, speciality: 'Dermatologist',gender:"female" },
  { name: 'Doctor 3', address: '5th settlement', age: 30, speciality: 'ay haga' ,gender:"male"},
  // Add more doctor data
];

const doctorColumns = [
  { key: 'name', title: 'Name' },
  { key: 'address', title: 'Address' },
  { key: 'age', title: 'Age' },
  { key: 'speciality', title: 'Speciality' },
  { key: 'gender', title: 'Gender' },
];

 <><><div>
      <h2>Doctors</h2>
      <DataTable data={doctors} columns={doctorColumns} />
    </div>
*/

export default DataTable;
