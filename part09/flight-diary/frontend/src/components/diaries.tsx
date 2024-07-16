import { NonSensitiveDiaryEntry, DiariesProps } from '../types';

const Diary = ({ diary }: { diary: NonSensitiveDiaryEntry }) => {
  return (
    <div>
      <p> <b> {diary.date} </b> </p>
      visibility: {diary.visibility} <br />
      weather: {diary.weather}
    </div>
  )
}

const Diaries = (props: DiariesProps) => {
  return (
    <>
      <h2>Diary entries</h2>
      {props.diaries.map((x: NonSensitiveDiaryEntry) => <Diary key={x.id} diary={x} />)}
    </>
  )
}

export default Diaries;