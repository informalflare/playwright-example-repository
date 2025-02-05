export const GET_FRUITS = {
  expression: '/api-mocking/api/v1/fruits',
  scenarios: {
    strawberryOnly: [
      {
        name: 'Strawberry',
        id: 3,
      },
    ],
    onlyGreen: [
      {
        name: 'Kiwi',
        id: 66,
      },
      {
        name: 'Watermelon',
        id: 25,
      },
      {
        name: 'Melon',
        id: 41,
      },
      {
        name: 'Lime',
        id: 44,
      },
    ],
  },
};
