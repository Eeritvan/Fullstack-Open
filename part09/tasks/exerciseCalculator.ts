interface exerciseValues {
  target: number;
  values: number[];
}

const parseArguments = (args: string[]): exerciseValues => {
  const numbers: number[] = [];
  for (let i = 3; i < args.length; i++) {
    const number = Number(args[i]);
    if (isNaN(number)) {
      throw new Error("Provided values were not numbers!");
    }
    numbers.push(number);
  }

  return {
    target: Number(args[2]),
    values: numbers
  };
}

interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const getRating = (periodLength: number, trainingDays: number): number => {
  const score = trainingDays / periodLength;
  if (score < 0.3) {
    return 0;
  } else if (score < 0.6) {
    return 1;
  } else if (score < 0.8) {
    return 2;
  }
  return 3;
}

const getRatingDesc = (rating: number): string => {
  switch (rating) {
    case 0:
      return 'did you even try to reach the target?';
    case 1:
      return 'you did not meet target';
    case 2:
      return 'not too bad but could be better';
    case 3:
      return 'perfect score';
    default:
      return '???';
  }
}

const calculateExercises = (targetValue: number, data: number[]): result => {
  const periodLength = data.length;
  const trainingDays = data.filter(x => x > 0).length;
  const success = periodLength === trainingDays;
  const rating = getRating(periodLength, trainingDays);
  const ratingDescription = getRatingDesc(rating);
  const target = targetValue;
  const average = data.reduce((sum, a) => sum + a, 0) / data.length;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}

try {
  const { target, values } = parseArguments(process.argv);
  console.log(calculateExercises(target, values));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}