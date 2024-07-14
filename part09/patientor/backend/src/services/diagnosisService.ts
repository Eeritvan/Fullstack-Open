import diagnosesData from '../data/diagnosisData';

import { diagnosesEntry } from '../types/types';

export const getDiagnoses = (): diagnosesEntry[] => {
  return diagnosesData;
};

export default {
  getDiagnoses
}