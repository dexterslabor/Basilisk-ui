module.exports = {
  // preset: 'jest-playwright-preset',
  testRegex: './*\\.test\\.ts$',
  setupFilesAfterEnv: ['./src/setupTests6.ts'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  setupFiles: ['<rootDir>/jest.env.js'],
  coverageReporters: [
    'clover',
    'json',
    'lcov',
    ['text', { skipFull: true }],
    'jest-junit',
  ],
  coverageDirectory: './coverage/unit-tests/report',
  reporters: ['jest-junit'],
};
