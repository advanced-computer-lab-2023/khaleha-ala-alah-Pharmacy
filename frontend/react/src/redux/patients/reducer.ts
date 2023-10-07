import { ADD_PATIENT, DELETE_PATIENT, EDIT_PATIENT, PatientsActions, SET_PATIENTS } from './types';
import { IPatient } from '../../interfaces/patient';

const initialState: IPatient[] = [];

export function patientsReducer(
  state: IPatient[] = initialState,
  action: PatientsActions
): IPatient[] {
  switch (action.type) {
    case SET_PATIENTS: {
      return [...action.payload];
    }

    case EDIT_PATIENT: {
      const editedPatients = state.map((el) => (el.id !== action.payload.id ? el : action.payload));

      return [...editedPatients];
    }

    case ADD_PATIENT: {
      const id = getNewId(state);
      return [{ ...action.payload, id }, ...state];
    }

    case DELETE_PATIENT: {
      const patients = state.filter((el) => el.id !== action.id);
      return [...patients];
    }

    default: {
      return state;
    }
  }
}

function getNewId(patients: IPatient[]) {
  return patients
    .map((patient) => patient.id)
    .map((id) => parseInt(id))
    .reduce((largest, id) => Math.max(largest, id + 1), -1)
    .toString();
}
