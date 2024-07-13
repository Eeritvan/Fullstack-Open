import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({
      error: "malformatted parameters"
    });
  }

  res.send({
    height,
    weight,
    bmi: calculateBmi(height, weight)
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (isNaN(target)) {
    res.status(400).send({ error: "malformatted parameters" });
  }
  for (const i in daily_exercises) {
    if (isNaN(daily_exercises[i])) {
      res.status(400).send({ error: "malformatted parameters" });
    }
  }

  res.send(calculateExercises(target, daily_exercises));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});