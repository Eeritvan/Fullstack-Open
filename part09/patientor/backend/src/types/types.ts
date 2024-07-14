export interface diagnosesEntry {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}

export interface patientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
}

export type newPatientEntry = Omit<patientEntry, 'id'>;

export type NonSensitivePatientEntry = Omit<patientEntry, 'ssn'>;