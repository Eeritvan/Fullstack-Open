import React from 'react';
import axios, {AxiosError} from 'axios';
import { useState } from 'react';
import { NewDiaryEntry,
         Weather,
         Visibility,
         DiariesProps,
         errorInterface } from '../types';

const Error = (props: errorInterface) =>
    <p style={{ color: 'red' }}> {props.error} </p>

const NewDiary = (props: DiariesProps) => {
  const [error, setError] = useState('')
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const handleNewDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diary: NewDiaryEntry = {
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment
    }

    try {
      await axios
      .post('http://localhost:3000/api/diaries', { ...diary })
      .then(response  => {
        props.setDiaries?.(props.diaries.concat(response.data))
      })
      .then(() => {
        setDate('')
        setVisibility('')
        setWeather('')
        setComment('')
      })
    } catch(e) {
      const error = e as AxiosError;
      const errorMessage = error.response?.data as string;
      console.error(errorMessage)
      setError(errorMessage)
    }
  }

  const visibilityOptions = ['great', 'good', 'ok', 'poor']
  const weatherOptions = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy']

  return (
    <div>
      <h2> Add new entry </h2>
      {error && <Error error={error}/>}
      <form onSubmit={handleNewDiary}>
        <div>
          date:
          <input type='date'
                 value={date}
                 onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          visibility:
          {visibilityOptions.map(x => (
            <span key={x}>
              <input
                type="radio"
                name="visibility"
                id={x}
                value={x}
                onChange={() => setVisibility(x)}
              />
              <label htmlFor={x}>{x}</label>
            </span>
            ))}
        </div>
        <div>
          weather:
          {weatherOptions.map(x => (
            <span key={x}>
              <input
                type="radio"
                name="weather"
                id={x}
                value={x}
                onChange={() => setWeather(x)}
              />
              <label htmlFor={x}>{x}</label>
            </span>
          ))}
        </div>
        <div>
          comment:
          <input value={comment} onChange={e => setComment(e.target.value)} />
        </div>
        <button type="submit"> add </button>
      </form>
    </div>
  )
}

export default NewDiary;