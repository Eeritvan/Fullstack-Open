import axios from 'axios';
import { useState, useEffect } from 'react';
import { NonSensitiveDiaryEntry } from './types';
import Diaries from './components/diaries';
import NewDiary from './components/newDiary';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    axios.get<NonSensitiveDiaryEntry[]>('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data);
    })

  }, [])

  return (
    <>
      <NewDiary diaries={diaries} setDiaries={setDiaries}/>
      <Diaries diaries={diaries}/>
    </>
  )
}

export default App