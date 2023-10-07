import { IPatient } from '../interfaces/patient';

export function useGetUser(): IPatient {
  return {
    age: 25,
    name: 'Liam',
    lastName: 'Jouns',
    number: '0126596578',
    gender: 'male',
    address: '71 Pilgrim Avenue Chevy Chase, MD 20815',
    status: 'approved',
    lastVisit: '18 Dec 2020',
    img: `${window.origin}/content/user-400-1.jpg`
  };
}
