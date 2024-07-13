interface BMIValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight:number): string => {
  const BMI = weight/((height/100)**2);
  if (BMI < 16) {
    return 'Underweight (Severe thinness)';
  } else if (BMI < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (BMI < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (BMI < 25) {
    return 'Normal (healthy weight)';
  } else if (BMI < 30) {
    return 'Overweight (Pre-obese)';
  } else if (BMI < 35) {
    return 'Obese (Class I)';
  } else if (BMI < 40) {
    return 'Obese (Class II)';
  }
  return 'Obese (Class III)';
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}