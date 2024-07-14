import express from 'express';
import diagnosesService from '../services/diagnosisService';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/utils';

const router = express.Router();

router.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

router.get('/diagnoses', (_req, res) => {
  res.send(diagnosesService.getDiagnoses());
});

router.get('/patients', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/patients', (req, res) => {
  try {
    const patientEntry = toNewPatientEntry(req.body);
    const patient = patientService.newPatient(patientEntry);
    res.send(patient);
  } catch (e: unknown) {
    let message = "Error: ";
    if (e instanceof Error) {
      message += e.message;
    }
    res.status(400).send(message);
  }
});

export default router;