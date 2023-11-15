const empty = [
  {
    email: '',
    password: '',
  },
  {
    password: 'v4IdarRu1m',
  },
  {
    email: 'itsmemario@mushroom.com',
  },
  {
    email: '',
    password: 's3r@quev41?',
  },
  {
    email: 'perdido@quenemcego.com',
    password: '',
  },
];

const invalid = [
  {
    email: 'test',
    password: 'pih29'
  },
  {
    email: 'test@',
    password: '0192l&^d8123yrf'
  },
  {
    email: 'test@mocha.com',
    password: '09hl4'
  },
  {
    email: '@mocha.com',
    password: 'f4524h7l628ggfds'
  },
];

export default { empty, invalid };
