// jest.config.js
const { createJsWithBabelPreset } = require('ts-jest')

const jsWithBabelPreset = createJsWithBabelPreset({
  tsconfig: 'tsconfig.jest.json',
  babelConfig: true,
})

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'react-native',
  transform: jsWithBabelPreset.transform,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}