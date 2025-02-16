// module.exports = {
//     testEnvironment: 'jsdom',
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//     testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
//   };
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    moduleNameMapper: {
      '^@/components/(.*)$': '<rootDir>/components/$1',
      '^@/pages/(.*)$': '<rootDir>/pages/$1',
    },
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
  };