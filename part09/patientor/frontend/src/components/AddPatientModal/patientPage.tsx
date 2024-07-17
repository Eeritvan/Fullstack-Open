import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, Diagnosis, Entry, HealthCheckRating } from '../../types';
import { Male, Female, MedicalServices, Work, Favorite } from '@mui/icons-material';

interface SingleEntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryStyle = {
  border: '1px solid', 
  marginTop: '5px'
};

const HospitalEntry = ({ entry, diagnoses }: SingleEntryProps) => {
  return (
    <div style={EntryStyle}>
      <div>{entry.date} <MedicalServices /> </div>
      <div> <i> {entry.description} </i> </div>
      <ul>
        {entry.diagnosisCodes?.map(code =>
          <li key={code}>
            {diagnoses
            .filter((x: Diagnosis) => x.code === code)
            .map((x: Diagnosis) => <span key={x.code}>{x.code} {x.name}</span>)
            }
          </li>
        )}
      </ul>
    </div>
  );
};

interface OccHealthcareProps {
  entry: Entry & { employerName: string };
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry = ({ entry, diagnoses }: OccHealthcareProps) => {
  return (
    <div style={EntryStyle}>
      <div>{entry.date} <Work /> {entry.employerName} </div>
      <div> <i> {entry.description} </i> </div>
      <ul>
        {entry.diagnosisCodes?.map(code =>
          <li key={code}>
            {diagnoses
            .filter((x: Diagnosis) => x.code === code)
            .map((x: Diagnosis) => <span key={x.code}>{x.code} {x.name}</span>)
            }
          </li>
        )}
      </ul>
      <div> diagnosed by: {entry.specialist} </div>
    </div>
  );
};

interface HealthCheckProps {
  entry: Entry & { healthCheckRating: HealthCheckRating };
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diagnoses }: HealthCheckProps) => {
  const renderHealthCheckRating = (rating: HealthCheckRating) => {
    switch (rating) {
      case 0:
        return <Favorite style={{ color: 'green' }} />;
      case 1:
        return <Favorite style={{ color: 'yellow' }} />;
      case 2:
        return <Favorite style={{ color: 'red' }} />;
      case 3:
        return <Favorite />;
      default:
        return <div>???</div>;
    }
  };

  return (
    <div style={EntryStyle}>
      <div>{entry.date} <MedicalServices /> </div>
      <div> <i> {entry.description} </i> </div>
      <ul>
        {entry.diagnosisCodes?.map(code =>
          <li key={code}>
            {diagnoses
            .filter((x: Diagnosis) => x.code === code)
            .map((x: Diagnosis) => <span key={x.code}>{x.code} {x.name}</span>)
            }
          </li>
        )}
      </ul>
      {renderHealthCheckRating(entry.healthCheckRating)}
      <div> diagnosed by: {entry.specialist} </div>
    </div>
  );
};

const Entries = ({ entry, diagnoses }: SingleEntryProps) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    default:
      return <div> Information missing </div>;
  }
};

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const { id } = useParams();
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/patients/${id}`)
      .then(response => {
        if (response.data.length > 0) {
          setPatient(response.data[0]);
        }
      });
  }, [id]);
    
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/diagnoses`)
      .then(response => setDiagnoses(response.data));
  }, []);

  if (!patient) {
    return (
      <h1>No data found.</h1>
    );
  }

  return (
    <div>
      { patient.gender === 'male' && <h1> {patient.name} <Male /> </h1>}
      { patient.gender === 'female' && <h1> {patient.name} <Female /> </h1>}
      { patient.gender === 'other'  && <h1> {patient.name} </h1>}
      <div> ssn: {patient.ssn} </div>
      <div> occupation: {patient.occupation} </div>
      {patient.entries.length > 0 && <h3> entries </h3>}
      {patient.entries.map((x: Entry) => (
        <Entries entry={x} diagnoses={diagnoses} key={x.id} />
      ))}
    </div>
  );
};

export default PatientPage;