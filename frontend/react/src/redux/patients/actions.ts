import {
  ADD_PATIENT,
  AddPatientAction,
  DELETE_PATIENT,
  DeletePatientAction,
  EDIT_PATIENT,
  EditPatientAction,
  SET_PATIENTS,
  SetPatientAction
} from './types';

import { IPatient } from '../../interfaces/patient';
import axios from 'axios';

export const setPatients = (patients: IPatient[]): SetPatientAction => ({
  type: SET_PATIENTS,
  payload: patients
});

export const addPatient = (patient: IPatient): AddPatientAction => ({
  type: ADD_PATIENT,
  payload: patient
});

export const deletePatient = (id: string): DeletePatientAction => ({
  type: DELETE_PATIENT,
  id
});

export const editPatient = (patient: IPatient): EditPatientAction => ({
  type: EDIT_PATIENT,
  payload: patient
});

export const fetchPatients: any = (url: string) => {
  return dispatch => {
    axios
      .get<IPatient[]>(url)
      .then(res => res.data)
      .then(data => {
        dispatch(setPatients(data));
      })
      .catch(err => console.error('Server connections error'));
  };
};
