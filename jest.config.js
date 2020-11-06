module.exports = {
    roots: ['<rootDir>/server/src', '<rootDir>/client/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: ['ts', 'js'],
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/server/src/app/**/*.ts', '<rootDir>/client/src/app/**/*.ts']
}