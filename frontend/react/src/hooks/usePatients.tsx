import { IPatient } from '../interfaces/patient';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../redux/patients/actions';

import { IAppState } from '../interfaces/app-state';

export function usePatients() {
  const dispatch = useDispatch();
  const patients = useSelector<IAppState, IPatient[]>((state) => state.patients);

  const editPatient = (patient: IPatient) => {
    return dispatch(actions.editPatient(patient));
  };

  const addPatient = (patient: IPatient) => {
    return dispatch(actions.addPatient(patient));
  };

  const deletePatient = (id: string) => {
    return dispatch(actions.deletePatient(id));
  };

  return { patients, addPatient, editPatient, deletePatient };
}
