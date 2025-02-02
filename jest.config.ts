export {};
module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['resources/js/test/**/*.{ts,tsx}', '!**/node_modules/**'],
    coverageDirectory: 'resources/js/test/coverage',
    testEnvironment: 'jsdom',
    transform: {
        '.(ts|tsx)': 'ts-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/resources/js/test/jest.setup.ts'],
}
