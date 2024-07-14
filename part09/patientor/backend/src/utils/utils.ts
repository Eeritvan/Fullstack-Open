import { newPatientEntry, Gender } from "../types/types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parse = (type: unknown): string => {
  if (!type || !isString(type)) {
    throw new Error('Incorrect or missing field');
  }
  return type;
};

const isGender = (type: string): type is Gender => {
  return Object.values(Gender).map(x => x.toString()).includes(type);
};

export const parseGender = (type: unknown): Gender => {
  if (!type || typeof type !== 'string' || !isGender(type)) {
    throw new Error('Incorrect or missing Gender');
  }
  return type;
};

const toNewPatientEntry = (object: unknown): newPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
      throw new Error('Incorrect or missing data');
    }

  if ('name' in object && 'occupation' in object && 'ssn' in object && 'dateOfBirth' in object && 'gender' in object) {
    const newEntry: newPatientEntry = {
      name: parse(object.name),
      occupation: parse(object.occupation),
      ssn: parse(object.ssn),
      dateOfBirth: parse(object.dateOfBirth),
      gender: parseGender(object.gender)
    };
    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;