import patientData from '../data/patientData';
import { v1 as uuid } from 'uuid';
import { parseGender } from '../utils/utils';

import { patientEntry, NonSensitivePatientEntry, newPatientEntry } from "../types/types";

const getPatients = (): patientEntry[] => {
  return patientData.map(x => ({ id: x.id,
                                 name: x.name,
                                 dateOfBirth: x.dateOfBirth,
                                 gender: parseGender(x.gender),
                                 occupation: x.occupation,
                                 ssn: x.ssn,
                                 entries: x.entries
                                }));
};

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patientData.map(x => ({ id: x.id,
                                 name: x.name,
                                 dateOfBirth: x.dateOfBirth,
                                 gender: parseGender(x.gender),
                                 occupation: x.occupation
                                }));
};

const newPatient = ( entry:newPatientEntry ): patientEntry => {
  const patient = {
    id: uuid(),
    ...entry
  };
  patientData.push(patient);
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  newPatient
};