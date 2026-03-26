export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    moduleNameMapper: {
        '\\.css$': '<rootDir>/src/__mocks__/styleMock.ts',
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    transformIgnorePatterns: [
        'node_modules/(?!(typebox)/)',
    ],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {useESM: true, tsconfig: 'tsconfig.test.json'}],
        '^.+\\.mjs$': ['ts-jest', {useESM: true}],
    },
};
