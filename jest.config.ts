import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  roots: [
    '<rootDir>/tests',
    '<rootDir>/src'
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.ts',
    '!**/*.d.ts'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/tests/e2e/cypress',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/main/config/jest-setup.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy'
  }
}

export default jestConfig
