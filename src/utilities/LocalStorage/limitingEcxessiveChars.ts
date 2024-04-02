const limitingEcxessiveChars = (input: string, count: number, endChars: string = ''): string => {
  return input.length > count ? `${input.slice(0, count)}${endChars}` : input;
};

export default limitingEcxessiveChars;
