const data = [
  { x: 1, y: 2.5 },
  { x: 2, y: 4.1 },
  { x: 4, y: 4 },
  { x: 2, y: 2.4 },
  { x: 1, y: 0.5 },
  { x: 1.5, y: 2.1 },
  { x: 2, y: 2 },
  { x: 3.6, y: 3.4 },
  { x: 5, y: 4.2 },
  { x: 2.4, y: 2 },
  { x: 1.2, y: 1 },
  { x: 2.4, y: 2 },
  { x: 2.2, y: 3 },
  { x: 3.1, y: 4 },
  { x: 4.1, y: 5 },
];

export const dataSet = [
  ...data.map((item, index) => ({ ...item, key: index })),
];
