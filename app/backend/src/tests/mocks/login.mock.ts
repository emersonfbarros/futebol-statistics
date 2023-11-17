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
    password: 'pih29',
  },
  {
    email: 'test@',
    password: '0192l&^d8123yrf',
  },
  {
    email: 'test@mocha.com',
    password: '09hl4',
  },
  {
    email: '@mocha.com',
    password: 'f4524h7l628ggfds',
  },
];

const userOnDb = {
  id: 208,
  username: 'mochaTest',
  role: 'admin',
  email: 'test@mocha.com',
  password: '$2a$05$oTgEY.qcJQHphSKWcZdar.KPxRhnDTK1V5UOSbPY9T4S4557ZhHEC',
  rawPassword: 'as#dF8U7_;+',
};

const invalidToken =
  'eyJhbGciOiJIUzInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LQiOjE1MTYyMzkwMjJ9.Aa1qtzkWeUwXclGcgIpHLSITA1sVhwQL29RVM';

const validToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjA4LCJpYXQiOjE1MTYyMzkwMjJ9.Aa1qtzkWeUwXclGcgIpHLSITA1s1TYVxHFhwQL29RVM';

export default { empty, invalid, invalidToken, userOnDb, validToken };
