import React, { Component } from 'react';
import AddUser from './addAdmin';
import PatientList from './patientList';
import PharmacistList from './pharmcistDelete';
import PharmacistListAPP from './allAppliedpharmacists';
import AvailableMedicines from './Availablemedicine';
import MedicineSearch from './searchmedicine';
import MedicineFilter from './medicalusefilter';
import AddMedicine from './addMedicine';
import UpdateMedicine from './medicineEdit';
import PharmacistList_info from './Viewpharmasistinfo';
import PatientList_info from './patientbasicInfo';
import PatientRegister from './patientRegister';
import PharmacistRegister from './pharmacistRegister';
import OrdersPage from "./ordersPage.jsx";

class MainApp extends Component {
  constructor() {
    super();
    this.state = {
      currentComponent: null,
    };
  }

  renderComponent = (component) => {
    this.setState({ currentComponent: component });
  };

  render() {
    const { currentComponent } = this.state;

    return (
      <div>
        <button onClick={() => this.renderComponent(<AddUser />)}>Add Admin</button>
        <button onClick={() => this.renderComponent(<PatientList />)}>Patient List</button>
        <button onClick={() => this.renderComponent(<PharmacistList />)}>Pharmacist Delete</button>
        <button onClick={() => this.renderComponent(<PharmacistListAPP />)}>All Applied Pharmacists</button>
        <button onClick={() => this.renderComponent(<AvailableMedicines />)}>Available Medicines</button>
        <button onClick={() => this.renderComponent(<MedicineSearch />)}>Search Medicine</button>
        <button onClick={() => this.renderComponent(<MedicineFilter />)}>Medical Use Filter</button>
        <button onClick={() => this.renderComponent(<AddMedicine />)}>Add Medicine</button>
        <button onClick={() => this.renderComponent(<UpdateMedicine />)}>Edit Medicine</button>
        <button onClick={() => this.renderComponent(<PharmacistList_info />)}>View Pharmacist Info</button>
        <button onClick={() => this.renderComponent(<PatientList_info />)}>Patient Basic Info</button>
        <button onClick={() => this.renderComponent(<PatientRegister />)}>Patient Register</button>
        <button onClick={() => this.renderComponent(<PharmacistRegister />)}>Pharmacist Register</button>
        <button onClick={() => this.renderComponent(<OrdersPage />)}>View Orders</button>

        <div className="component-container">
          {currentComponent}
        </div>
      </div>
    );
  }
}

export default MainApp;
