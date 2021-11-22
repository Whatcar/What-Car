import questions from '../data/mbtiQuestions';

export default function mbtiCalculator(data) {
  const answer = [];
  for (let i = 0; i < 8; i++) {
    const types = questions[i].a[`a${data[i]}`].type;
    answer.push(...types);
  }
  const result = answer.reduce((acc, cur) => {
    acc.set(cur, (acc.get(cur) || 0) + 1);
    return acc;
  }, new Map());

  const sorted = new Map([...result.entries()].sort((a, b) => b[1] - a[1])).keys();

  return Array.from(sorted)[0];
}
