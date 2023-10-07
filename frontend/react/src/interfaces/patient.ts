export interface IPatient {
  name: string;
  age: number;
  address: string;
  number: string;
  id?: string;
  img?: string | ArrayBuffer;
  profileImg?: string | ArrayBuffer;
  lastName?: string;
  fullName?: string;
  phone?: string;
  gender: string;
  status?: string;
  lastVisit?: string;
}

export interface IAppointment {
  img: string;
  name: string;
  email: string;
  number: string;
  date: string | null;
  doctor: string;
  injury: string;
  from: string;
  to: string;
}

export interface IBilling {
  billNo: number;
  billDate: string;
  patient: string;
  doctor: string;
  charges: number;
  tax: number;
  discount: number;
  total: number;
}

export interface IDepartment {
  img: string;
  title: string;
  desc: string;
  team: string[];
}
